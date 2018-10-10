import React from 'react';
import { listen, domFindScrollContainer } from './utils/dom';


export default class ScrollSpy extends React.Component {
  componentDidMount() {
    this.container = domFindScrollContainer(this, this.props.container, this.props.horizontal);

    this.offScrollListener = listen( this.container, 'scroll', this._handlePosChange.bind(this), true);
    this.offResizeListener = listen( window, 'resize', this._handlePosChange.bind(this), true);

    this._handlePosChange();
  }

  componentWillUnmount() {
    this.offScrollListener&&this.offScrollListener();
    this.offResizeListener&&this.offResizeListener();
  }

  componentDidUpdate() {
    this._handlePosChange();
  }

  _handlePosChange(event) {
    const { onPosChange } = this.props;
    onPosChange&&onPosChange(event, this.container);
  }

  render() {
    return this.props.children||<span style={{ fontSize: 0 }} />;
  }
}
