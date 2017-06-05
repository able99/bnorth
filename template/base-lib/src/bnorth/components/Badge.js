import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Badge extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    href: PropTypes.string,
    amStyle: PropTypes.string,
    // radius: PropTypes.bool,
    rounded: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'badge',
    component: 'span'
  }

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      href,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.amStyle;
    delete props.rounded;

    Component = href ? 'a' : Component;

    return (
      <Component
        {...props}
        className={cx(classSet, className)}
      >
        {this.props.children}
      </Component>
    );
  }
}

export default ClassNameHoc(Badge);
