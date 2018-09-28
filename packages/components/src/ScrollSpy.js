import React from 'react';
import { listen, domFindScrollContainer } from './utils/dom';


export default class ScrollSpy extends React.Component {
  componentDidMount() {
    this.container = domFindScrollContainer(this, this.props.container, this.props.horizontal);

    this.scrollEventListener = listen( this.container, 'scroll', this._handleScrollPositionChange.bind(this), true);
    this.resizeEventListener = listen( window, 'resize', this._handleScrollPositionChange.bind(this), true);

    this._handleScrollPositionChange();
  }

  componentDidUpdate() {
    this._handleScrollPositionChange();
  }

  componentWillUnmount() {
    this.scrollEventListener&&this.scrollEventListener();
    this.resizeEventListener&&this.resizeEventListener();
  }

  _handleScrollPositionChange(...args) {
    const { onScrollPositionChange } = this.props;
    onScrollPositionChange&&onScrollPositionChange(this.container, ...args);
  }

  render() {
    return this.props.children||<span style={{ fontSize: 0 }} />;
  }
}
