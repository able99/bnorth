// @see https://github.com/JedWatson/react-container
// @license MIT Copyright (c) 2015 Jed Watson

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom' //able99
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Fab from './Fab';
import Icon from './Icon';
import ComponentConfig from './config.js';
import createChainedFunction from './utils/createChainedFunction';


function hasChildrenWithVerticalFill(children) {
  let result = false;

  React.Children.forEach(children, (child) => {
    if (result) {
      return; // early-exit
    }

    if (!child) {
      return;
    }

    if (!child.type) {
      return
    }

    result = !!child.type.shouldFillVerticalSpace;
  });

  return result;
}

function initScrollable(defaultPos) {
  if (!defaultPos) {
    defaultPos = {};
  }

  let pos;
  let scrollable = {
    reset() {
      pos = {left: defaultPos.left || 0, top: defaultPos.top || 0};
    },
    getPos() {
      return {left: pos.left, top: pos.top};
    },
    mount(element) {
      let node = findDOMNode(element);//able99
      node.scrollLeft = pos.left;
      node.scrollTop = pos.top;
    },
    unmount(element) {
      let node = findDOMNode(element);//able99
      pos.left = node.scrollLeft;
      pos.top = node.scrollTop;
    }
  };

  scrollable.reset();

  return scrollable;
}

const TRANSITION_TIMEOUT = 500;

class Container extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    component: PropTypes.node,
    align: PropTypes.oneOf(['end', 'center', 'start']),
    direction: PropTypes.oneOf(['column', 'row']),
    fill: PropTypes.bool,
    grow: PropTypes.bool,
    justify: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['end', 'center', 'start'])
    ]),
    scrollable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    transition: PropTypes.string,
  }

  static defaultProps = {
    classPrefix: 'container',
    component: 'div',
  }

  constructor(props) {
    super(props);
    this.state = {
      showTopBtn: false,
    };
  }

  componentDidMount() {
    if (this.props.scrollable && this.props.scrollable.mount) {
      this.props.scrollable.mount(this);
    }
  }

  componentWillUnmount() {
    if (this.props.scrollable && this.props.scrollable.unmount) {
      this.props.scrollable.unmount(this);
    }
  }

  handleScroll(e) {
    let element = e.target;

    if(this.props.distanceTop && element.scrollTop>(element.clientHeight*this.props.distanceTop)){
      if(!this.state.showTopBtn)this.setState({showTopBtn:true});
    }else{
      if(this.state.showTopBtn)this.setState({showTopBtn:false});
    }

    if(this.props.distanceMore && (element.scrollHeight - element.scrollTop === element.clientHeight)){
      this.props.onMore&&this.props.onMore();
    }
  }

  handleToTop(e) {
    let node = findDOMNode(this);
    
    node.scrollTop = 0;
  }
  renderTopBtn() {
    return this.props.topBtn||(
      <Fab 
        onClick={this.handleToTop.bind(this)}
        y="bottom" className="layout-v-center-center border padding-sm" rounded amStyle="translucent">
        <Icon name={ComponentConfig.icons.toTop} className="text-color-primary" style={{fontSize:'32px'}}/>
      </Fab>
    );
  }

  render() {
    let {
      className,
      component: Component,
      children,
      direction,
      fill,
      align,
      justify,
      scrollable,
      transition,
      ...props
    } = this.props;
    let classSet = this.getClassSet();

    delete props.classPrefix;
    delete props.onMore;
    delete props.topBtn;
    delete props.distanceTop;
    delete props.distanceMore;

    // As view transition container
    if (transition) {
      return (
        <CSSTransitionGroup
          component="div"
          className={cx(this.setClassNS('views'), className)}
          transitionName={this.setClassNS(`view-transition-${transition}`)}
          transitionEnterTimeout={TRANSITION_TIMEOUT}
          transitionLeaveTimeout={TRANSITION_TIMEOUT}
          {...props}
        >
          {children}
        </CSSTransitionGroup>
      );
    }

    if (!direction) {
      if (hasChildrenWithVerticalFill(children)) {
        direction = 'column';
      }
    }

    if (direction === 'column' || scrollable) {
      fill = true;
    }

    if (direction === 'column' && align === 'top') {
      align = 'start';
    }

    if (direction === 'column' && align === 'bottom') {
      align = 'end';
    }

    if (direction === 'row' && align === 'left') {
      align = 'start';
    }

    if (direction === 'row' && align === 'right') {
      align = 'end';
    }

    let classes = cx(classSet, className, {
      [this.prefixClass('fill')]: fill,
      [this.prefixClass('column')]: direction === 'column',
      [this.prefixClass('row')]: direction === 'row',
      [this.prefixClass('align-center')]: align === 'center',
      [this.prefixClass('align-start')]: align === 'start',
      [this.prefixClass('align-end')]: align === 'end',
      [this.prefixClass('justify-center')]: justify === 'center',
      [this.prefixClass('justify-start')]: justify === 'start',
      [this.prefixClass('justify-end')]: justify === 'end',
      [this.prefixClass('justified')]: justify === true,
      [this.prefixClass('scrollable')]: scrollable
    });

    return (
      <Component
        className={classes}
        {...props}
        onScroll={createChainedFunction((this.props.distanceTop||this.props.distanceMore)&&this.handleScroll.bind(this),this.props.onScroll)}
      >
        {children}
        {this.state.showTopBtn?this.renderTopBtn():null}
      </Component>
    );
  }
}

Container.initScrollable = initScrollable;

export default ClassNameHoc(Container);
