import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Icon extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    // amStyle: PropTypes.string,
    // button: PropTypes.bool,
    // size: PropTypes.string,
  }

  static defaultProps = {
    classPrefix: 'icon',
    component: 'span'
  }

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      name,
      ...props
    } = this.props;

    delete props.classPrefix;

    Component = props.href ? 'a' : Component;

    // icon-[iconName]
    classSet[this.prefixClass(name)] = true;

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

export default ClassNameHoc(Icon);
