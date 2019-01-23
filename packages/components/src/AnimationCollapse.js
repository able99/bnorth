/**
 * @module
 */
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import { chainedFuncs } from './utils/dom';
import { domGetDimensionValue, domTriggerBrowserReflow, domGetScrollDimensionValue } from './utils/dom';



// Animation Collapse
// --------------------------

/**
 * 折叠动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
let AnimationCollapse = (aprops)=>{
  let {
    in:isIn, timeout, dimension, onTransitionFinished, transitionProps={},
    onEnter, onEntering, onEntered, onExit, onExiting, onExited,
    ...props
  } = parseProps(aprops, AnimationCollapse.props);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onEnter={chainedFuncs(AnimationCollapse.handleEnter.bind(null, {dimension}), transitionProps.onEnter)}
      onEntering={chainedFuncs(AnimationCollapse.handleEntering.bind(null, {dimension}), transitionProps.onEntering)}
      onEntered={chainedFuncs(AnimationCollapse.handleEntered.bind(null, {dimension}), transitionProps.onEntered)}
      onExit={chainedFuncs(AnimationCollapse.handleExit.bind(null, {dimension}), transitionProps.onExit)}
      onExiting={chainedFuncs(AnimationCollapse.handleExiting.bind(null, {dimension}), transitionProps.onExiting)} 
      onExited={chainedFuncs(AnimationCollapse.handleExited.bind(null, {dimension}), transitionProps.onExited,onTransitionFinished)}>
      {state=><Content isIn={isIn} timeout={timeout} dimension={dimension} {...props} animationState={state} />}
    </Transition>
  );
}

AnimationCollapse.defaultProps = {};
/**
 * 设置是否进入动画
 * @type {boolean}
 */
AnimationCollapse.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */
AnimationCollapse.defaultProps.timeout = 350;
/**
 * 设置折叠的方向，width 与 height
 * @type {string}
 */
AnimationCollapse.defaultProps.dimension="height";
/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationCollapse.AnimationCollapse.onTransitionFinished
 * @type {function}
 */
/**
 * 设置动画组件的属性
 * @attribute module:AnimationCollapse.AnimationCollapse.transitionProps
 * @type {object}
 */

/**
 * 动画各个阶段回调函数
 * @callback animationCallback
 * @param {object} props - 动画组件的属性
 * @param {element} element - 动画组件内容的 dom 元素
 */
/**
 * 动画处理函数：动画开始进入
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleEnter = function(aprops, elem) {
  let {dimension} = aprops;
  elem.style[dimension] = '0';
}
/**
 * 动画处理函数：动画进入中
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleEntering = function (aprops, elem) {
  let {dimension} = aprops;
  elem.style[dimension] = domGetScrollDimensionValue(elem, dimension);
}
/**
 * 动画处理函数：动画进入完成
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleEntered = function (aprops, elem) {
  let {dimension} = aprops;
  elem.style[dimension] = null;
}
/**
 * 动画处理函数：动画开始退出
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleExit = function (aprops, elem) {
  let {dimension} = aprops;
  elem.style[dimension] = domGetDimensionValue(elem, dimension)+'px';
  domTriggerBrowserReflow(elem);
}
/**
 * 动画处理函数：动画退出中
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleExiting = function (aprops, elem) {
  let {dimension} = aprops;
  elem.style[dimension] = '0';
}
/**
 * 动画处理函数：动画退出完成
 * @member 
 * @type {module:AnimationCollapse~animationCallback}
 */
AnimationCollapse.handleExited = function (aprops, elem) {
}

export default AnimationCollapse;


// Animation Collapse Content
// --------------------------

/**
 * 折叠动画组件的内容组件，用来包裹具体折叠内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationCollapse.Content
 */
let Content = aprops=>{
  let {
    isIn, timeout, dimension, animationState,
    component:Component, style, className, children, ...props
  } = parseProps(aprops, Content.props);

  let classSet = {
    'overflow-a-hidden': true,
    'text-white-space-nowrap': true,
    'display-none': !isIn&animationState==='exited',
  }

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: dimension }),
  };

  return (
    <Component style={styleSet} className={classes(classSet,className)} {...props}>
      {children}
    </Component>
  )
}

Content.defaultProps = {};
/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.in
 */
/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.timeout
 */
/**
 * 参见 AnimationCollapse
 * @attribute module:AnimationCollapse~Content.dimension
 */
/**
 * 动画状态，entering，entered，exiting，exited
 * @attribute module:AnimationCollapse~Content.animationState
 * @type {string}
 */
/**
 * 参见 BaseComponent
 */
Content.defaultProps.component = 'div';

Object.defineProperty(AnimationCollapse,"Content",{ get:function(){ return Content }, set:function(val){ Content = val }})