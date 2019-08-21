/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';

class PopLayer extends React.Component {
  static app;

  // poplayer interface
  // ---------------------------------------
  static poplayers = {}
  static getPopLayer(_id) {
    return PopLayer.poplayers[_id];
  }

  // poplayer interface
  // ---------------------------------------
  static _IdRandom = 0;
  /**
   * 添加弹出层
   * @param {number|string|component|element} - 内容 
   * @param {object} props - 组件属性
   * @param {module:router~PopLayerOptions} options - 弹出层配置
   * @returns {string} 弹出层 id 
   */
  static addPopLayer(content, props={}, options={}) {
    options._id = options._id || `${++PopLayer._IdRandom}@${options._idPage?options._idPage:'#'}`;
    let popLayer = PopLayer.getPopLayerInfo(options._id);

    if(!popLayer) {
      if(!content) return;
      PopLayer.app.router.setPopLayerInfos([...PopLayer.app.router.getPopLayerInfos(), { content, props, options }]);
    }else{
      content&&(popLayer.content=content);
      popLayer.props = {...popLayer.props, ...props};
      popLayer.options = {...popLayer.options, ...options};
      PopLayer.app.router.refresh();
    }
    
    return options._id;
  }

  /**
   * 移除弹出层
   * @param {!string} - 弹出层 id
   */
  static removePopLayer(_id) {
    let infos = PopLayer.app.router.getPopLayerInfos();
    let index = infos.findIndex(v=>v.options._id===_id);
    if(index>=0){
      infos.splice(index, 1);
      PopLayer.app.router.getPopLayerInfos(infos);
    }
  }

  /**
   * 获取弹出层信息
   * @param {string} - 弹出层 id
   * @returns {module:router~PopLayerInfo}
   */
  static getPopLayerInfo(_id) {
    return PopLayer.app.router.getPopLayerInfos().find(v=>v.options._id===_id);
  }

  // poplayer interface
  // ---------------------------------------
  getDom() {
    return ReactDOM.findDOMNode(this);
  }

  // poplayer interface
  // ---------------------------------------
  constructor(props) {
    super(props);
    let { options } = this.props;
    PopLayer.poplayers[options._id] = this;
    PopLayer.app.State.attachStates(PopLayer.app, this, options._id, options);
  }

  componentWillUnmount() {
    let { options } = this.props;
    PopLayer.app.State.detachStates(this, options);
    delete PopLayer.poplayers[options._id];
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { props, options } = this.props;
    if (!PopLayer.app.utils.shallowEqual(nextProps.props, props)) return true;
    if (!PopLayer.app.utils.shallowEqual(nextProps.options, options)) return true;
    if(PopLayer.app.State.checkStates(this, nextProps.context, this.props.context, options)) return true;
    return false;
  }

  render() {
    let { content:Component, props, options } = this.props;
    if(typeof Component!=='function') return Component;
    let component = <Component data-poplayer={options._id} app={PopLayer.app} _id={options._id} poplayer={this} info={this.props} {...PopLayer.app.State.getStates(this, options)} {...props} />;

    if(options._idPage){
      let page = PopLayer.app.Page.getPage(options._idPage);
      let dom = page&&page.dom;
      if(dom) return ReactDOM.createPortal(component, dom)
    }

    return component;
  }
}


export default PopLayer;