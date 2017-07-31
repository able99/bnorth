import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';


class Pager extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    mode: PropTypes.oneOf(['single', 'singleNew']),
  }

  static defaultProps = {
    classPrefix: 'pager',
    mode: 'single',
  }

  render() {
    let {
      className,
      children,
      mode,
    } = this.props;

    switch(mode){
      case 'single':
      case 'singleNew':
      default:
        return (
          <div className={cx(this.getClassSet(),this.prefixClass(mode),className)} >
            {children.filter((v)=>{return v.props.active})}
          </div>
        );
    }
  }
}

class PagerItem extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    title: PropTypes.node,
    eventKey: PropTypes.any,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    noPadded: PropTypes.bool,
    navSize: PropTypes.string,
    navStyle: PropTypes.string,
  }

  static defaultProps = {
    classPrefix: 'pager',
  }

  render() {
    let classSet = this.getClassSet(true);
    let {
      className,
      children,
      noPadded,
      ...props
    } = this.props;
    delete props.classPrefix;  
    delete props.eventKey;
    delete props.active;
    delete props.noPadded;
    delete props.navSize;

    classSet[this.prefixClass('panel')] = true;
    classSet[this.prefixClass('panel-no-padded')] = noPadded;

    return (
      <div
        {...props}
        className={cx(classSet, className)}
      >
        {children}
      </div>
    );
  }
}

Pager.Item = ClassNameHoc(PagerItem);

export default ClassNameHoc(Pager);