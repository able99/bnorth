import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';


class View extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
  }

  static defaultProps = {
    classPrefix: 'view',
    component: 'div',
  }

  render() {
    const {
      component,
      className,
      isBlur,
      children,
      ...props,
    } = this.props;
    delete props.classPrefix;

    return React.createElement(component, {
      ...props,
      className: cx(className, this.getClassSet(), {[this.prefixClass("blur")]:isBlur}),
    },children);
  }
}

export default ClassNameHoc(View);
