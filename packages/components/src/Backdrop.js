/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationFade from './AnimationFade';
import Panel from './Panel';


/**
 * 背景组件
 * 
 * Backdrop 会填满具有 relative，absolute 或 fixed 位置属性的父元素，并提供背景样式和点击操作等
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Backdrop = aprops=>{
  let { 
    mask, transition:Transition, in:isIn, transitionProps, onTransitionFinished,
    component, componentPanel, className, children, ...props 
  } = parseProps(aprops, Backdrop.props);

  let classStr = 'position-absolute square-full offset-a-start overflow-a-hidden';
  let classSet = mask?`bg-color-${mask===true?'mask':mask}`:'';

  return (
    <Transition 
      in={isIn} transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      component={component} componentPanel={componentPanel} className={classes(classStr, classSet, className)} {...props}>
      {children}
    </Transition>
  );
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
Backdrop.defaultProps.transition = AnimationFade;
/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.in
 */
/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.transitionProps
 */
/**
 * 参见 AnimationFade
 * @attribute module:Backdrop.Backdrop.onTransitionFinished
 */
/**
 * 参见 BaseComponent
 */
Backdrop.defaultProps.component = Panel;


export default Backdrop;