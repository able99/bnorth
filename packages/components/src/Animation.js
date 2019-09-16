/**
 * @module
 */
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { transiton } from '@bnorth/rich.css/lib/styles/animation'; 
import BaseComponent, { chainedFuncs, domGetDimensionValue, domTriggerBrowserReflow, domGetScrollDimensionValue } from './BaseComponent';
import Panel from './Panel';


/**
 * 折叠动画组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @see {@link https://reactcommunity.org/react-transition-group/transition} react-transition-group
 */
let Animation = aprops=>{
  let { 
    type, types, onFinished, 
    transitionProps:{onEnter, onEntering, onEntered, onExit, onExiting, onExited, ...transitionProps}={}, 
    ...props 
  } = BaseComponent(aprops, Animation);
  type = types[type]||types['none'];

  return (
    <Transition 
      appear={true} in={props.in} timeout={props.timeout} 
      onEnter={chainedFuncs(type.onEnter&&type.onEnter.bind(null, props), onEnter&&onEnter.bind(null, props))}
      onEntering={chainedFuncs(type.onEntering&&type.onEntering.bind(null, props), onEntering&&onEntering.bind(null, props))}
      onEntered={chainedFuncs(type.onEntered&&type.onEntered.bind(null, props), onEntered&&onEntered.bind(null, props))}
      onExit={chainedFuncs(type.onExit&&type.onExit.bind(null, props), onExit&&onExit.bind(null, props))}
      onExiting={chainedFuncs(type.onExiting&&type.onExiting.bind(null, props), onExiting&&onExiting.bind(null, props))}
      onExited={chainedFuncs(type.onExited&&type.onExited.bind(null, props), onExited&&onExited.bind(null, props), onFinished)}
      {...transitionProps} >
      {state=><Panel clickable={false} {...type.getProps?type.getProps(state, props):props} />}
    </Transition>
  );
}

Animation.defaultProps = {};
/**
 * 设置动画的类型
 * @type {boolean}
 */
Animation.defaultProps.type = 'fade';
/**
 * 设置是否进入动画
 * @type {boolean}
 */
Animation.defaultProps.in = true;
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */
Animation.defaultProps.timeout = 350;
/**
 * 设置折叠动画的方向，width 与 height
 * @type {string}
 */
Animation.defaultProps.dimension="height";
/**
 * 设置动画完成时的回调函数
 * @attribute module:Animation.Animation.onFinished
 * @type {function}
 */
/**
 * 设置动画组件的属性
 * @attribute module:Animation.Animation.transitionProps
 * @type {object}
 */

Animation.defaultProps.types = {
  none: {
    getProps: (state, props)=>{
      delete props.in;
      delete props.timeout;
      return props;
    },
  },
  fade: {
    getProps: (state, aprops)=>{
      let { in:isIn, timeout, dimension, classNamePre, stylePre, ...props } = aprops;
      props.classNamePre = { [`opacity-${(state==='entered'||state==='entering')?'100':(isIn?'50':'0')}`]: true, ...classNamePre }
      props.stylePre = { ...transiton(`${timeout}ms`, { property: 'opacity' }), ...stylePre };
      return props;
    },
  },
  collapse: {
    getProps: (state, aprops)=>{
      let { in:isIn, timeout, dimension, classNamePre, stylePre, ...props } = aprops;
      props.classNamePre = { 'overflow-a-hidden text-white-space-nowrap': true, 'display-none': !isIn&state==='exited', ...classNamePre }
      props.stylePre = { ...transiton(`${timeout}ms`, { property: dimension }), ...stylePre };
      return props;
    },
    onEnter: (props, elem)=>{
      let {dimension} = props;
      elem.style[dimension] = '0';
    },
    onEntering: (props, elem)=>{
      let {dimension} = props;
      elem.style[dimension] = domGetScrollDimensionValue(elem, dimension);
    },
    onEntered: (props, elem)=>{
      let {dimension} = props;
      elem.style[dimension] = null;
    },
    onExit: (props, elem)=>{
      let {dimension} = props;
      elem.style[dimension] = domGetDimensionValue(elem, dimension)+'px';
      domTriggerBrowserReflow(elem);
    },
    onExiting: (props, elem)=>{
      let {dimension} = props;
      elem.style[dimension] = '0';
    },
  }
}


Object.defineProperty(Animation,"Animation",{ get:function(){ return Animation }, set:function(val){ Animation = val }})
Animation.isBnorth = true;
Animation.defaultProps['b-precast'] = {}
export default Animation;