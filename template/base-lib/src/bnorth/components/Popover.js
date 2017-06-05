import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import BackdropHoc from './hoc/BackdropHoc';

class Popover extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'dropdown']),
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

  render() {console.log(this.props);
    let classSet = this.getClassSet();
    let {
      className,
      children,
      positionLeft,
      positionTop,
      angleLeft,
      angleTop,
      anglePosition,
      isClosing,
      placement,
      ...props
    } = this.props;
    let style = {
      left: positionLeft,
      top: positionTop,
    };
    let angleStyle = {
      left: angleLeft,
      top: angleTop,
    };
    let maskStyle = placement==='dropdown'?{
      left: 0,
      top: positionTop,
    }:null;
    delete props.classPrefix;
    delete props.onDismiss;

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = placement;

    let popover = (
      <div
        {...props}
        style={style}
        ref="overlay"
        className={cx(classSet, className)}
        onClick={(e)=>{e.stopPropagation()}}
      >
        <div className={this.prefixClass('inner')}>
          {children}
        </div>
        {anglePosition?
        <div
          style={angleStyle}
          className={cx(this.prefixClass('angle'),
          anglePosition ? this.prefixClass('angle-' + anglePosition) : null
          )} />
        :null}
      </div>
    );

    return this.renderBackdrop(popover,false,null,maskStyle);
  }
}

export default BackdropHoc(ClassNameHoc(Popover));
