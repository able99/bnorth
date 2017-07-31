/**
 * @see https://github.com/react-bootstrap/react-bootstrap/blob/master/src/Carousel.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import TransitionEvents from './utils/TransitionEvents';
import Icon from './Icon';
import Touchable from './Touchable';
import ClassNameHoc from './hoc/ClassNameHoc';
import ComponentConfig from './config.js';

class Carousel extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,

    controls: PropTypes.bool,   // prev/next icon
    pager: PropTypes.bool,      // indicators or thumbs

    slide: PropTypes.bool,      // what is this?
    interval: PropTypes.number, // interval
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,       // loop slide

    pauseOnHover: PropTypes.bool,
    // touch: PropTypes.bool,

    onAction: PropTypes.func,
    onSlideEnd: PropTypes.func,
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    direction: PropTypes.oneOf(['prev', 'next']),
    prevIcon: PropTypes.node,
    nextIcon: PropTypes.node,
  }

  static defaultProps = {
    classPrefix: 'carousel',
    controls: true,
    pager: true,
    slide: true,
    interval: 5000,
    autoPlay: true,
    loop: true,
    pauseOnHover: true,
    prevIcon: null,
    nextIcon: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.defaultActiveIndex == null ?
        0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null &&
      nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction :
          this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  }

  componentDidMount() {
    this.props.autoPlay && this.waitForNext();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  }

  next(e) {
    e && e.preventDefault();

    let index = this.getActiveIndex() + 1;
    let count = React.Children.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.loop) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  }

  prev(e) {
    e && e.preventDefault();

    let index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.loop) {
        return;
      }
      index = React.Children.count(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  }

  pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  }

  play() {
    this.isPaused = false;
    this.waitForNext();
  }

  waitForNext() {
    if (this.props.autoPlay&& !this.isPaused && this.props.slide && this.props.interval &&
      this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next.bind(this), this.props.interval);
    }
  }

  handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  }

  handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  }

  handleSwipeLeft(e) {
    // console.log('swipe left');
    this.next();
  }

  handleSwipeRight(e) {
    // console.log('swipe right....');
    this.prev();
  }

  handleTap(e) {
    let index = this.state.activeIndex;
    if (this.props.onTap) {
      this.props.onTap(index);
    }else if(this.props.children&&this.props.children[index]&&this.props.children[index].props.onTap){
      this.props.children[index].props.onTap(index);
    }
  } 

  getActiveIndex() {
    return this.props.activeIndex != null ?
      this.props.activeIndex : this.state.activeIndex;
  }

  handleItemAnimateOutEnd() {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function() {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  }

  handleSelect(index, direction, e) {
    e && e.preventDefault();
    clearTimeout(this.timeout);

    let previousActiveIndex = this.getActiveIndex();

    direction = direction || this.getDirection(previousActiveIndex, index);

    if (this.props.onAction) {
      this.props.onAction(index, direction);
    }else if(this.props.children&&this.props.children[index]&&this.props.children[index].props.onAction){
      this.props.children[index].props.onAction(index, direction);
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queuing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  }

  renderControls() {
    return this.props.controls ? (
      <div className={this.prefixClass('control')}>
        <Touchable
          className={cx(this.prefixClass('control-prev'),{'bg-color-overlay':this.props.controlsBg})}
          onTap={this.prev.bind(this)}
          stopPropagation
        >
          {this.props.prevIcon||<Icon name={ComponentConfig.icons.leftNav} />}
        </Touchable>
        <Touchable
          className={cx(this.prefixClass('control-next'),{'bg-color-overlay':this.props.controlsBg})}
          onTap={this.next.bind(this)}
          stopPropagation
        >
          {this.props.nextIcon||<Icon name={ComponentConfig.icons.rightNav} />}
        </Touchable>
      </div>
    ) : null;
  }

  renderPager() {
    if (this.props.pager) {
      let isThumbnailNav = false;

      let children = React.Children.map(this.props.children, (child, i) => {
        let className = (i === this.getActiveIndex()) ?
          this.setClassNS('active') : null;
        let thumb = child.props.thumbnail;

        if (!isThumbnailNav) {
          isThumbnailNav = !!thumb;
        }

        return (
          <Touchable
            component="li"
            className={className}
            key={i}
            onTap={this.handleSelect.bind(this, i, null)}
          >
            {thumb ? <img src={thumb} alt="" /> : null}
          </Touchable>
        );
      });
      let pagerClassName = this.prefixClass(isThumbnailNav ? 'thumbs' :
        'indicators');

      return (
        <ol
          className={cx(this.prefixClass('pager'), pagerClassName, {'bg-color-overlay':this.props.pagerBg}, {'padding-sm':this.props.pagerBg},{'border-radius-rounded':this.props.pagerBg})}
        >
          {children}
        </ol>
      );
    }

    return null;
  }

  renderItem(child, index) {
    let activeIndex = this.getActiveIndex();
    let isActive = (index === activeIndex);
    let isPreviousActive = this.state.previousActiveIndex != null &&
      this.state.previousActiveIndex === index && this.props.slide;
    let props = {
      active: isActive,
      ref: child.ref,
      key: child.key ? child.key : index,
      index: index,
      animateOut: isPreviousActive,
      animateIn: isActive && this.state.previousActiveIndex != null &&
      this.props.slide,
      direction: this.state.direction,
      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd.bind(this) : null
    };

    return React.cloneElement(child, props);
  }

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      children,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.onAction;
    delete props.pager;
    delete props.controls;
    delete props.slide;
    delete props.interval;
    delete props.pauseOnHover;
    delete props.prevIcon;
    delete props.nextIcon;
    delete props.controlsBg;
    delete props.pagerBg;

    // TODO: 优化 swipe，左右方向阻止默认事件，垂直方向不阻止
    return (
      <Touchable
        {...props}
        component="div"
        className={cx(classSet, className)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onSwipeLeft={this.handleSwipeLeft.bind(this)}
        onSwipeRight={this.handleSwipeRight.bind(this)}
        onTap={this.handleTap.bind(this)}
        preventDefault={false}
        stopPropagation={true}
      >
        <ul className={this.prefixClass('slides')}>
          {React.Children.map(children, this.renderItem.bind(this))}
        </ul>
        {(Array.isArray(children)?children.length:children)?this.renderControls():null}
        {(Array.isArray(children)?children.length:children)?this.renderPager():null}
      </Touchable>
    );
  }
}

class CarouselItem extends React.Component {
  static propTypes = {
    direction: PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: PropTypes.func,
    active: PropTypes.bool,
    animateIn: PropTypes.bool,
    animateOut: PropTypes.bool,
    caption: PropTypes.node,
    index: PropTypes.number,
    thumbnail: PropTypes.string,
  }

  static defaultProps = {
    animation: true
  }

  constructor(props) {
    super(props);
    this.state = {
      direction: null
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      TransitionEvents.on(ReactDOM.findDOMNode(this), this.handleAnimateOutEnd.bind(this));
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation.bind(this), 20);
    }
  }

  handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.mounted) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  }

  startAnimation() {
    if (!this.mounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ?
        'right' : 'left'
    });
  }

  render() {
    let {
      className,
      active,
      animateIn,
      animateOut,
      direction,
    } = this.props;
    let classSet = {
      active: (active && !animateIn) || animateOut,
      next: active && animateIn && direction === 'next',
      prev: active && animateIn && direction === 'prev'
    };

    if (this.state.direction && (animateIn || animateOut)) {
      classSet[this.state.direction] = true;
    }

    return (
      <li
        className={cx(className, classSet)}
      >
        {this.props.children}
      </li>
    );
  }
}

Carousel.Item = CarouselItem;

export default ClassNameHoc(Carousel);
