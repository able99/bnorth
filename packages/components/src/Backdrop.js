/**
 * @module
 */
import React from 'react';
import { afZoom } from '@bnorth/rich.css/lib/styles/animationFrame';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import AnimationFrame from './AnimationFrame';


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
  let { 
    play, rewind, frameFunc, params={}, onFinished, duration,
    classNamePre, ...props 
  } = BaseComponent(aprops, Backdrop);

  classNamePre = {
    'position-absolute square-full offset-a-start overflow-a-hidden': true,
    ...classNamePre,
  }

  return (
    <AnimationFrame play={play} rewind={rewind} frameFunc={frameFunc} params={params} onFinished={onFinished}>
      <Panel b-style="mask" btn={false} classNamePre={classNamePre} {...props} />
    </AnimationFrame> 
  )
}

Backdrop.defaultProps = {};
Backdrop.defaultProps.frameFunc = afZoom;

Object.defineProperty(Backdrop,"Backdrop",{ get:function(){ return Backdrop }, set:function(val){ Backdrop = val }})
Backdrop.isBnorth = true;
Backdrop.defaultProps['b-precast'] = {};
export default Backdrop;