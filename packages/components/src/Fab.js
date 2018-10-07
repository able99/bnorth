/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import { domFindContainer } from './utils/dom';
import Button from './Button';


export default class Fab extends React.Component{
  handleRef(e) {
    this.container = domFindContainer(e, this.props.container);
    this.forceUpdate();
  }

  render() {
    let {
      x=8, y=8, h='end', v='end', container,
      component:Component=Button, className, style, ...props
    } = parseProps(this.props);

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

    let component = <Component className={classes(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />;
    return this.container||container?ReactDOM.createPortal(component, this.container||container):component;
  }
}

