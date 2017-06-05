import React from 'react';
import cx from 'classnames';

export default (Wrapper) => class BackdropHoc extends Wrapper {
  renderBackdrop = (children, noMask, className, maskStyle)=> {
    let onClick = this.handleBackdropClick || null;
    let classSet = {
      [this.setClassNS('modal-backdrop')]: true,
      [this.setClassNS('modal-backdrop-out')]: this.props.isClosing,
    };

    return (
      <div
        onClick={onClick.bind(this)}
        ref={(el) => {this.refs.backdrop = el}}
        className={cx(classSet, className)}
      >
        {noMask?null:<div style={maskStyle} onClick={onClick.bind(this)} className="modal-backdrop-mask"></div>}
        {children}
      </div>
    );
  }
}