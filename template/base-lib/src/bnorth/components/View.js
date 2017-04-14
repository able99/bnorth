import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const View = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
  },

  getDefaultProps() {
    return {
      classPrefix: 'view',
      component: 'div',
    };
  },

  render() {
    const {
      component,
      className,
      child,
      focus,
      ...props,
    } = this.props;

    delete props.classPrefix;

    return React.createElement(component, {
      ...props,
      className: cx(className, this.getClassSet(), {[this.prefixClass("child")]:child}, {[this.prefixClass("blur")]:!focus}),
    });
  },
});

export default View;
