/**
 * @module
 */
import React from 'react';
import Hammer from 'hammerjs';
import { domIsTouch, domFindNode } from './utils/dom';
import Panel from './Panel';


export default Panel;


Hammer.defaults.inputClass = domIsTouch?Hammer.TouchInput:Hammer.TouchMouseInput;
Hammer.defaults.preset.forEach(v=>{ !v[1]&&v.push({}); v[1].enable = false });

let privateProps = {
	direction: true,
	options: true,
	recognizers: true,
	recognizeWith: true,
};

const handlerToEvent = {
	action: 'tap press',
	onDoubleTap: 'doubletap',
	onPan: 'pan',
	onPanCancel: 'pancancel',
	onPanEnd: 'panend',
	onPanStart: 'panstart',
	onPinch: 'pinch',
	onPinchCancel: 'pinchcancel',
	onPinchEnd: 'pinchend',
	onPinchIn: 'pinchin',
	onPinchOut: 'pinchout',
	onPinchStart: 'pinchstart',
	onPress: 'press',
	onPressUp: 'pressup',
	onRotate: 'rotate',
	onRotateCancel: 'rotatecancel',
	onRotateEnd: 'rotateend',
	onRotateMove: 'rotatemove',
	onRotateStart: 'rotatestart',
	onSwipe: 'swipe',
	onSwipeRight: 'swiperight',
	onSwipeLeft: 'swipeleft',
	onSwipeUp: 'swipeup',
	onSwipeDown: 'swipedown',
	onTap: 'tap',
};

Object.keys(handlerToEvent).forEach(v=>{
	privateProps[v] = true;
});


function updateHammer(hammer, props) {
	Object.entries(props).forEach(([k,v])=>{
		if(k==='direction') { // direaction
			let direction = 'DIRECTION_' + (v?String(v).toUpperCase():'ALL');
			hammer.get('pan').set({ direction: Hammer[direction] });
			hammer.get('swipe').set({ direction: Hammer[direction] });
		}else if(k==='options') { // options
			Object.entries(v).forEach(([kk,vv])=>{
				if (kk === 'recognizers') return;
				hammer.set({[kk]:vv});
			})
		}else if(k==='recognizers') { // recognizers
			Object.entries(v||{}).forEach(([kk,vv])=>{
				let recognizer = hammer.get(kk);
				recognizer.set(vv);
				if(vv.requireFailure) recognizer.requireFailure(vv.requireFailure);
			})
		}else if(k==='recognizeWith') { // recognizeWith
			Object.entries(v||{}).forEach(([kk,vv])=>{
				let recognizer = hammer.get(kk);
				recognizer.recognizeWith(vv);
			})
		}else{ // event
			k = handlerToEvent[k];
			if(!k) return;
			hammer.off(k);
			hammer.on(k, v&&((e)=>v(e, hammer.element)));
		}
	});
}


// Touchable
// ------------------------

/**
 * 支持手势的小面板
 * @component
 * @mount Panel.Touchable
 * @augments BaseComponent
 * @see {@link https://hammerjs.github.io/} hammerjs
 */
class Touchable extends React.Component{
  componentDidMount() {
		let el = domFindNode(this);
		if(!el) throw new Error('panel.touchable: no el find');
    this.hammer = new Hammer(el);
    updateHammer(this.hammer, this.props);
  }

  componentWillUnmount() {
		if(!this.hammer) return;
		this.hammer.stop();
		this.hammer.destroy();
		this.hammer = null;
  }
  
  componentDidUpdate() {
		if(!this.hammer) return;
		updateHammer(this.hammer, this.props);
	}

  render() {
		let {component:Component, ...props} = this.props;
    Object.keys(props).forEach(v=>{ if(privateProps[v]) delete props[v] });
    return <Component {...props} />
  }
}

Object.defineProperty(Panel,"Touchable",{ get:function(){ return Touchable }, set:function(val){ Touchable = val }})

Touchable.defaultProps = {};
/**
 * 设置手势识别器的识别方向，none，left，right，up，down，horizontal，vertical，all
 * @attribute Panel.module:Touchable~Touchable.direction
 * @type {string}
 */
/**
 * 设置手势识别器的参数，比如 touchAction ：设置 touchAction
 * @attribute Panel.module:Touchable~Touchable.options
 * @type {object}
 */
/**
 * 设置指定手势识别器的参数，enable 为通用属性，如果想要打开某个识别器，需要设置为 true。
 * 识别器包括：tap<点>, doubletap<双点击>, press<按住>, 水平方位的pan<平移> 和 swipe<快速滑动>, 以及多触点的 pinch<捏放> 和 rotate<旋转>识别器
 * @attribute Panel.module:Touchable~Touchable.recognizers
 * @type {object}
 * @example
 * ```jsx
 * <Panel.Touchable direction="horizontal" recognizers={{'pan':{enable: true}}} onPan={e=>console.log(e.deltaY, e.deltaX)} />
 * ```
 */
