/**
 * @module
 */
import React from 'react';
import BaseComponent, { domIsTouch, domOffset, chainedFuncs, domFindDock, domCreatePortal } from './BaseComponent';
import Panel from './Panel';
import Backdrop from './Backdrop';


/**
 * 可弹出内容组件，可设置弹出内容相对于当前组件的位置
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
class Popover extends React.Component {
  /**
   * 显示弹出内容
   */
  show() {
    this.setState({ show: true, offsetTarget: domOffset(this, this.dock) });
  }
  /**
   * 关闭弹出内容
   */
  hide() {
    this.setState({ show: false, offsetTarget: undefined, offsetOverlay: undefined });
  }

  componentDidMount() {
    this.dock = domFindDock(this, this.props.dock);
    if(this.props.defaultIsShow) Promise.resolve().then(()=>this.show());
  }

  render() {
    let {
      defaultIsShow, trigger, onClick, onMouseOver,
      overlay, overlayProps, backdropProps,
      calcPosition, placement, dock,
      children, ...props
    } = BaseComponent(this.props, Popover);
    let { show, offsetOverlay, offsetTarget } = this.state||{};
    children = typeof(children)==='function'?children(show, this.state, this.props, this):children;
    overlay = typeof overlay==='function'?overlay(this):overlay;

    let triggerByTouch = trigger?trigger==='click':domIsTouch;
    let triggerByHover = trigger?trigger==='hover':!domIsTouch;
    let triggerProps = {
      onClick: triggerByTouch?chainedFuncs(onClick, ()=>show?this.hide():this.show()):onClick,
      onMouseOver: triggerByHover?chainedFuncs(onMouseOver, (e)=>this.show()):onMouseOver,
    };
    let closeProps = {
      onClick: triggerByTouch?()=>this.hide():null,
      onMouseMove: triggerByHover?e=>{
        let x = e.clientX; let y = e.clientY;
        let toffset = this.state.offsetTarget||{};
        if(!(toffset.left <= x && x <= toffset.left+toffset.width && toffset.top <= y && y <= toffset.top+toffset.height)) this.hide();
      }:null,
    };

    return (
      <Panel {...triggerProps} {...props}>
        {children}
        {!show?null:domCreatePortal((
          <Panel component={Backdrop} {...closeProps} {...backdropProps}>
            <Overlay 
              calcPosition={calcPosition} placement={placement} offsetTarget={offsetTarget} offsetOverlay={offsetOverlay} 
              ref={e=>e&&(!offsetOverlay)&&this.setState({offsetOverlay:domOffset(e, this.dock)})} 
              {...overlayProps}>
              {overlay}
            </Overlay>
          </Panel>
        ), this.dock)}
      </Panel>
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
 * 弹出内容触发方式，包括，click：点击时弹出 hover：鼠标移过时弹出
 * @attribute module:Popover.Popover.trigger
 * @type {boolean}
 * @default 非触摸屏时：click，触摸屏时：hover
 */
/**
 * 弹出的内容
 * @attribute module:Popover.Popover.overlay
 * @type {element|component}
 */
/**
 * 弹出内容的属性
 * @attribute module:Popover.Popover.overlayProps
 * @type {object}
 */
/**
 * 弹出内容是否有蒙层，如果设置为真，则使用默认蒙层主题的蒙层
 * @attribute module:Popover.Popover.mask
 * @type {boolean|string}
 */
/**
 * 蒙层的属性
 * @attribute module:Popover.Popover.maskProps
 * @type {object}
 */
/**
 * 弹出内容与目标组件的位置计算回调函数
 * @callback calcPositionCallBack
 * @param {module:utils/dom~ElementOffset} offsetTarget - 目标组件的坐标与尺寸
 * @param {module:utils/dom~ElementOffset} offsetOverlay - 弹出内容的坐标与尺寸
 * @param {string} placement - 弹出内容的位置，包括：left，right，top，bottom
 * @param {string} main - 弹出内容的主轴布局方式，full：填满 center：居中 equal：与目标组件相同 auto：默认
 * @param {string} cross - 弹出内容的侧轴布局方式，参见主轴
 */
/**
 * 弹出内容与组件的相对位置计算函数
 * @attribute module:Popover.Popover.calcPosition
 * @type {module:Popover~calcPositionCallBack}
 */
Popover.defaultProps.calcPosition = function(offsetTarget, offsetOverlay, placement, main, cross) {
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
};
/**
 * 设置弹出内容与目标组件的相对位置与布局，格式为 placement-main-cross，参见 calcPositionCallBack
 * @attribute module:Popover.Popover.placement
 * @type {string}
 */
/**
 * 设置弹出内容的容器
 * @attribute module:Popover.Popover.dock
 * @type {boolean}
 */

Object.defineProperty(Popover,"Popover",{ get:function(){ return Popover }, set:function(val){ Popover = val }})
Popover.isBnorth = true;
Popover.defaultProps['b-precast'] = {}
export default Popover;


/**
 * 弹出层组件
 * @component
 * @augments BaseComponent
 * @mount Popover.Overlay
 * @private
 */
let Overlay = class extends React.Component {
  render() {
    let {
      calcPosition, offsetTarget, offsetOverlay, placement,
      classNamePre, stylePre, ...props
    } = BaseComponent(this.props, Overlay);
    
    let [classNamePosition, stylePosition] = offsetOverlay?calcPosition(offsetTarget,offsetOverlay, ...((placement&&placement.split('-'))||[])) : [{'visibility-hidden':true},{}];
    classNamePre = {
      'position-absolute bg-color-white border-set-a-': true,
      ...classNamePosition,
      ...classNamePre,
    }
    stylePre = {
      boxSizing: 'content-box',
      ...stylePosition,
      ...stylePre,
    };

    return <Panel onMouseMove={e=>e.stopPropagation()} classNamePre={classNamePre} stylePre={stylePre} {...props} />
  }
}

Overlay.defaultProps = {};
/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.calcPosition
 */
/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.offsetTarget
 */
/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.offsetOverlay
 */
/**
 * 参见 calcPositionCallBack
 * @attribute module:Popover~Overlay.placement
 */

Object.defineProperty(Popover,"Overlay",{ get:function(){ return Overlay }, set:function(val){ Overlay = val }})
Overlay.isBnorth = true;
Overlay.defaultProps['b-precast'] = {}
