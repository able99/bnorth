import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Loader extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    component: PropTypes.node,
    amStyle: PropTypes.string,
    rounded: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'loader',
    component: 'div',
  }

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      component: Component,
      ...props,
    } = this.props;

    delete props.classPrefix;
    delete props.amStyle;
    delete props.rounded;

    return (
      <Component
        {...props}
        className={cx(classSet, className)}
      >
        <div className={this.prefixClass('bounce1')} />
        <div className={this.prefixClass('bounce2')} />
        <div className={this.prefixClass('bounce3')} />
      </Component>
    )
  }
}

export default ClassNameHoc(Loader);
