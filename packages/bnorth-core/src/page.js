import React, { cloneElement } from 'react';


export default class Page extends React.Component {
  // constructor
  // ---------------------------
  constructor(props) {
    super(props);
    this.parseController();
  }

  get _id() { 
    return this.props._id
  }

  getEmbed(routerName) { 
    let _id = this.props.embeds[routerName]&&this.props.embeds[routerName].props._id;
    return _id && this.props.app.router.getPage(_id);
  }

  // key event
  // ---------------------------
  handleKeyEvent(e) {
    return e.keyCode===27&&this.actionGoBack();
  }

  // controller
  // ---------------------------
  action(func, name) {
    if(!name) name = `_${++this._actionNum}`
    let ret = (...args)=>{
      try{
        app.log.info('page action', this.name, name);
        func.apply(this, args);
      }catch(e){
        app.log.error('page action', name, e);
        app.render.panic(e, {title:`action(${name}) error`});
      }
    }
    if(name) this[`action${name}`] = ret;
    return ret;
  }

  parseController() {
    let { app } = this.props;

    let controllerObj = typeof(this.props.route.controller)==='function'?this.props.route.controller(app, this):(this.props.route.controller||{});
    if(!controllerObj.stateData) controllerObj.stateData = undefined;
    if(!controllerObj.actionGoBack) controllerObj.actionGoBack = ()=>app.router.back();

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        // state
        if(typeof v==='string'){
          this[k] =  app.states[v];
        }else{
          let {state=app.State, ...stateOptions} = v||{};
          this[k] = new state(app, k, stateOptions, this); 
        }
      }
    });

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        // state
      }else if(k.startsWith('onPage')) {
        // page event
        app.event.on(this, k, v, this._id);
      }else if(k.startsWith('onState')) {
        // page state event
        let stateEvents = k.split('_');
        if(stateEvents[0]&&this[stateEvents[1]]) app.event.on(this[stateEvents[1]], stateEvents[0], v, this._id);
      }else if(k.startsWith('on')) {
        // app event
        app.event.on(app, k, v, this._id);
      }else if(k.startsWith('action')){ 
        // action
        this[k] = this.action(v, k);
      }else{
        // user props
        this[k] = v;
      }
    })
  }

  _getStateKeys() {
    return Object.entries(this)
    .filter(([k,v])=>k.startsWith('_state')||(k.startsWith('state')&&k!=='state'))
    .map(([k,v])=>v._id);
  }

  _getStateObjs() {
    let ret = {};

    Object.entries(this)
    .filter(([k,v])=>k.startsWith('_state')||(k.startsWith('state')&&k!=='state'))
    .forEach(([k,v])=>{
      ret[k] = v.data();
      let dataExt = v.dataExt();
      if(dataExt) ret[`${k}Ext`] = dataExt;
    });

    return ret;
  }
  
  // page life circle
  // ---------------------------
  componentDidMount() {
    let { app, _id, route:{active} } = this.props;
    app.log.info('page did mount', _id);

    this._offKeyEvent = app.keyboard.on(_id, 'keydown', e=>this.handleKeyEvent(e));
    app.event.emitSync(app, 'onPageAdd', _id, this);
    app.event.emitSync(this, 'onPageStart', this, active);
    active && app.event.emitSync(this, 'onPageActive', this, true);
  }

  componentWillUnmount() {
    let { app, _id } = this.props;
    app.log.info('page will unmount', _id);

    app.event.emitSync(this, 'onPageInactive', this, true);
    app.event.emitSync(this,'onPageStop', this);
    app.event.emitSync(app, 'onPageRemove', _id, this);
    this._offKeyEvent && this._offKeyEvent();
    app.event.off(_id);
  }

  componentDidUpdate(prevProps, prevState) {
    let { app, route:{active} } = this.props;

    if(prevProps.active !== active) {
      app.event.emitSync(this, active?'onPageActive':'onPageInactive', this, false);
    }
  }

  componentDidCatch(error, info) {
    let { app } = this.props;
    app.log.info('page did catch');
    app.render.panic(info.componentStack, {title:error});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.app.utils.shallowEqual(this.props, nextProps)) return true;
    for(let k of this._getStateKeys()){
      if(!this.props.app.utils.is(this.props.context[k], nextProps.context[k])) return true;
    }
    return false;
  }

  // page render
  // ---------------------------
  render() {
    let { context, app, _id, route, views, embeds, ...props } = this.props;
    app.log.info('page render', _id);

    let { active, embed } = route;
    this._actionNum = 0;
    let componentProps = { app, _id, route, page: this, frame: this.frame, ...this._getStateObjs() }
    Object.keys(embeds).forEach(v=>{embeds[v] = cloneElement(embeds[v], { ...v.props, frame: this.frame })});

    if(!embed) {
      let styleSet = {
        position: 'absolute', 
        top: 0, left: 0, bottom: 0, right: 0,
        visibility: active?'visible':'hidden',
      }
      let refFrame = e=>{ if(!e)return; let update=!(this.frame); this.frame=e; if(update)this.forceUpdate() }
      return (
        <main data-page={_id} ref={refFrame} style={styleSet}>
          <route.component {...props} {...componentProps}>{embeds}</route.component>
          {views}
        </main>
      )
    }else{
      return (
        <React.Fragment>
          <route.component {...props} {...componentProps}>{embeds}</route.component>
          {views}
        </React.Fragment>
      )
    }
  }
}