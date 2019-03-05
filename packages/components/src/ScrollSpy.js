/**
 * @module
 */
import React from 'react';
import BaseComponent, { listen, domOffset, domFindNode, domFindScrollDock } from './BaseComponent';
import Panel from './Panel';


/**
 * 滚动监控组件
 * @component
 * @exportdefault
 */
class ScrollSpy extends React.Component {
  _getTargetOffset() {
    this.targetOffset = null;
    let { target=true, onRelativeChange } = this.props;
    if(!target||!onRelativeChange) return;

    if(target===true) {
      this.targetOffset = domOffset(this, this.dock);
    }else if(target==='parent') {
      let dom = domFindNode(this); if(!dom) return;
      dom = dom.parentNode; if(!dom) return;
      this.targetOffset = domOffset(dom, this.dock);
    }

    if(this.targetOffset) this.targetOffset.bottom = this.targetOffset.top+this.targetOffset.height;
  }

  _getScrollOffset() {
    if(!this.dock) return {};
    return {top: this.dock.scrollTop, bottom: this.dock.scrollTop+this.dock.offsetHeight}
  }

  _getRelative(targetOffset, scrollOffset) {
    // top is within the viewport
    if (targetOffset.top <= scrollOffset.top && scrollOffset.top <= targetOffset.bottom) {
      return 'above_inside';
    }

    // bottom is within the viewport
    if (targetOffset.top <= scrollOffset.bottom && scrollOffset.bottom <= targetOffset.bottom) {
      return 'below_inside';
    }

    // top is above the viewport and bottom is below the viewport
    if (scrollOffset.top <= targetOffset.top && targetOffset.bottom <= scrollOffset.bottom) {
      return 'inside';
    }

    if (targetOffset.bottom < scrollOffset.bottom) {
      return 'above';
    }

    if (scrollOffset.top < targetOffset.top) {
      return 'below';
    }
  }

  componentDidMount() {
    this.relative = '';
    this.dock = domFindScrollDock(this, this.props.dock, this.props.horizontal);
    this._getTargetOffset();

    this.offScrollListener = listen( this.dock, 'scroll', this._handlePosChange.bind(this), true);
    this.offResizeListener = listen( window, 'resize', this._handlePosChange.bind(this), true);

    this._handlePosChange();
  }

  componentWillUnmount() {
    this.offScrollListener&&this.offScrollListener();
    this.offResizeListener&&this.offResizeListener();
  }

  componentDidUpdate() {
    this._getTargetOffset();
    this._handlePosChange();
  }

  _handlePosChange(event) {
    const { onPosChange, onRelativeChange } = this.props;
    onPosChange&&onPosChange(event, this.dock);
    if(!onRelativeChange||!this.targetOffset) return;

    let targetOffset = this.targetOffset;
    let scrollOffset = this._getScrollOffset();
    
    let relative = this._getRelative(targetOffset, scrollOffset);
    if(relative !== this.relative) {
      onRelativeChange(relative, this.relative, event, this.dock);
      this.relative = relative;
    }
  }

  render() {
    let { onPosChange, onRelativeChange, horizontal, dock, target, ...props } = BaseComponent(this.props, ScrollSpy);
    return <Panel component="span" stylePre={{ fontSize: 0}} {...props} />;
  }
}

ScrollSpy.defaultProps = {};
/**
 * TODO
 * @type {boolean|string}
 */
ScrollSpy.defaultProps.target = true;
/**
 * TODO
 * @attribute module:ScrollSpy.ScrollSpy.dock
 * @type {boolean}
 */
/**
 * 监听横向滚动条，默认监听纵向滚动条
 * @attribute module:ScrollSpy.ScrollSpy.horizontal
 * @type {boolean}
 */
/**
 * 相对位置
 * 
 * - above_inside：
 * - below_inside：
 * - inside：
 * - above：
 * - below：
 * 
 * @typedef RelativeType
 * @type {string}
 */
/**
 * 相对位置改变回调函数
 * @callback onRelativeChangeCallback
 * @param {module:ScrollSpy~RelativeType} relative - 相对位置
 * @param {module:ScrollSpy~RelativeType} preRelative - 改变前的相对位置
 * @param {event} event - 引起改变的滚动事件
 * @param {element} dock - 滚动对象的 dom 元素
 */
/**
 * 设置滚动位置改变时引起，监控组件与滚动组件相对位置改变的事件的回调函数
 * @attribute module:ScrollSpy.ScrollSpy.onRelativeChange
 * @type {module:ScrollSpy~onRelativeChangeCallback}
 */
/**
 * 滚动位置改变回调函数
 * @callback onPosChangeCallback
 * @param {event} event - 引起改变的滚动事件
 * @param {element} dock - 滚动对象的 dom 元素
 */
/**
 * 设置滚动位置改变时触发事件的回调函数
 * @attribute module:ScrollSpy.ScrollSpy.onPosChange
 * @type {module:ScrollSpy~onPosChangeCallback}
 */


Object.defineProperty(ScrollSpy,"ScrollSpy",{ get:function(){ return ScrollSpy }, set:function(val){ ScrollSpy = val }})
export default ScrollSpy;