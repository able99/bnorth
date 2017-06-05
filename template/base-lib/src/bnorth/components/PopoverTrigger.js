import React, {cloneElement} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TransitionEvents from './utils/TransitionEvents';
import dom from './utils/domUtils';
import createChainedFunction from './utils/createChainedFunction';
import OverlayHoc from './hoc/OverlayHoc';

class PopoverTrigger extends React.Component {
  static propTypes = {
    defaultPopoverActive: PropTypes.bool,
    popover: PropTypes.node.isRequired,
    onOpen: PropTypes.func,
    onClosed: PropTypes.func,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'dropdown']),
  }

  static defaultProps = {
    onOpen: () => {},
    onClosed: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      popoverActive: props.defaultPopoverActive == null ? false : props.defaultPopoverActive,
      isClosing: false,
      popoverLeft: null,
      popoverTop: null,
      placement: null,
    };
  }

  componentDidMount() {
    this.mounted = true;

    if (this.props.defaultPopoverActive) {
      this.updatePopoverPosition();
    }
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  open() {
    if (this.state.popoverActive) {
      return;
    }

    this.setState({
      popoverActive: true,
      isClosing: false,
    }, function() {
      this.updatePopoverPosition();
      this.props.onOpen();
    });
  }

  close() {
    if (!this.state.popoverActive) {
      return;
    }

    this.setState({
      isClosing: true,
    });
  }

  handleClosed() {
    this.setState({
      popoverActive: false,
      isClosing: false,
    });

    this.props.onClosed();
  }

  toggle() {
    this.state.popoverActive ? this.close() : this.open();
  }

  updatePopoverPosition() {
    if (!this.mounted) {
      return;
    }

    let position = this.calcPopoverPosition() || {};

    this.setState({
      popoverLeft: position.left,
      popoverTop: position.top,
      angleLeft: position.angleLeft,
      angleTop: position.angleTop,
      anglePosition: position.anglePosition,
      placement: position.placement,
    });
  }

  calcPopoverPosition() {
    let targetOffset = this.getTriggerOffset();
    let popoverNode = this.getOverlayDOMNode();

    if (!popoverNode) {
      return;
    }

    let popoverHeight = popoverNode.offsetHeight;
    let popoverWidth = popoverNode.offsetWidth;

    if(this.props.placement === 'dropdown'){
      return {
        top: targetOffset.top + popoverHeight,
        left: 0,
        placement: 'dropdown',
        angleLeft: null,
        angleTop: null,
        anglePosition: null,
      };
    }

    let {
      height: targetHeight,
      width: targetWidth,
    } = targetOffset;
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let anglePosition, angleLeft, angleTop;
    let popoverAngleSize = 8;
    let popoverTop = 0;
    let popoverLeft = 0;
    let diff = 0;
    let popoverPosition = 'top';
    let popoverTotalHeight = popoverHeight + popoverAngleSize;

    // Popover Horizontal position
    // Popover 高度小于 trigger 顶部偏移
    if ((popoverTotalHeight) < targetOffset.top) {
      // On top: trigger 顶部偏移 - Popover 高度
      popoverTop = targetOffset.top - popoverHeight - popoverAngleSize;
    } else if ((popoverTotalHeight) < windowHeight - targetOffset.top - targetHeight) {
      // On bottom: Popover 高度小于 trigger 下方空白位置
      popoverPosition = 'bottom';
      popoverTop = targetOffset.top + targetHeight + popoverAngleSize;
    } else {
      // On middle: Popover 位于 trigger 的水平位置
      popoverPosition = 'horizontal';
      popoverTop = targetHeight / 2 + targetOffset.top - popoverHeight / 2;
      diff = popoverTop;

      if (popoverTop <= 0) {
        popoverTop = 5;
      } else if (popoverTop + popoverHeight >= windowHeight) {
        popoverTop = windowHeight - popoverHeight - 5;
      }

      diff -= popoverTop;
    }

    // Popover Horizontal Position
    if (popoverPosition === 'top' || popoverPosition === 'bottom') {
      popoverLeft = targetWidth / 2 + targetOffset.left - popoverWidth / 2;
      diff = popoverLeft;

      if (popoverLeft < 5) {
        popoverLeft = 5;
      }

      if (popoverLeft + popoverWidth > windowWidth) {
        popoverLeft = windowWidth - popoverWidth - 5;
      }

      diff -= popoverLeft;
      angleLeft = (popoverWidth / 2 - popoverAngleSize + diff);
      angleLeft = Math.max(Math.min(angleLeft,
        popoverWidth - popoverAngleSize * 2 - 6), 6);
      anglePosition = (popoverPosition === 'top') ? 'bottom' : 'top';
    } else if (popoverPosition === 'horizontal') {
      popoverLeft = targetOffset.left - popoverWidth - popoverAngleSize;
      anglePosition = 'right';

      if (popoverLeft < 5 || (popoverLeft + popoverWidth > windowWidth)) {
        if (popoverLeft < 5) {
          popoverLeft = targetOffset.left + targetWidth + popoverAngleSize;
        }

        if (popoverLeft + popoverWidth > windowWidth) {
          popoverLeft = windowWidth - popoverWidth - 5;
        }

        anglePosition = 'left';
      }
      angleTop = (popoverHeight / 2 - popoverAngleSize + diff);
      angleTop = Math.max(Math.min(angleTop, popoverHeight - popoverAngleSize * 2 - 6), 6);
    }

    return {
      top: popoverTop,
      left: popoverLeft,
      placement: popoverPosition,
      angleLeft: angleLeft,
      angleTop: angleTop,
      anglePosition,
    };
  };

  getTriggerOffset() {
    let node = ReactDOM.findDOMNode(this);
    let container = this.getContainerDOMNode();
    let offset = container.tagName === 'BODY' ?
      dom.offset(node) : dom.position(node, container);

    return Object.assign({}, offset, {
      height: node.offsetHeight,
      width: node.offsetWidth
    });
  }

  // used by Mixin
  renderOverlay() {
    if (!this.state.popoverActive) {
      return <span />;
    }

    let popover = this.props.popover;
    let {
      isClosing,
      popoverLeft: positionLeft,
      popoverTop: positionTop,
      anglePosition,
      angleLeft,
      angleTop,
      placement,
    } = this.state;

    if (isClosing) {
      let node = this.getOverlayDOMNode();
      if (node) {
        let closedHandler = (e) => {
          if (e && e.target !== node) {
            return;
          }

          TransitionEvents.off(node, closedHandler);
          this.handleClosed();
        };

        TransitionEvents.on(node, closedHandler);
      }
    }

    return cloneElement(popover, {
      positionLeft,
      positionTop,
      angleLeft,
      angleTop,
      anglePosition,
      placement,
      isClosing,
      onDismiss: this.close.bind(this),
    });
  }

  render() {
    let child = React.Children.only(this.props.children);
    let props = {
      onClick: createChainedFunction(child.props.onClick,
        this.props.onClick),
    };

    props.onClick = createChainedFunction(this.toggle.bind(this), props.onClick);

    return cloneElement(child, props);
  }
}

export default OverlayHoc(PopoverTrigger);
