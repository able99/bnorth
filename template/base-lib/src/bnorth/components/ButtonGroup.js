import React, {
  cloneElement,
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';


const ButtonGroup = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    amStyle: PropTypes.string,
    amSize: PropTypes.string,
    hollow: PropTypes.bool,
    justify: PropTypes.bool,
    stacked: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'btn-group',
    };
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      amStyle,
      amSize,
      hollow,
      stacked,
      justify,
      ...props
    } = this.props;

    delete props.classPrefix;

    classSet[this.prefixClass('stacked')] = stacked;
    classSet[this.prefixClass('justify')] = justify;

    return (
      <div
        {...props}
        className={cx(className, classSet)}
      >
        {React.Children.map(this.props.children, (child, i) => {
          return cloneElement(child, Object.assign({
            amStyle,
            amSize,
            hollow,
          }, child.props));
        })}
      </div>
    );
  }
});

export default ButtonGroup;
