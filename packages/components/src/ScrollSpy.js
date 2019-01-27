/**
 * @module
 */
import React from 'react';
import { listen, domOffset, domFindNode, domFindScrollContainer } from './utils/dom';


/**
 * 滚动监控组件
 * @component
 * @exportdefault
 */
class ScrollSpy extends React.Component {
  constructor(props) {
    super(props);
    this.relative = '';
  }

  _getTargetOffset() {
    this.targetOffset = null;
    let { target=true, onRelativeChange } = this.props;
    if(!target||!onRelativeChange) return;

    if(target===true) {
      this.targetOffset = domOffset(this, this.container);
    }else if(target==='parent') {
      let dom = domFindNode(this); if(!dom) return;
      dom = dom.parentNode; if(!dom) return;
      this.targetOffset = domOffset(dom, this.container);
    }

    if(this.targetOffset) this.targetOffset.bottom = this.targetOffset.top+this.targetOffset.height;
  }

  _getScrollOffset() {
    if(!this.container) return {};
    return {top: this.container.scrollTop, bottom: this.container.scrollTop+this.container.offsetHeight}
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
    this.container = domFindScrollContainer(this, this.props.container, this.props.horizontal);
    this._getTargetOffset();

    this.offScrollListener = listen( this.container, 'scroll', this._handlePosChange.bind(this), true);
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
    onPosChange&&onPosChange(event, this.container);
    if(!onRelativeChange||!this.targetOffset) return;

    let targetOffset = this.targetOffset;
    let scrollOffset = this._getScrollOffset();
    
    let relative = this._getRelative(targetOffset, scrollOffset);
    if(relative !== this.relative) {
      onRelativeChange(relative, this.relative, event, this.container);
      this.relative = relative;
    }
  }

  render() {
    let { component:Component, style, ...props} = this.props;
    return <Component style={{ fontSize: 0, ...style}} {...props} />;
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
 * @attribute module:ScrollSpy.ScrollSpy.container
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
 * @param {element} container - 滚动对象的 dom 元素
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
 * @param {element} container - 滚动对象的 dom 元素
 */
/**
 * 设置滚动位置改变时触发事件的回调函数
 * @attribute module:ScrollSpy.ScrollSpy.onPosChange
 * @type {module:ScrollSpy~onPosChangeCallback}
 */
/**
 * 参见 BaseComponent
 */
ScrollSpy.defaultProps.component = 'span';

export default ScrollSpy;