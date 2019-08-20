/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';

class PopLayer extends React.Component {
  // poplayer interface
  // ---------------------------------------
  static app;
  static _IdRandom = 0;
  /**
   * 生成弹出层 id
   * @param {module:router~PopLayerOptions} - 配置参数
   * @returns {string} 弹出层 id 
   */
  static genPopLayerId(options={}) {
    return options._id || `${++this._popLayerIdRandom}@${options._idPage?options._idPage:'#'}`;
  }

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
      PopLayer.app.router.component.setState({_popLayerInfos: [...PopLayer.app.router.component.state._popLayerInfos, { content, props, options }]});
    }else{
      content&&(popLayer.content=content);
      popLayer.props = {...popLayer.props, ...props};
      popLayer.options = {...popLayer.options, ...options};
      popLayer.instance&&popLayer.instance.setState({});
    }
    
    return options._id;
  }

  /**
   * 移除弹出层
   * @param {!string} - 弹出层 id
   */
  static removePopLayer(_id) {
    let info = PopLayer.getPopLayerInfo(_id);
    if(!info) return;
    info.remove = true;
    PopLayer.app.router.component.setState({});
  }

  /**
   * 获取弹出层信息
   * @param {string} - 弹出层 id
   * @returns {module:router~PopLayerInfo}
   */
  static getPopLayerInfo(_id) {
    return PopLayer.app.router.component.state._popLayerInfos.find(v=>v.options._id===_id);
  }










  constructor(props) {
    super(props);
    let { app, id:_id } = this.props;
    let info = PopLayer.getPopLayerInfo(_id);
    if(info) info.instance = this;
    app.State.attachStates(app, this, _id, info.options);
  }
  
  getDom() {
    return ReactDOM.findDOMNode(this);
  }

  componentWillUnmount() {
    let { app, id:_id } = this.props;
    let info = PopLayer.getPopLayerInfo(_id);
    app.State.detachStates(this, info.options);
    let infos = PopLayer.app.router.component.state._popLayerInfos;
    let index = infos.findIndex(v=>v.options._id===_id);
    index>=0&&infos.splice(index, 1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { app, id:_id } = this.props;
    let info = PopLayer.getPopLayerInfo(_id);

    if(!info) return false;
    if (!this.props.app.utils.shallowEqual(this.prevProps, info.props)) return true;
    if(app.State.checkStates(this, this.props.context, nextProps.context, info.options)) return true;
    return false;
  }

  render() {
    let { app, id:_id } = this.props;
    let info = PopLayer.getPopLayerInfo(_id);
    if(!info) return null;
    let { content:Component, props, options } = info;
    if(typeof Component!=='function') return Component;

    this.prevProps = {...props};
    let poplayer={ app, _id, ...info, ...app.State.getStates(this, options) };
    return <Component data-poplayer={_id} poplayer={poplayer} {...props} />;
  }
}


export default PopLayer;