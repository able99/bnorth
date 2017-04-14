/**
 * @see https://github.com/negomi/react-burger-menu
 */

import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import BackdropMixin from './mixins/BackdropMixin';

const OffCanvas = React.createClass({
  mixins: [ClassNameMixin, BackdropMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    placement: PropTypes.oneOf(['left', 'right']),
    onDismiss: PropTypes.func,
  },

  getDefaultProps() {
    return {
      classPrefix: 'offcanvas',
      placement: 'left',
    };
  },

  handleBackdropClick(e) {
    if (e && e.target === this.refs.backdrop) {
      let {
        onDismiss,
      } = this.props;

      onDismiss && onDismiss();
    }
  },

  render() {
    let classSet = this.getClassSet();
    let {
      placement,
      animation,
      className,
      children,
      isClosing,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.onDismiss;

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = !!placement;
    classSet[this.prefixClass(animation)] = !!animation;

    const offCanvas = (
      <div
        {...props}
        className={cx(classSet, className)}
        ref="overlay"
      >
        {children}
      </div>
    );

    return this.renderBackdrop(offCanvas);
  }
});

export default OffCanvas;
