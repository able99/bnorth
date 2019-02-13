/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Animation from './Animation';


/**
 * 背景组件
 * 
 * Backdrop 会填满具有 relative，absolute 或 fixed 位置属性的父元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
let Backdrop = aprops=>{
  let { mask, transition:Transition, ...props } = BaseComponent(aprops, Backdrop);

  let classNamePre = {
    'position-absolute square-full offset-a-start overflow-a-hidden': true,
    ['bg-color-'+(mask===true?'mask':mask)]: mask,
  }

  return <Transition type="fade" classNamePre={classNamePre} {...props} />;
}

Backdrop.defaultProps = {};
/**
 * 设置背景的主题色，true 表示设置默认主题 mask
 * @type {boolean|string}
 */
Backdrop.defaultProps.mask = true;
/**
 * 设置背景显示的进入和离开动画组件
 * @type {component}
 */
Backdrop.defaultProps.transition = Animation;
/**
 * 动画参数，参见 Animation
 * @attribute module:Backdrop.Backdrop.transition*
 */



export default Backdrop;