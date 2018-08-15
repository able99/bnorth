import React from 'react';
import hocHelper from '../utils/hocHelper'; 
import { domIsTouch, domTouchEventNameMaps } from '../utils/dom';
import { on, off, createChainedFunction } from '../utils/event';


export default (WrappedComponent, options={})=>{
  class EnhancedComponent extends React.PureComponent{
    static defaultProps = {
      tapLimitDistance: 30,
      tapLongDuration: 750,
      tapDoubleDuration: 250,
    }
  
    constructor (props) {
      super(props);
      this.reset();
    }
  
    reset = () => {
      this.touch = {};
      this.binded = false;
      this.tapTimer = null;
      this.swipeTimer = null;
      this.moveStartTimer = null;
      this.moveTimer = null;
      this.moveEndTimer = null;
      this.longTapTimer = null;
      this.touchTimes = 0;
      this.doubleTapTimer = null;
    }
  
    _processEvent(e) {
      (this.props.onTap) && e.stopPropagation();
    }
  
    down = event => {
      this._processEvent(event);
  
      const touch = this.touch;
      const { tapLongDuration, onMoveStart, onMove, onMoveEnd, onLongTap } = this.props;
      const primaryTouch = domIsTouch ? event.touches[0] : event;
  
      if (onMoveStart || onMove || onMoveEnd) event.preventDefault();
      if (domIsTouch && event.touches.length !== 1) return;
  
      if (!this.binded) {
        on(document, domTouchEventNameMaps.move, this.move);
        on(document, domTouchEventNameMaps.up, this.up);
        on(document, domTouchEventNameMaps.cancel, this.cancel);
        on(window, 'scroll', this.cancel);
        this.binded = true
      }
  
      if (onLongTap) {
        if (this.longTapTimer) clearTimeout(this.longTapTimer);
        this.longTapTimer = setTimeout(onLongTap, tapLongDuration);
      }
  
      if (onMoveStart) {
        this.moveStartTimer = setTimeout(onMoveStart, 0);
      }
  
      touch.x1 = primaryTouch.pageX
      touch.y1 = primaryTouch.pageY
  
      this.touchTimes += 1
    }
  
    move = event => {
      this._processEvent(event);
  
      const { onMove } = this.props;
      const touch = this.touch;
      const { x1, y1 } = touch;
      const primaryTouch = domIsTouch?event.touches[0]:event;
      const x2 = primaryTouch.pageX;
      const y2 = primaryTouch.pageY;
  
      if (this.longTapTimer) clearTimeout(this.longTapTimer);
  
      if (onMove) {
        this.moveTimer = setTimeout(()=>onMove({ x: x1, y: y1 }, { x: x2, y: y2 }), 0);
      }
  
      touch.x2 = x2;
      touch.y2 = y2;
    }
  
    up = event => {
      this._processEvent(event);
  
      const { tapLimitDistance, tapDoubleDuration, onTap, onDoubleTap, onSwipe, onMoveEnd } = this.props;
      const { x1, y1, x2, y2 } = this.touch;
  
      if (this.longTapTimer) clearTimeout(this.longTapTimer);
  
      // Move
      if (onMoveEnd && x2) {
        this.moveEndTimer = setTimeout(()=>onMoveEnd({ x: x1, y: y1 }, { x: x2, y: y2 }), 0);
      }
  
      if ((x2 && Math.abs(x1 - x2)>tapLimitDistance)||(y2 && Math.abs(y1 - y2)>tapLimitDistance)) { // Swipe
        const direction = Math.abs(x1-x2)>=Math.abs(y1 - y2)?(x1>x2?'Left':'Right'):(y1>y2?'Up':'Down');
        const swipeFunc = this.props[`onSwipe${direction}`];
  
        this.swipeTimer = setTimeout(()=>{
          if (onSwipe) onSwipe();
          if (swipeFunc) swipeFunc();
          this.cancel();
        }, 0)
      } else { // Tap
        if (onDoubleTap) {
          if (!this.doubleTapTimer) {
            this.doubleTapTimer = setTimeout(()=>{ 
              if (this.touchTimes === 2) { onDoubleTap() } else if (onTap) { onTap() }
              this.cancel();
            }, tapDoubleDuration)
          }
        } else {
          this.tapTimer = setTimeout(() => {
            if (onTap) onTap();
            this.cancel();
          }, 0)
        }
      }
    }
  
    cancel = () => {
      off(document, domTouchEventNameMaps.move, this.move);
      off(document, domTouchEventNameMaps.up, this.up);
      off(document, domTouchEventNameMaps.cancel, this.cancel);
      off(window, 'scroll', this.cancel);
  
      if (this.tapTimer) clearTimeout(this.tapTimer);
      if (this.swipeTimer) clearTimeout(this.swipeTimer);
      if (this.moveStartTimer) clearTimeout(this.moveStartTimer);
      if (this.moveTimer) clearTimeout(this.moveTimer);
      if (this.moveEndTimer) clearTimeout(this.moveEndTimer);
      if (this.longTapTimer) clearTimeout(this.longTapTimer);
      if (this.doubleTapTimer) clearTimeout(this.doubleTapTimer);
  
      this.reset();
    }
  
    componentWillUnmount () {
      this.cancel();
    }

    render () {
      const { 
        onTouchStart, onMouseDown, 
        tapLimitDistance, tapLongDuration, tapDoubleDuration,
        onTap, onDoubleTap, onLongTap, onSwipe,
        onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp, 
        onMoveStart, onMove, onMoveEnd, 
        ...rest 
      } = this.props


      return (
        <WrappedComponent
          onTouchStart={createChainedFunction(this.down, onTouchStart)}
          onMouseDown={createChainedFunction(this.down, onMouseDown)}
          {...rest} />
      );
    }
  }

  return hocHelper(WrappedComponent, EnhancedComponent, options, 'Touchable');
}