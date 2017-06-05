import PropTypes from 'prop-types';
import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
} from 'react-dom';

export default (Wrapper) => class BackdropHoc extends Wrapper {
  static propTypes = Object.assign({}, Wrapper.propTypes, {
    container: PropTypes.node
  })

  componentDidMount() {
    this.mounted = true;
    this._renderOverlay();

    return super.componentDidMount && super.componentDidMount();
  }

  componentDidUpdate() {
    this._renderOverlay();

    return super.componentDidUpdate && super.componentDidUpdate();
  }

  componentWillUnmount() {
    this.mounted = false;
    this._unmountOverlay();

    if (this._node) {
      this.getContainerDOMNode().removeChild(this._node);
      this._node = null;
    }

    return super.componentWillUnmount && super.componentWillUnmount();
  }

    // Create Overlay wrapper
  _createPortal() {
    this._node = document.createElement('div');
    this._node.className = '__overlay-portal';
    this.getContainerDOMNode().appendChild(this._node);
  }

  // Render Overlay to wrapper
  _renderOverlay() {
    if (!this._node) {
      this._createPortal();
    }

    let overlay = this.renderOverlay();

    if (overlay !== null) {
      this._overlayInstance = renderSubtreeIntoContainer(
        this,
        overlay,
        this._node
      );
    } else {
      // Unmount if the component is null for transitions to null
      this._unmountOverlay();
    }
  }

  // Remove a mounted Overlay from wrapper
  _unmountOverlay() {
    unmountComponentAtNode(this._node);
    this._overlayInstance = null;
  }

  getOverlayDOMNode() {
    if (!this.mounted) {
      throw new Error(
        `getOverlayDOMNode(): A component must be mounted to
        have a DOM node.`);
    }

    if (this._overlayInstance) {
      // 包含 backdrop 时通过 refer 返回 overlay DOM 节点
      return findDOMNode((this._overlayInstance.refs && this._overlayInstance.refs.overlay) || this._overlayInstance);
    }

    return null;
  }

  getContainerDOMNode() {
    return findDOMNode(this.props.container) || document.body;
  }
}