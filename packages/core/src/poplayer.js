/**
 * @module
 */
import React, { cloneElement } from 'react';


class PopLayer extends React.Component {
  render() {
    let { app, content:Component, props, options:{_id, states, optionProps, ...options} } = this.props;
    props['data-poplayer'] = _id;

    if(typeof Component==='function') {
      let stateProps = app.router.getPopLayerStates(_id);
      if(typeof optionProps==='function') props = {...props, ...optionProps(stateProps, props)}

      return <Component {...stateProps} app={app} _id={_id} props={props} options={options} states={states} />;
    }else if(typeof Component==='object'&&Component.type) {
      return cloneElement(Component, props);
    }else {
      props.style = {position: 'absolute', ...props.style};
      
      return <div onClick={()=>app.router.removePopLayer(_id)} {...props}>{String(Component)}</div>;
    }
  }
}


export default PopLayer;