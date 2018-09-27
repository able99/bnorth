/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel';
import Hammer from 'hammerjs';
Hammer.defaults.inputClass = 'ontouchstart' in window?Hammer.TouchInput:Hammer.TouchMouseInput;
Hammer.defaults.touchAction = 'pan-up';
export { Hammer }
//, domEvents: false, 

let privateProps = {
	direction: true,
	options: true,
	recognizeWith: true,
	vertical: true,
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

Object.keys(handlerToEvent).forEach(function(i) {
	privateProps[i] = true;
});

function updateHammer(hammer, props) {
	if (props.hasOwnProperty('vertical')) {
		console.warn('vertical is deprecated, please use `direction` instead');
	}

	var directionProp = props.direction;
	if (directionProp || props.hasOwnProperty('vertical')) {
		var direction = directionProp
			? directionProp
			: props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL';
		hammer.get('pan').set({ direction: Hammer[direction] });
		hammer.get('swipe').set({ direction: Hammer[direction] });
	}

	if (props.options) {
		Object.keys(props.options).forEach(function(option) {
			if (option === 'recognizers') {
				Object.keys(props.options.recognizers).forEach(function(gesture) {
					var recognizer = hammer.get(gesture);
					recognizer.set(props.options.recognizers[gesture]);
					if (props.options.recognizers[gesture].requireFailure) {
						recognizer.requireFailure(
							props.options.recognizers[gesture].requireFailure
						);
					}
				}, this);
			} else {
				var key = option;
				var optionObj = {};
				optionObj[key] = props.options[option];
				hammer.set(optionObj);
			}
		}, this);
	}

	if (props.recognizeWith) {
		Object.keys(props.recognizeWith).forEach(function(gesture) {
			var recognizer = hammer.get(gesture);
			recognizer.recognizeWith(props.recognizeWith[gesture]);
		}, this);
	}

	Object.keys(props).forEach(function(p) {
		var e = handlerToEvent[p];
		if (e) {
			hammer.off(e);
			hammer.on(e, props[p]&&props[p].bind(null, hammer));
		}
	});
}


class Touchable extends React.Component{
  componentDidMount() {
		let el = ReactDOM.findDOMNode(this.el);
		if(!el) throw new Error('touchable: no el find');
    this.hammer = new Hammer(el);
    updateHammer(this.hammer, this.props);
  }

  componentWillUnmount() {
		if (this.hammer) {
			this.hammer.stop();
			this.hammer.destroy();
      this.hammer = null;
		}
  }
  
  componentDidUpdate() {
		this.hammer&&updateHammer(this.hammer, this.props);
	}

  render() {
    let props = {};
    Object.keys(this.props).forEach(v=>{
			if (!privateProps[v]) props[v] = this.props[v];
		});

    return <Panel refWrap={e=>e&&(this.el=e)} {...props} />
  }
}

Panel.Touchable = Touchable;


export default Panel;