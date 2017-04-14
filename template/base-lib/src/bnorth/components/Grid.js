import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Grid = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    collapse: PropTypes.bool,
    avg: PropTypes.number,
    align: PropTypes.oneOf(['right', 'center', 'between', 'around']),
    wrap: PropTypes.oneOf(['wrap', 'wrap-reverse']),
    bordered: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'g',
      component: 'div',
    };
  },

  render: function() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      collapse,
      bordered,
      avg,
      align,
      wrap,
      ...props
    } = this.props;

    delete props.classPrefix;

    // .g-collapse
    classSet[this.prefixClass('collapse')] = collapse;

    // .g-bordered
    classSet[this.prefixClass('bordered')] = bordered;

    // .g-wrap
    classSet[this.prefixClass(wrap)] = wrap;

    if (avg) {
      classSet[this.prefixClass('avg-' + avg)] = true;
    }

    if (align) {
      classSet[this.prefixClass(align)] = true;
    }

    return (
      <Component
        {...props}
        className={cx(className, classSet)}
      >
        {this.props.children}
      </Component>
    );
  }
});

export default Grid;
