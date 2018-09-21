/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { genCommonProps, cxm } from './utils/props';
import Button from './Button';


export default class Fab extends React.Component{
  handleRef(e) {
    let { container } = this.props;
    let el=e;
    while((el=el.parentElement)) {
      if(el===document.body) {this.container=el; break};
      if(el.getAttribute('data-container-page')) {this.container=el; break};
      if(container===true&&el.getAttribute('data-container')==='true') {this.container=el; break};
      if(container&&el.getAttribute('data-container')===container) {this.container=el; break};
    }
    if(!this.container) this.container = document.body;
    this.forceUpdate();
  }

  render() {
    let {
      x=8, y=8, h='end', v='end', container,
      component:Component=Button, className, style, ...props
    } = genCommonProps(this.props);

    if((container===true||typeof container==='string')&&!this.container) {
      return <span ref={e=>e&&this.handleRef(e)} style={{fontSize:0}} />;
    }
    
    let classStr = 'position-absolute';

    let classSet = {
      'translate-center-x': h==='center',
      'translate-center-y': v==='center',
      'offset-center-x': h==='center',
      'offset-center-y': v==='center',
    }

    let styleSet = {};
    if(h==='start') styleSet['left'] = x;
    if(h==='center') styleSet['left'] = '50%';
    if(h==='end') styleSet['right'] = x;
    if(v==='start') styleSet['top'] = y;
    if(v==='center') styleSet['top'] = '50%';
    if(v==='end') styleSet['bottom'] = y;

    let component = <Component className={cxm(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />;
    return this.container||container?ReactDOM.createPortal(component, this.container||container):component;
  }
}

