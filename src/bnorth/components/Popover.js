import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import BackdropHoc from './hoc/BackdropHoc';

class Popover extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    placement: PropTypes.oneOf(['auto','top', 'bottom', 'left', 'right', 'down-width', 'down-full', 'left-panel', 'left-height', 'right-panel', 'right-height']),
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    angleLeft: PropTypes.number,
    angleTop: PropTypes.number,
    anglePosition: PropTypes.string,
    onDismiss: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'popover',
  };

  handleBackdropClick(e) {
    let {
      onDismiss,
    } = this.props;

    onDismiss && onDismiss();
  }

  handleBackdropMouseOver(e) {
    let {
      onDismiss,
    } = this.props;

    onDismiss && onDismiss();
  }

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      children,
      isClosing,
      placement,
      popoverStyle,
      popoverClassName,
      popoverAngle,
      innerStyle,
      fullScreen,
      noMask,
      trigger,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.onDismiss;

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = placement;

    let popover = [
      <div
        key="triggerBlock"
        style={{
          position:'absolute',
          top: trigger.top,
          left: trigger.left,
          width: trigger.width,
          height: trigger.height,
        }}
        onClick={(e)=>{e.stopPropagation()}}
        onMouseOver={(e)=>{e.stopPropagation()}} >
      </div>,
      <div
        key="popover"
        {...props}
        style={popoverStyle}
        ref="overlay"
        className={cx(classSet, className, popoverClassName)}
        onClick={(e)=>{e.stopPropagation()}}
        onMouseOver={(e)=>{e.stopPropagation()}}
      >
        <div className={this.prefixClass('inner')} style={innerStyle}>
          {children}
        </div>
      </div>,
      popoverAngle?
      <div
        key="angle"
        style={popoverAngle.style}
        className={cx(this.prefixClass('angle'),this.prefixClass('angle-' + popoverAngle.position))} />
      :null
    ];

    return this.renderBackdrop(popover,noMask,null,null,fullScreen);
  }
}

export default BackdropHoc(ClassNameHoc(Popover));
