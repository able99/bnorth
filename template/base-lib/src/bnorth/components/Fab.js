import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from './Button';
import ClassNameHoc from './hoc/ClassNameHoc';

class Fab extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    x: PropTypes.oneOf(['left','center','right']),
    y: PropTypes.oneOf(['top','center','bottom']),
  }

  static defaultProps = {
    classPrefix: 'fab',
    x: 'right',
    y: 'bottom',
  }

  render() {
    let classSet = this.getClassSet();
    let {
      containerClassName,
      children,
      x,
      y,
      ...props,
    } = this.props;
    delete props.classPrefix;

    classSet[this.prefixClass('x-'+x)] = true;
    classSet[this.prefixClass('y-'+y)] = true;

    return (
      <span className={cx(containerClassName,classSet)}>
        <div className={this.prefixClass('inner')}>
          <Button {...props}>{children}</Button>
        </div>
      </span>
    );
  }
}

export default ClassNameHoc(Fab);
