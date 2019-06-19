/**
 * @module
 */
import React from 'react';
import animationFrame from '@bnorth/rich.css/lib/styles/animationFrame';
import { domFindNode } from './BaseComponent';


/**
 * 动画组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
let AnimationFrame = class extends React.Component{
  handleFinished() {
    let { rewind, params, onFinished } = this.props;
    onFinished&&onFinished(params, rewind);
  }

  componentDidMount() {
    let { play, rewind, duration, frameFunc, params } = this.props;
    let element = domFindNode(this);
    let ret = animationFrame(element, frameFunc, {autoStart: play, ...params, rewind, duration}, ()=>this.handleFinished());
    if(ret) {
      let [stop, start] = ret;
      this.stop = stop;
      this.start = start;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { play, rewind } = this.props;

    if(prevProps.play !== play && play) { 
      play&&this.start&&this.start();
      !play&&this.stop&&this.stop();
    }else if(prevProps.rewind !== rewind) { 
      this.start&&this.start({reset: true, rewind});
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

AnimationFrame.defaultProps = {};
/**
 * 设置动画的是否开始播放
 * @type {boolean}
 */
AnimationFrame.defaultProps.play = true;
/**
 * 设置动画倒叙播放
 * @attribute module:AnimationFrame.AnimationFrame.rewind
 * @type {func}
 */
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */
AnimationFrame.defaultProps.duration = 200;
/**
 * 设置动画函数
 * @attribute module:AnimationFrame.AnimationFrame.frameFunc
 * @type {func}
 */
/**
 * 设置动画函数的参数
 * @attribute module:AnimationFrame.AnimationFrame.params
 * @type {object}
 */
/**
 * 设置动画完成时的回调函数
 * @attribute module:AnimationFrame.AnimationFrame.onFinished
 * @type {function}
 */

Object.defineProperty(AnimationFrame,"AnimationFrame",{ get:function(){ return AnimationFrame }, set:function(val){ AnimationFrame = val }})
AnimationFrame.isBnorth = true;
AnimationFrame.defaultProps['b-precast'] = {}
export default AnimationFrame;