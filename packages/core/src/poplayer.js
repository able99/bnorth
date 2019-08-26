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
    // todo: poplayer option state,action
    options._id = options._id || `${++Poplayer._IdRandom}@${options._idPage?options._idPage:'#'}`;
    let popLayer = Poplayer.getPoplayerInfo(options._id);

    if(!popLayer) {
      if(!content) return;
      Poplayer.app.router.setPoplayerInfos([...Poplayer.app.router.getPoplayerInfos(), { content, props, options }]);
    }else{
      content&&(popLayer.content=content);
      popLayer.props = {...popLayer.props, ...props};
      popLayer.options = {...popLayer.options, ...options};
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
  _id() { return this.props.options._id }
  getDom() { return ReactDOM.findDOMNode(this) }

  // poplayer interface
  // ---------------------------------------
  constructor(props) {
    super(props);
    let { options } = this.props;
    Poplayer.poplayers[options._id] = this;

    this._states = Object.entries(options).filter(([k,v])=>k.startsWith('state')||k.startsWith('_state'));
    Poplayer.app.State.attachStates(this, this._states);
    
    Object.entries(options).forEach(([k,v])=>{
      if(k.startsWith('on')) { Poplayer.app.event.on(Poplayer.app._id, k, Poplayer.app.event.createHandler(k, v, this), this._id).bind(this); 
      }else if(k.startsWith('_on')) { this[k] = Poplayer.app.event.createHandler(k, v, this).bind(this); 
      }else if(k.startsWith('action')){ this[k] = Poplayer.app.event.createAction(k, v, this).bind(this); 
      }else{ !k.startsWith('state')&&!k.startsWith('_state')&&(this[k]=v) } 
    })
  }

  componentDidMount() {
    Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerStart', this._id);
  }

  componentWillUnmount() {
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
    let component = <Component data-poplayer={_id} app={Poplayer.app} _id={_id} poplayer={this} info={this.props} {...Poplayer.app.State.getStates(this, this._states)} {...props} />;

    if(options._idPage){
      let page = Poplayer.app.Page.getPage(options._idPage);
      let dom = page&&page.dom;
      if(dom) return ReactDOM.createPortal(component, dom)
    }

    return component;
  }
}


export default Poplayer;