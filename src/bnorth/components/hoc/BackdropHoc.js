import React from 'react';
import cx from 'classnames';

export default (Wrapper) => class BackdropHoc extends Wrapper {
  renderBackdrop = (children, noMask, className, maskStyle, full)=> {
    let onClick = (this.handleBackdropClick&&this.handleBackdropClick.bind(this)) || null;
    let onMouseOver = (this.handleBackdropMouseOver&&this.handleBackdropMouseOver.bind(this)) || null;
    let classSet = {
      [this.setClassNS('modal-backdrop')]: true,
      [this.setClassNS('modal-backdrop-out')]: this.props.isClosing,
    };

    return (
      <div
        onClick={onClick}
        onMouseOver={onMouseOver}
        ref={(el) => {this.refs.backdrop = el}}
        className={cx(classSet, className)}
        style={full?{maxWidth:'none'}:null}
      >
        {noMask?null:<div style={maskStyle} onClick={onClick} onMouseOver={onMouseOver} className="modal-backdrop-mask"></div>}
        {children}
      </div>
    );
  }
}