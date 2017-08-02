/**
 * React port of Zepto touch.
 *
 * @see https://github.com/joakimbeng/react-swiper
 * @see https://github.com/dogfessional/react-swipeable
 * @see https://github.com/damusnet/react-swipe-views
 * @see http://www.javascriptkit.com/javatutors/touchevents3.shtml
 * @see https://github.com/JedWatson/react-tappable
 * @see https://github.com/madrobby/zepto/blob/master/src/touch.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import createChainedFunction from './utils/createChainedFunction';
import supportTouch from './utils/isTouchSupported';
import './utils/ucUIControl';
import TouchableHoc from './hoc/TouchableHoc';

class Touchable extends React.Component {
  static propTypes = {
    component: PropTypes.any,
  }

  static defaultProps = {
    component: 'span',
  }

  render() {
    const {
      component: Component,
      onTap,
      ...props,
    } = this.props;

    if (supportTouch) {
      Object.assign(props, this.getTouchHandlers());
    } else {
      // handle `tap` as `click` on non-touch devices
      props.onClick = createChainedFunction(props.onClick, onTap);
    }

    delete props.moveThreshold;
    delete props.tapDelay;
    delete props.pressDelay;
    delete props.preventDefault;
    delete props.stopPropagation;
    delete props.onSwipe;
    delete props.onSwipeLeft;
    delete props.onSwipeUp;
    delete props.onSwipeRight;
    delete props.onSwipeDown;
    delete props.onTap;
    delete props.onSingleTap;
    delete props.onDoubleTap;
    delete props.onPress;

    return (
      <Component
        {...props}
      >
        {this.props.children}
      </Component>
    );
  }
}

export default TouchableHoc(Touchable);