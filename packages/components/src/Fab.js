/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import { domFindContainer, domCreatePortal } from './utils/dom';
import Button from './Button';


/**
 * 浮动按钮组件
 * 
 * 浮动按钮组件是浮动在指定容器上的组件，可设置浮动的位置，边缘距离和浮动的映射组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
class Fab extends React.Component{
  _handleRef(e) {
    this.container = domFindContainer(e, this.props.container);
    this.forceUpdate();
  }

  render() {
    let {
      h, v, margin, container,
      component:Component, className, ...props
    } = parseProps(this.props, Fab.props);

    if((container===true||typeof container==='string')&&!this.container) {
      return <span ref={e=>e&&this._handleRef(e)} style={{fontSize:0}} />;
    }
    
    let classStr = 'position-absolute';

    let classSet = {
      [`margin-top-${margin!==true?margin:''}`]: margin&&v==='start',
      [`margin-left-${margin!==true?margin:''}`]: margin&&h==='start',
      [`margin-bottom-${margin!==true?margin:''}`]: margin&&v==='end',
      [`margin-right-${margin!==true?margin:''}`]: margin&&h==='end',
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

Fab.defaultProps = {};
/**
 * 设置组件在容器内容水平位置，取值为 start，center 和 end
 * @type {string}
 */
Fab.defaultProps.h = 'end'; 
/**
 * 设置组件在容器内容垂直位置，取值为 start，center 和 end
 * @type {string}
 */
Fab.defaultProps.v = 'end'; 
/**
 * 设置组件相对容器边缘的边距，true 为使用默认边距
 * @type {boolean|string}
 */
Fab.defaultProps.margin = true; 
/**
 * 设置浮动的容器。
 * 
 * 不设置表示相对具有 relative，absolute 或 fixed 的 css position 属性的父元素。
 * 设置则作为 container 参数获取指定 container，参见 domFindContainer 函数
 * @attribute module:Fab.Fab.container
 * @type {boolean|string}
 */
/**
 * 参见 BaseComponent
 */
Fab.defaultProps.component = Button; 

export default Fab;