/**
 * 设置关联触发的识别器
 * @attribute Panel.module:Touchable~Touchable.recognizeWith
 * @type {object}
 */
/**
 * 手势事件
 * @typedef RecognizerEvent
 * @type {object}
 * @property {string} type - 事件名称
 * @property {number} deltaX - x 轴移动距离
 * @property {number} deltaY - y 轴移动距离
 * @property {number} deltaTime - 事件时间（毫秒）
 * @property {number} distance - 移动距离
 * @property {number} angle - 移动角度
 * @property {number} velocityX - x 轴移动速率
 * @property {number} velocityY - y 轴移动速率
 * @property {number} volocity - 最高速率
 * @property {string} direction - 事件方向
 * @property {string} offsetDirection - 偏移方向
 * @property {number} scale - 缩放比率
 * @property {event} srcEvent - 源事件
 * @property {number} rotation - 旋转角度
 * @property {object} center - 多点的中心坐标，或者单点的点击坐标
 * @property {element} target - 事件目标
 * @property {boolean} isFirst - 交互为首次交互
 * @property {boolean} isFinal - 交互为最后一次交互
 * @property {function} preventDefault - 阻止默认事件处理
 */
/**
 * 手势事件回调函数
 * @callback RecognizerCallback
 * @param {Panel.module:Touchable~RecognizerEvent} event - 手势事件
 * @param {element} element - 手势识别的元素
 */
/**
 * 双击事件处理函数，对应手势 doubletap
 * @attribute Panel.module:Touchable~Touchable.onDoubleTap
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 平移事件处理函数，对应手势 pan
 * @attribute Panel.module:Touchable~Touchable.onPan
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 平移事件取消处理函数，对应手势 pancancel
 * @attribute Panel.module:Touchable~Touchable.onPanCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 平移事件结束处理函数，对应手势 panend
 * @attribute Panel.module:Touchable~Touchable.onPanEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 捏放事件处理函数，对应手势 pinch
 * @attribute Panel.module:Touchable~Touchable.onPinch
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 捏放事件取消处理函数，对应手势 pinchcancel
 * @attribute Panel.module:Touchable~Touchable.onPinchCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 捏放事件结束处理函数，对应手势 pinchend
 * @attribute Panel.module:Touchable~Touchable.onPinchEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 缩小事件处理函数，对应手势 pinchin
 * @attribute Panel.module:Touchable~Touchable.onPinchIn
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 放大事件处理函数，对应手势 pinchout
 * @attribute Panel.module:Touchable~Touchable.onPinchOut
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 捏放事件开始处理函数，对应手势 pinchstart
 * @attribute Panel.module:Touchable~Touchable.onPinchStart
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 按住事件处理函数，对应手势 press
 * @attribute Panel.module:Touchable~Touchable.onPress
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 按住并抬起事件处理函数，对应手势 pressup
 * @attribute Panel.module:Touchable~Touchable.onPressUp
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 旋转事件处理函数，对应手势 rotate
 * @attribute Panel.module:Touchable~Touchable.onRotate
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 旋转取消事件处理函数，对应手势 rotatecancel
 * @attribute Panel.module:Touchable~Touchable.onRotateCancel
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 旋转结束事件处理函数，对应手势 rotateend
 * @attribute Panel.module:Touchable~Touchable.onRotateEnd
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 旋转并移动事件处理函数，对应手势 rotatemove
 * @attribute Panel.module:Touchable~Touchable.onRotateMove
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 旋转开始事件处理函数，对应手势 rotatestart
 * @attribute Panel.module:Touchable~Touchable.onRotateStart
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 快速滑动事件处理函数，对应手势 swipe
 * @attribute Panel.module:Touchable~Touchable.onSwipe
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 快速右滑事件处理函数，对应手势 swiperight
 * @attribute Panel.module:Touchable~Touchable.onSwipeRight
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 快速左滑事件处理函数，对应手势 swipeleft
 * @attribute Panel.module:Touchable~Touchable.onSwipeLeft
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 快速上滑事件处理函数，对应手势 swipeup
 * @attribute Panel.module:Touchable~Touchable.onSwipeUp
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 快速下滑事件处理函数，对应手势 swipedown
 * @attribute Panel.module:Touchable~Touchable.onSwipeDown
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:Touchable~Touchable.onTap
 * @type {Panel.module:Touchable~RecognizerCallback}
 */
/**
 * 参见 BaseComponent
 */
Touchable.defaultProps.component = Panel;
