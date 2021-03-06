/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';

class Poplayer extends React.Component {
  static app;

  // poplayer interface
  // ---------------------------------------
  static poplayers = {}
  static getPoplayer(_id) {
    return Poplayer.poplayers[_id];
  }

  // poplayer interface
  // ---------------------------------------
  static _IdRandom = 0;
  /**
   * 添加弹出层
   * @param {number|string|component|element} - 内容 
   * @param {object} props - 组件属性
   * @param {module:router~PoplayerOptions} options - 弹出层配置
   * @returns {string} 弹出层 id 
   */
  static addPoplayer(content, props={}, options={}) {
    options._id = options._id || `${++Poplayer._IdRandom}@${options._idPage?options._idPage:'#'}`;
    if(arguments.length===0) return options._id;
    let poplayer = Poplayer.getPoplayerInfo(options._id);
    options = {...options, ...(options.options instanceof Function?options.options(Poplayer.app, options._id):options.options)}
    props = {...props, ...(options.props instanceof Function?options.props(Poplayer.app, options._id):options.props)}

    if(!poplayer) {
      if(!content) return;
      Poplayer.app.router.setPoplayerInfos([...Poplayer.app.router.getPoplayerInfos(), { content, props, options }]);
    }else{
      content&&(poplayer.content=content);
      poplayer.props = {...poplayer.props, ...props};
      poplayer.options = {...poplayer.options, ...options};
      Poplayer.app.router.refresh();
    }
    
    return options._id;
  }

  /**
   * 移除弹出层
   * @param {!string} - 弹出层 id
   */
  static removePoplayer(_id) {
    let infos = Poplayer.app.router.getPoplayerInfos();
    let index = infos.findIndex(v=>v.options._id===_id);
    if(index>=0){
      infos.splice(index, 1);
      Poplayer.app.router.setPoplayerInfos(infos);
    }
  }

  /**
   * 获取弹出层信息
   * @param {string} - 弹出层 id
   * @returns {module:router~PoplayerInfo}
   */
  static getPoplayerInfo(_id) {
    return Poplayer.app.router.getPoplayerInfos().find(v=>v.options._id===_id);
  }

  // poplayer interface
  // ---------------------------------------
  get _id() { return this.props.options._id }
  get dom() { return ReactDOM.findDOMNode(this) }

  // poplayer interface
  // ---------------------------------------
  constructor(props) {
    super(props);
    let { options } = this.props;
    Poplayer.poplayers[options._id] = this;
    this.options = options;

    this._states = Object.entries(options).filter(([k,v])=>k.startsWith('state')||k.startsWith('_state'));
    Poplayer.app.State.attachStates(this, this._states);
    
    Object.entries(options).forEach(([k,v])=>{
      if(k.startsWith('on')) { 
        let $ = k.indexOf('$'); let eid = $>0?k.slice($+1):null; k = $>0?k.slice(0, $):k; 
        Poplayer.app.event.on(eid, k, Poplayer.app.event.createHandler(k, v, this), this._id).bind(this); 
      }else if(k.startsWith('_on')) { this[k] = Poplayer.app.event.createHandler(k, v, this).bind(this); 
      }else if(k.startsWith('action')){ this[k] = Poplayer.app.event.createAction(k, v, this).bind(this); }
    })
  }

  componentDidMount() {
    this.props.options._onStart&&this.props.options._onStart(Poplayer.app, this._id, this);
    Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerStart', this._id);
  }

  componentWillUnmount() {
    this.props.options._onStop&&this.props.options._onStop(Poplayer.app, this._id, this);
    Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerStop', this._id);
    Poplayer.app.State.detachStates(this, this._states);
    delete Poplayer.poplayers[this._id];
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { props, options } = this.props;
    if (!Poplayer.app.utils.shallowEqual(nextProps.props, props)) return true;
    if (!Poplayer.app.utils.shallowEqual(nextProps.options, options)) return true;
    if(Poplayer.app.State.checkStates(this, nextProps.context, this.props.context, this._states)) return true;
    return false;
  }

  render() {
    let { content:Component, props, options } = this.props;
    let _id = options._id;

    Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerRender', _id, this.props);
    if(typeof Component!=='function') return Component;
    let component = <Component data-poplayer={_id} app={Poplayer.app} _id={_id} poplayer={this} info={this.props} states={Poplayer.app.State.getStates(this, this._states)} {...props} />;

    if(options._idPage){
      let page = Poplayer.app.Page.getPage(options._idPage);
      let dom = page&&page.dom;
      if(dom) return ReactDOM.createPortal(component, dom)
    }

    return component;
  }
}


export default Poplayer;