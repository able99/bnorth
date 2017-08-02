import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Col extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]).isRequired,
    cols: PropTypes.number,
    offset: PropTypes.number,
    shrink: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'col',
    component: 'div'
  }

  render() {
    let {
      component: Component,
      cols,
      offset,
      shrink,
      className,
      ...props,
    } = this.props;
    let classSet = this.getClassSet();

    delete props.classPrefix;

    if (cols) {
      classSet[this.prefixClass(cols)] = true;
    }

    if (offset) {
      classSet[this.prefixClass('offset-' + offset)] = true;
    }

    classSet[this.prefixClass('shrink')] = shrink;

    return (
      <Component
        {...props}
        className={cx(className, classSet)}
      >
        {this.props.children}
      </Component>
    );
  }
}

export default ClassNameHoc(Col);
