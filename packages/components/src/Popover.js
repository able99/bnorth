/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { domIsTouch, domOffset } from './utils/dom';
import { createChainedFunction } from './utils/event';
import { genCommonProps, cx, hascx } from './utils/props';
import Backdrop from './Backdrop';


class Popover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    this.props.defaultIsShow&&setTimeout(()=>this.show(), 100);
  }

  show() {
    this.setState({ show: true, offsetTarget: domOffset(this) });
  }

  hide() {
    this.setState({ show: false, offsetOverlay: undefined });
  }

  render() {
    const {
      defaultIsShow, trigger, onClick, onMouseOver,
      overlay, overlayProps, mask, maskProps,
      calcPosition=Popover.calcPosition, placement, container,
      component:Component="div", children, ...props
    } = genCommonProps(this.props);
    const { show, offsetOverlay, offsetTarget } = this.state;


    let triggerByTouch = trigger?trigger==='click':domIsTouch;
    let triggerByHover = trigger?trigger==='hover':!domIsTouch;
    let triggerProps = {
      onClick: triggerByTouch?createChainedFunction(onClick, ()=>this.state.show?this.hide():this.show()):onClick,
      onMouseOver: triggerByHover?createChainedFunction(onMouseOver, (e)=>this.show()):onMouseOver,
    };
    let closeProps = {
      onClick: triggerByTouch?()=>this.hide():null,
      onMouseMove: triggerByHover?e=>{
        let x = e.pageX; let y = e.pageY;
        let toffset = domOffset(ReactDOM.findDOMNode(this));
        if(!(toffset.left <= x && x <= toffset.left+toffset.width && toffset.top <= y && y <= toffset.top+toffset.height)) this.hide();
      }:null,
    };


    return (
      <Component {...props} {...triggerProps}>
        {(Array.isArray(children)?children:[children])
          .map(v=>typeof(v)==='function'?v(show, this.state, this.props):v)}
        {!show||!container?null:ReactDOM.createPortal((
          <Backdrop mask={mask} {...closeProps} {...maskProps}>
            <Popover.Overlay 
              calcPosition={calcPosition} placement={placement}
              offsetTarget={offsetTarget} offsetOverlay={offsetOverlay} 
              ref={e=>e&&(!offsetOverlay)&&this.setState({offsetOverlay:domOffset(e)})} 
              {...overlayProps}>
              {overlay}
            </Popover.Overlay>
          </Backdrop>
        ), container)}
      </Component>
    );
  }
}

Popover.calcPosition = function(offsetTarget, offsetOverlay, placement, main, cross) {
  let classSet = {
    'position-absolute': true,
  };
  let styleSet = {};

  switch(placement){
    case 'left':
      styleSet.left = offsetTarget.left - offsetOverlay.width;
      styleSet.top = offsetTarget.top;
      break;
    case 'right':
      styleSet.left = offsetTarget.left + offsetTarget.width;
      styleSet.top = offsetTarget.top;
      break;
    case 'top':
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top - offsetOverlay.height;
      break;
    case 'bottom':
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top + offsetTarget.height;
      break;
    default:
      styleSet.left = offsetTarget.left;
      styleSet.top = offsetTarget.top;
      break;
  }

  if(cross==='full'){
    if(placement==='top'||placement==='bottom'){
      styleSet.width = '100%';
      styleSet.left = 0;
      styleSet.right = 0;
    }
  }

  if(cross==='center'){
    if(placement==='left'||placement==='right'){
      styleSet.top -= (Math.abs(offsetOverlay.height-offsetTarget.height))/2;
    }

    if(placement==='top'||placement==='bottom'){
      styleSet.left -= (Math.abs(offsetOverlay.width-offsetTarget.width))/2;
    }
  }

  if(main==='equal'){
    if(placement==='left'||placement==='right'){
      styleSet.width = offsetTarget.width;
    }

    if(placement==='top'||placement==='bottom'){
      styleSet.height = offsetTarget.height;
    }
  }

  if(main==='full'){
    if(placement==='bottom'){
      styleSet.bottom = 0;
    }
  }

  if(cross==='equal'){
    if(placement==='left'||placement==='right'){
      styleSet.height = offsetTarget.height;
    }

    if(placement==='top'||placement==='bottom'){
      styleSet.width = offsetTarget.width;
    }
  }

  return [classSet, styleSet];
}

Popover.Overlay = class extends React.Component {
  render() {
    let {
      container, calcPosition, offsetTarget, offsetOverlay, placement,
      style, className, children, ...props
    } = genCommonProps(this.props);


    let classSet = {
      'position-absolute': true,
      'bg-color-white': !hascx(className, 'bg-color'),
      'border': !hascx(className, 'border'),
    };

    let styleSet = {
      boxSizing: 'content-box'
    };

    let [classSetPosition, styleSetPosition] = offsetOverlay
      ?calcPosition(offsetTarget,offsetOverlay, ...((placement&&placement.split('-'))||[]))
      :[{'visibility-hidden':true},{}]


    return (
      <div 
        onMouseMove={e=>e.stopPropagation()} 
        style={{...styleSet,...styleSetPosition,...style}} className={cx(classSet, classSetPosition, className)} {...props}>
        {children}
      </div>
    ) 
  }
}


export default Popover;