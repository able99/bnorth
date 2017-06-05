import React from 'react';
import PropTypes from 'prop-types';
import { unmountComponentAtNode, unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';
import bodyElement from './utils/bodyElement';
import Icon from './Icon';
import ClassNameHoc from './hoc/ClassNameHoc';

// @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html
// To improve reliability, CSSTransitionGroup will no longer listen to
// transition events. Instead, you should specify transition durations
// manually using props such as `transitionEnterTimeout={500}`.
// NOTE: It should less than CSS animation duration, if not, the animation
// be not smooth. It maybe a bug of React.
const TRANSITION_TIMEOUT = 250;

class Notification extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    title: PropTypes.string,
    amStyle: PropTypes.string,
    closeBtn: PropTypes.bool,
    animated: PropTypes.bool,
    visible: PropTypes.bool,
    onDismiss: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'notification',
    closeBtn: true,
    onDismiss: () => {},
  }

  renderCloseBtn() {
    return this.props.closeBtn ? (
      <Icon
        className={this.prefixClass('icon')}
        name="close"
        onClick={this.props.onDismiss.bind(this)} />
    ) : null;
  }

  render() {
    let classSet = this.getClassSet();
    let {
      title,
      className,
      animated,
      visible,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.amStyle;
    delete props.static;
    delete props.closeBtn;
    delete props.onDismiss;

    classSet[this.prefixClass('animated')] = animated;

    let notificationBar = visible ? (
      <div
        {...props}
        className={cx(classSet, className)}
        key="notification"
      >
        <div className={this.prefixClass('content')}>
          {title ? (
            <h3 className={this.prefixClass('title')}>
              {title}
            </h3>
          ) : null}
          {this.props.children}
        </div>
        {this.renderCloseBtn()}
      </div>
    ) : null;

    return animated ? (
      <CSSTransitionGroup
        component="div"
        transitionName="notification"
        transitionEnterTimeout={TRANSITION_TIMEOUT}
        transitionLeaveTimeout={TRANSITION_TIMEOUT}
      >
        {notificationBar}
      </CSSTransitionGroup>
    ) : notificationBar;
  }
}

Notification = ClassNameHoc(Notification);

class NotificationPortal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    visible: false,
  }

  componentDidMount() {
    if (!this.isStatic()) {
      this.node = document.createElement('div');
      this.node.className = '__notification-portal';
      bodyElement.appendChild(this.node);
      this.renderNotification(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isStatic()) {
      this.renderNotification(nextProps);
    }
  }

  componentWillUnmount() {
    if (!this.isStatic()) {
      unmountComponentAtNode(this.node);
      bodyElement.removeChild(this.node);
    }
  }

  isStatic() {
    return this.props.static;
  }

  renderNotification(props) {
    this.portal = renderSubtreeIntoContainer(
      this,
      <Notification {...props} />,
      this.node
    );
  }

  render() {
    return this.isStatic() ? <Notification {...this.props} /> : null;
  }
}

export default NotificationPortal;
