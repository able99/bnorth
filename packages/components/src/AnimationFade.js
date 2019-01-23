/**
 * 淡入淡出动画
 * @module
 */
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import { chainedFuncs } from './utils/dom';
import parseProps from './utils/props';


// Animation Fade
// --------------------------

/**
 * 淡入淡出动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
let AnimationFade = aprops=>{
  let {
    in:isIn, timeout, onTransitionFinished, transitionProps={},
    ...props
  } = parseProps(aprops, AnimationFade.props);

  return (
    <Transition 
      appear={true} {...transitionProps} in={isIn} timeout={timeout} 
      onExited={chainedFuncs(transitionProps.onExited,onTransitionFinished)}>
      {state=><AnimationFade.Content in={isIn} timeout={timeout} {...props} animationState={state} />}
    </Transition>
  );
}

AnimationFade.defaultProps = {};
/**
 * 设置是否进入动画
 * @type {boolean}
 */
AnimationFade.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */
AnimationFade.defaultProps.timeout = 350;
/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationFade.AnimationFade.onTransitionFinished
 * @type {function}
 */
/**
 * 设置动画组件的属性
 * @attribute module:AnimationFade.AnimationFade.transitionProps
 * @type {object}
 */

export default AnimationFade;


// Animation Fade Content
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationFade.Content
 */
let Content = aprops=>{
  let {
    in:isIn, timeout, animationState,
    component:Component='div', style, className, children, ...props
  } = parseProps(aprops, Content.props);

  let classSet = `opacity-${(animationState==='entered'||animationState==='entering')?'100':(isIn?'50':'0')}`;

  let styleSet = {
    ...style,
    ...transiton(`${timeout}ms`, { property: 'opacity' }),
  };

  return (
    <Component style={styleSet} className={classes(classSet,className)} {...props}>
      {children}
    </Component>
  )
}

Content.defaultProps = {};
/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.in
 */
/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.timeout
 */
/**
 * 参见 AnimationFade
 * @attribute module:AnimationFade~Content.dimension
 */
/**
 * 动画状态，entering，entered，exiting，exited
 * @attribute module:AnimationFade~Content.animationState
 * @type {string}
 */
/**
 * 参见 BaseComponent
 */
Content.defaultProps.component = 'div';

Object.defineProperty(AnimationFade,"Content",{ get:function(){ return Content }, set:function(val){ Content = val }})
