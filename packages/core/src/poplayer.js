/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';

class PopLayer extends React.Component {
  constructor(props) {
    super(props);
    let { app, id:_id } = this.props;
    let info = app.router.getPopLayerInfo(_id);
    if(info) info.instance = this;
    app.State.attachStates(app, this, _id, info.options);
  }
  
  getDom() {
    return ReactDOM.findDOMNode(this);
  }

  componentWillUnmount() {
    let { app, id:_id } = this.props;
    let info = app.router.getPopLayerInfo(_id);
    app.State.detachStates(this, info.options);
    let infos = app.router.getPopLayerInfos();
    let index = infos.findIndex(v=>v.options._id===_id);
    index>=0&&infos.splice(index, 1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { app, id:_id } = this.props;
    let info = app.router.getPopLayerInfo(_id);

    if(!info) return false;
    if (!this.props.app.utils.shallowEqual(this.prevProps, info.props)) return true;
    if(app.State.checkStates(this, this.props.context, nextProps.context, info.options)) return true;
    return false;
  }

  render() {
    let { app, id:_id } = this.props;
    let info = app.router.getPopLayerInfo(_id);
    if(!info) return null;
    let { content:Component, props, options } = info;
    if(typeof Component!=='function') return Component;

    this.prevProps = {...props};
    let poplayer={ app, _id, ...info, ...app.State.getStates(this, options) };
    return <Component data-poplayer={_id} poplayer={poplayer} {...props} />;
  }
}


export default PopLayer;