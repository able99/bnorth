/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import Animation from './Animation';


/**
 * 背景组件
 * 
 * Backdrop 会填满第一个具有 relative，absolute 或 fixed 位置属性的上级元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Animation.Animation
 */
let Backdrop = aprops=>{
  let { classNamePre, ...props } = BaseComponent(aprops, Backdrop);

  classNamePre = {
    'position-absolute square-full offset-a-start overflow-a-hidden': true,
    ...classNamePre,
  }

  return (
    <Panel 
      type="fade" b-style="mask" btn={false} 
      component={Animation} classNamePre={classNamePre} {...props} />
  )
}

Backdrop.defaultProps = {};

Object.defineProperty(Backdrop,"Backdrop",{ get:function(){ return Backdrop }, set:function(val){ Backdrop = val }})
Backdrop.isBnorth = true;
Backdrop.defaultProps['b-precast'] = {};
export default Backdrop;