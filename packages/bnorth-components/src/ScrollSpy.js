import React from 'react';
import ReactDOM from 'react-dom';
import { listen } from './utils/event';


export default class ScrollSpy extends React.Component {
  componentDidMount() {
    const { onScrollPositionChange, onScrollContainerChange } = this.props;
    if(!onScrollPositionChange&&!onScrollContainerChange) return;

    this.container = this._getContainer();
    onScrollContainerChange&&onScrollContainerChange(this.container);

    this.scrollEventListener = listen( this.container, 'scroll', this._handleScrollPositionChange.bind(this), true);
    this.resizeEventListener = listen( window, 'resize', this._handleScrollPositionChange.bind(this), true);

    this._handleScrollPositionChange();
  }

  componentDidUpdate() {
    const { onScrollPositionChange } = this.props;
    if(!onScrollPositionChange) return;

    this._handleScrollPositionChange();
  }

  componentWillUnmount() {
    const { onScrollPositionChange } = this.props;
    if(!onScrollPositionChange) return;

    this.scrollEventListener&&this.scrollEventListener();
    this.resizeEventListener&&this.resizeEventListener();
  }


  _getContainer() {
    const { horizontal, container } = this.props;
    if (container) return ReactDOM.findDOMNode(container); 
    let node = ReactDOM.findDOMNode(this);

    while (node.parentNode) {
      node = node.parentNode;
      if (node === document.body) return node; 

      const style = window.getComputedStyle(node);
      const overflow = (horizontal?style.getPropertyValue('overflow-x'):style.getPropertyValue('overflow-y'))||style.getPropertyValue('overflow');
      if (overflow === 'auto' || overflow === 'scroll') return node;
    }

    return document.body;
  }

  _handleScrollPositionChange(...args) {
    const { onScrollPositionChange } = this.props;
    onScrollPositionChange&&onScrollPositionChange(this.container, ...args);
  }


  render() {
    return this.props.children||<span style={{ fontSize: 0 }} />;
  }
}
