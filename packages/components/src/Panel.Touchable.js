/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import Hammer from 'hammerjs';
import { domIsTouch, domFindNode } from './utils/dom';
import Panel from './Panel';


Hammer.defaults.inputClass = domIsTouch?Hammer.TouchInput:Hammer.TouchMouseInput;
Hammer.defaults.touchAction = 'pan-y'; // :TODO 

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
				hammer.set({kk,vv});
			})
		}else if(k==='recognizers') { // recognizers
			Object.entries(v||{}).forEach(([kk,vv])=>{
				let recognizer = hammer.get(kk);
				recognizer.set(vv);
				if(recognizer.requireFailure) recognizer.requireFailure(vv.requireFailure);
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


Panel.Touchable = class Touchable extends React.Component{
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
    let props = {};
    Object.keys(this.props).forEach(v=>{
			if (!privateProps[v]) props[v] = this.props[v];
		});

    return <Panel {...props} />
  }
}


export default Panel;