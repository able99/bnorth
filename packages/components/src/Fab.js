/**
 * @module
 */
import React from 'react';
import BaseComponent, { domFindDock, domCreatePortal } from './BaseComponent';
import Button from './Button';
import Panel from './Panel';


/**
 * 浮动按钮组件
 * 
 * 浮动按钮组件是浮动在指定容器上的组件，可设置浮动的位置，边缘距离和浮动的映射组件
 * 
 * 对于滚动组件上的浮动按钮，需要设置滚动组件父组件的 dock 属性，使浮动组件悬浮在 dock 上保持滚动时位置固定
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Button.Button
 */
class Fab extends React.Component{
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.dock !== this.props.dock) { this.dock = undefined; this.forceUpdate() }
  }

  render() {
    let { h, v, margin, dock, ...props } = BaseComponent(this.props, Fab);

    if((dock===true||typeof dock==='string')&&!this.dock) {
      return <span ref={e=>{ if(!e) return;this.dock = domFindDock(e, dock);this.forceUpdate() }} style={{fontSize:0}} />
    }

    let classNamePre = {
      'position-absolute': true,
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

    let component = <Panel component={Button} classNamePre={classNamePre}  {...props} />;
    return this.dock?domCreatePortal(component, this.dock):component;
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
 * 设置则作为 dock 参数获取指定 dock，参见 domFindDock 函数
 * @attribute module:Fab.Fab.dock
 * @type {boolean|string}
 */


Object.defineProperty(Fab,"Fab",{ get:function(){ return Fab }, set:function(val){ Fab = val }})
export default Fab;

