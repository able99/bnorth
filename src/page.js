import React, { cloneElement } from 'react';


export default class Page extends React.Component {
  // constructor
  // ---------------------------
  constructor(props) {
    super(props);
    this.parseController();
  }

  get name() { return this.props.name}
  get pathname() { return this.props.route && this.props.route.pathname}
  get route() { return this.props.route||{}}
  get match() { return this.props.match||{}}

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
        app.event.on(this, k, v, this.name);
      }else if(k.startsWith('onState')) {
        // page state event
        let stateEvents = k.split('_');
        if(stateEvents[0]&&this[stateEvents[1]]) app.event.on(this[stateEvents[1]], stateEvents[0], v, this.name);
      }else if(k.startsWith('on')) {
        // app event
        app.event.on(app, k, v, this.name);
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
    .map(([k,v])=>v.name);
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
    let { app, name, active } = this.props;
    app.log.info('page did mount', name);

    this._offKeyEvent = app.keyboard.on('keydown', e=>this.handleKeyEvent(e), {pageName: name});
    app.event.emitSync(app, 'onPageAdd', name, this);
    app.event.emitSync(this, 'onPageStart', this, active);
    active && app.event.emitSync(this, 'onPageActive', this, true);
  }

  componentWillUnmount() {
    let { app, name } = this.props;
    app.log.info('page will unmount', name);

    app.event.emitSync(this, 'onPageInactive', this, true);
    app.event.emitSync(this,'onPageStop', this);
    app.event.emitSync(app, 'onPageRemove', name, this);
    this._offKeyEvent && this._offKeyEvent();
    app.event.off(name);
  }

  componentDidUpdate(prevProps, prevState) {
    let { app, active } = this.props;

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
    let {
      app, context,
      name, active, focus, frame,
      route, match, 
      views, embed, children,
      ...props
    } = this.props;
    app.log.info('page render', name);
    this._actionNum = 0;


    let componentProps = {
      app, 
      name, page: this, frame: this.frame||frame, route, match, 
      ...this._getStateObjs(),
    }

    let ret = (
      <route.component {...props} {...componentProps}>
        {React.Children.map(children, children=>(
          cloneElement(children, {
            ...children.props,
            frame: this.frame,
          })
        ))}
      </route.component>
    );
    if(!embed) {
      let styleSet = {
        position: 'absolute', 
        top: 0, left: 0, bottom: 0, right: 0,
        visibility: active?'visible':'hidden',
      }
      let refFrame = e=>{
        if(!e)return;
        let update=!(this.frame);
        this.frame=e;
        if(update)this.forceUpdate()
      }
      ret = <main data-page={name} ref={refFrame} style={styleSet}>{ret}</main>
    }

    return ret;
  }
}