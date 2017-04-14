import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import {component} from './InternalPropTypes';
import ClassNameMixin from './mixins/ClassNameMixin';

const Icon = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    component: component,
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    // amStyle: PropTypes.string,
    // button: PropTypes.bool,
    // size: PropTypes.string,
  },

  getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

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
});

export default Icon;
