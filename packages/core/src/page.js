import React, { cloneElement } from 'react';


export default class Page extends React.Component {
  // constructor
  // ---------------------------
  constructor(props) {
    super(props);
    this.parseController();
  }

  get _id() { 
    return this.props._id;
  }

  get app() { 
    return this.props.app;
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
        this.app.log.info('page action', this.name, name);
        return func.apply(this, args);
      }catch(e){
        this.app.log.error('page action', name, e);
        this.app.render.panic(e, {title:`action(${name}) error`});
      }
    }
    if(name) this[`action${name}`] = ret;
    return ret;
  }

  parseController() {
    let { app, route:{component, controller}={} } = this.props;
    let acontroller = controller||component.controller||{};
    let controllerObj = typeof(acontroller)==='function'?acontroller(app, this):acontroller;

    if(!controllerObj.stateData) controllerObj.stateData = undefined;
    if(!controllerObj.actionGoBack) controllerObj.actionGoBack = ()=>app.router.back();

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        this[k] = app.State.createState(app, v, k, this._id);
        if(!this[k]) { app.render.panic(v, {title: 'no state'}); return } 
        if(typeof v==='string') return;
        app.event.on(this._id, 'onPageStart', (page,active)=>{app.event.emit(this[k]._id, 'onStateStart', this[k]._id, active)}, this[k]._id);
        app.event.on(this._id, 'onPageActive', (page,onStart)=>{app.event.emit(this[k]._id, 'onStateActive', this[k]._id, onStart)}, this[k]._id);
        app.event.on(this._id, 'onPageInactive', (page,onStop)=>{app.event.emit(this[k]._id, 'onStateInactive', this[k]._id, onStop)}, this[k]._id);
        app.event.on(this._id, 'onPageStop', (page)=>{app.event.emit(this[k]._id, 'onStateStop', this[k]._id)}, this[k]._id);
      }
    });

    Object.entries(controllerObj).forEach(([k,v])=>{
      if(k.startsWith('state')||k.startsWith('_state')) {
        // state
      }else if(k==='onPageAdd'||k==='onPageRemove') {
        // app event
        app.event.on(app._id, k, v, this._id);
      }else if(k.startsWith('onPage')) {
        // page event
        app.event.on(this._id, k, v, this._id);
      }else if(k.startsWith('onState')) {
        // page state event
        let stateEvents = k.split('_');
        if(stateEvents[0]&&this[stateEvents[1]]) app.event.on(this[stateEvents[1]]._id, stateEvents[0], v, this._id);
      }else if(k.startsWith('on')) {
        // app event
        app.event.on(app._id, k, v, this._id);
      }else if(k.startsWith('action')){ 
        // action
        this[k] = this.action(v, k.slice(6));
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
      let extData = v.extData();
      if(extData) ret[`${k}Ext`] = extData;
    });

    return ret;
  }
  
  // page life circle
  // ---------------------------
  componentDidMount() {
    let { app, _id, route:{active} } = this.props;
    app.log.info('page did mount', _id);

    this._offKeyEvent = app.keyboard.on(_id, 'keydown', e=>this.handleKeyEvent(e));
    app.event.emit(app._id, 'onPageAdd', _id, this);
    app.event.emit(this._id, 'onPageStart', this, active);
    active && app.event.emit(this._id, 'onPageActive', this, true);
  }

  componentWillUnmount() {
    let { app, _id } = this.props;
    app.log.info('page will unmount', _id);

    app.event.emit(this._id, 'onPageInactive', this, true);
    app.event.emit(this._id,'onPageStop', this);
    app.event.emit(app._id, 'onPageRemove', _id, this);
    this._offKeyEvent && this._offKeyEvent();
    app.event.off(_id);
  }

  componentDidUpdate(prevProps, prevState) {
    let { app, route:{active} } = this.props;

    if(prevProps.route.active !== active) {
      app.event.emit(this._id, active?'onPageActive':'onPageInactive', this, false);
    }
  }

  componentDidCatch(error, info) {
    let { app } = this.props;
    app.log.info('page did catch');
    app.render.panic(error, {title:'page error catch'}, this._id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.app.utils.shallowEqual(this.props.route, nextProps.route, ['params', 'query'])) return true;
    // if (!this.props.app.utils.shallowEqual(this.props.views, nextProps.views)) return true;
    // if (!this.props.app.utils.shallowEqual(this.props.embeds, nextProps.embeds)) return true;
    for(let k of this._getStateKeys()) if(this.props.context[k]!==nextProps.context[k]) return true;
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