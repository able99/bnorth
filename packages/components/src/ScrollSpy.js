import React from 'react';
import { listen, domOffset, domFindNode, domFindScrollContainer } from './utils/dom';


export default class ScrollSpy extends React.Component {
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
    return this.props.children||<span style={{ fontSize: 0 }} />;
  }
}
