/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { domIsTouch, domOffset, chainedFuncs, domFindContainer, domCreatePortal } from './utils/dom';
import parseProps from './utils/props';
import Panel from './Panel';
import Backdrop from './Backdrop';


// Popover
// --------------------

/**
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
class Popover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  show() {
    this.setState({ show: true, offsetTarget: domOffset(this, this.container) });
  }

  hide() {
    this.setState({ show: false, offsetTarget: undefined, offsetOverlay: undefined });
  }

  componentDidMount() {
    this.container = domFindContainer(this, this.props.container);
    if(this.props.defaultIsShow) Promise.resolve().then(()=>this.show());
  }

  render() {
    const {
      defaultIsShow, trigger, onClick, onMouseOver,
      overlay, overlayProps, mask=false, maskProps,
      calcPosition=Popover.calcPosition, placement, container,
      component:Component=Panel, componentPanel, children, ...props
    } = parseProps(this.props, Popover.props);
    const { show, offsetOverlay, offsetTarget } = this.state;


    let triggerByTouch = trigger?trigger==='click':domIsTouch;
    let triggerByHover = trigger?trigger==='hover':!domIsTouch;
    let triggerProps = {
      onClick: triggerByTouch?chainedFuncs(onClick, ()=>this.state.show?this.hide():this.show()):onClick,
      onMouseOver: triggerByHover?chainedFuncs(onMouseOver, (e)=>this.show()):onMouseOver,
    };
    let closeProps = {
      onClick: triggerByTouch?()=>this.hide():null,
      onMouseMove: triggerByHover?e=>{
        let x = e.pageX; let y = e.pageY;
        let toffset = this.state.offsetTarget||{};
        if(!(toffset.left <= x && x <= toffset.left+toffset.width && toffset.top <= y && y <= toffset.top+toffset.height)) this.hide();
      }:null,
    };

    return (
      <Component component={componentPanel} {...triggerProps} {...props}>
        {typeof(children)==='function'?children(show, this.state, this.props):children}
        {!show?null:domCreatePortal((
          <Backdrop mask={mask} {...closeProps} {...maskProps}>
            <Overlay 
              calcPosition={calcPosition} placement={placement} offsetTarget={offsetTarget} offsetOverlay={offsetOverlay} 
              ref={e=>e&&(!offsetOverlay)&&this.setState({offsetOverlay:domOffset(e, this.container)})} 
              {...overlayProps}>
              {typeof overlay==='function'?overlay(this):overlay}
            </Overlay>
          </Backdrop>
        ), this.container)}
      </Component>
    );
  }
}

Popover.defaultProps = {};
/**
 * 设置是否创建时为弹出状态
 * @attribute module:Popover.Popover.defaultIsShow
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.trigger
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.onClick
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.onMouseOver
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.overlay
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.overlayProps
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.mask
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.maskProps
 * @type {boolean}
 */
/**
 * 
 * @type {boolean}
 */
Popover.defaultProps.calcPosition = Popover.calcPosition;
/**
 * 
 * @attribute module:Popover.Popover.placement
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Popover.container
 * @type {boolean}
 */
/**
 * 设置映射组件
 * @type {element|component}
 */
Popover.defaultProps.component = Panel;
/**
 * 设置 Panel 组件的映射组件，只有当映射组件设置为 Panel 或者基于 Panel 时有效
 * @attribute module:Popover.Popover.componentPanel
 * @type {element|component}
 */

export default Popover;

// Calc Position
// --------------------

/**
 * 弹出层位置计算函数
 * @member
 * @param {*} offsetTarget 
 * @param {*} offsetOverlay 
 * @param {*} placement 
 * @param {*} main 
 * @param {*} cross 
 */
Popover.calcPosition = function(offsetTarget, offsetOverlay, placement, main, cross) {
  let classSet = {'position-absolute': true};
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

// Overlay
// --------------------

/**
 * 弹出层组件
 * @component
 * @augments BaseComponent
 * @mount Popover.Overlay
 */
let Overlay = class extends React.Component {
  render() {
    let {
      calcPosition, offsetTarget, offsetOverlay, placement,
      component:Component=Panel, componentPanel, style, className, ...props
    } = parseProps(this.props, Overlay.props);

    let classStr = 'position-absolute bg-color-white border-set-a-';
    let styleSet = {boxSizing: 'content-box'};
    let [classSetPosition, styleSetPosition] = offsetOverlay?calcPosition(offsetTarget,offsetOverlay, ...((placement&&placement.split('-'))||[])) : [{'visibility-hidden':true},{}];

    return (
      <Component 
        component={componentPanel} 
        onMouseMove={e=>e.stopPropagation()} 
        style={{...styleSet,...styleSetPosition,...style}} className={classes(classStr, classSetPosition, className)} {...props} />
    );
  }
}
Overlay.defaultProps = {};
/**
 * 
 * @attribute module:Popover.Overlay.calcPosition
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Overlay.offsetTarget
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Overlay.offsetOverlay
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Popover.Overlay.placement
 * @type {boolean}
 */
/**
 * 设置映射组件
 * @type {element|component}
 */
Overlay.defaultProps.component = Panel;
/**
 * 设置 Panel 组件的映射组件，只有当映射组件设置为 Panel 或者基于 Panel 时有效
 * @attribute module:Popover.Popover.componentPanel
 * @type {element|component}
 */


Object.defineProperty(Popover,"Overlay",{ get:function(){ return Overlay }, set:function(val){ Overlay = val }})



