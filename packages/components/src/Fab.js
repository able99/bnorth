/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import { domFindContainer, domCreatePortal } from './utils/dom';
import Button from './Button';


export default class Fab extends React.Component{
  _handleRef(e) {
    this.container = domFindContainer(e, this.props.container);
    this.forceUpdate();
  }

  render() {
    let {
      h='end', v='end', container,
      component:Component=Button, className, ...props
    } = parseProps(this.props, Fab.props);

    if((container===true||typeof container==='string')&&!this.container) {
      return <span ref={e=>e&&this._handleRef(e)} style={{fontSize:0}} />;
    }
    
    let classStr = 'position-absolute margin-a-';

    let classSet = {
      'translate-center-x': h==='center'&&v!=='center',
      'translate-center-y': h!=='center'&&v==='center',
      'translate-center-a': h==='center'&&v==='center',
      'offset-left-center': h==='center',
      'offset-top-center': v==='center',
      'offset-left-start': h==='start',
      'offset-right-start': h==='end',
      'offset-top-start': v==='start',
      'offset-bottom-start': v==='end',
    }

    let component = <Component className={classes(classStr, classSet, className)}  {...props} />;
    return this.container?domCreatePortal(component, this.container):component;
  }
}

