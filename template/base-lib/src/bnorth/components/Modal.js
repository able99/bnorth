/**
 * @see https://github.com/yuanyan/boronmodal
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ClassNameHoc from './hoc/ClassNameHoc';
import BackdropHoc from './hoc/BackdropHoc';
import TransitionEvents from './utils/TransitionEvents';
import Button from './Button';
import Icon from './Icon';
import Loader from './Loader';
import ComponentConfig from './config.js';

// MUST be equal to $modal-duration in _modal.scss
const TRANSITION_TIMEOUT = 300;

class Modal extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    backdropClassName: PropTypes.string,
    role: PropTypes.oneOf(['alert', 'confirm', 'prompt', 'loading', 'actions', 'popup', 'dialog']),
    title: PropTypes.node,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    closeBtn: PropTypes.bool,
    closeViaBackdrop: PropTypes.bool,
    onAction: PropTypes.func,
    onOpen: PropTypes.func,
    onClosed: PropTypes.func,
    onDismiss: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'modal',
    confirmText: '确定',
    cancelText: '取消',
    closeBtn: false,
    onAction: ()=>{},
    onOpen: ()=>{},
    onClosed: ()=>{},
    onDismiss: ()=>{},
  }

  constructor(props) {
    super(props);
    this.state = {
      closed: true,
      isClosing: false,
    };
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  componentWillReceiveProps(nextProps) {
    let isOpen = this.props.isOpen;

    if (!isOpen && nextProps.isOpen) {
      this.open();
    } else if (isOpen && !nextProps.isOpen) {
      this.close();
    }
  }

  isClosed() {
    return this.state.closed;
  }

  isPopup() {
    return this.props.role === 'popup';
  }

  isActions() {
    return this.props.role === 'actions';
  }

  isCustom() {
    return this.props.role === 'dialog';
  }

  // Get input data for prompt modal
  getFieldData() {
    let data = [];
    let inputs = ReactDOM.findDOMNode(this).querySelectorAll('input[type=text]');

    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        data.push(inputs[i].value);
      }
    }

    return (data.length === 0) ? null : ((data.length === 1) ? data[0] : data);
  }

  // data === null: prompt -> canceled
  // data === true: confirm -> confirmed
  // data === false: confirm -> canceled
  handleAction(data, e) {
    let {
      role,
      onAction,
    } = this.props;
    let willClose = true;

    if (role === 'prompt' && data) {
      data = this.getFieldData();

      willClose = onAction.call(this, data, e);
    } else {
      onAction.call(this, data, e);
    }

    willClose && this.requestClose(e);
  }

  handleBackdropClick(e) {
    if (e.target !== e.currentTarget || this.props.closeViaBackdrop) {
      return;
    }

    this.requestClose(e);
  }

  open() {
    if (this.isClosed()) {
      this.setState({
        isClosing: false,
        closed: false
      });

      this.props.onOpen();
    }
  }

  // Only for instance self calling
  close() {
    if (this.isClosed() || this.state.isClosing) {
      return;
    }

    this.setState({
      isClosing: true
    });
  }

  // for user actions
  requestClose(e) {
    this.props.onDismiss(e);
  }

  handleClosed() {
    this.setState({
      closed: true,
      isClosing: false,
    });
    this.props.onClosed();
  }

  removeUnknownProp(props) {
    delete props.isOpen;
    delete props.onDismiss;
    delete props.onOpen;
    delete props.onClosed;
    delete props.onAction;
    delete props.classPrefix;
    delete props.confirmText;
    delete props.cancelText;
    delete props.closeBtn;
    delete props.closeViaBackdrop;
    delete props.noMask;
    delete props.backdropClassName;

    return props;
  }

  renderActions(classSet) {
    classSet[this.props.classPrefix] = false;

    return (
      <div
        className={cx(this.props.className, classSet)}
        key="modalActions"
        ref="modal"
      >
        {this.props.children}
        <div className={this.prefixClass('actions-group')}>
          <Button
            onClick={this.requestClose.bind(this)}
            block
            amStyle={this.props.btnStyle}
          >
            {this.props.cancelText}
          </Button>
        </div>
      </div>
    );
  }

  renderPopup(classSet) {
    classSet[this.props.classPrefix] = false;

    let {
      className,
      title,
      children,
      ...props
    } = this.props;

    return (
      <div
        {...this.removeUnknownProp(props)}
        className={cx(className, classSet, this.setClassNS('popup'))}
        key="modalPopup"
        ref="modal"
      >
        <div className={cx(this.setClassNS('popup-inner'),"layout-v")}>
          {this.renderHeader()}
          <div className={this.setClassNS('popup-body')}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  renderCustom(classSet) {
    classSet[this.props.classPrefix] = false;

    let {
      className,
      title,
      children,
      ...props
    } = this.props;

    return (
      React.cloneElement(
        children,
        Object.assign({},children.props,{
          ...this.removeUnknownProp(props),
          className: cx(classSet, className, children.props&&children.props.className),
          key: "modalCustom",
          ref: "modal",
        })
      )
    );
  }

  renderHeader() {
    let {
      title,
      closeBtn,
    } = this.props;

    return (title || closeBtn) ? (
      <div className={cx(this.prefixClass('header'),closeBtn?"layout-h-between-center":"layout-h-center-center")} key="modalHeader" >
        <h3
          className={cx(this.prefixClass('title'),closeBtn?"text-left":"text-center")} >
          {title}
        </h3>
        {closeBtn?
        <Icon
          name={ComponentConfig.icons.close}
          className={this.prefixClass('icon')}
          onClick={this.requestClose.bind(this)} />
        :null}
      </div>
    ) : null;
  }

  renderFooter() {
    let buttons;
    let btnClass = this.prefixClass('btn');
    let {
      role,
      confirmText,
      cancelText,
    } = this.props;

    switch (role) {
      case 'alert':
        buttons = (
          <span
            key="modalBtn"
            onClick={this.handleAction.bind(this, null)}
            className={btnClass}
          >
            {confirmText}
          </span>);
        break;
      case 'confirm':
      case 'prompt':
        let cancel = (role === 'prompt') ? null : false;
        buttons = [cancelText, confirmText].map((text, i) => {
          return (
            <Button
              key={'modalBtn' + i}
              onClick={this.handleAction.bind(this, i === 0 ? cancel : true)}
              className={cx(btnClass,i===0?"border-color-light":"")}
              amStyle={i===0?"normal":"primary"}
              hollow={i===0}
              radius
              >
              {text}
            </Button>
          );
        });
        break;
      default:
        buttons = null;
    }

    return buttons ? (
      <div className={this.prefixClass('footer')}>
        {buttons}
      </div>
    ) : null;
  }

  // Using transition appear to fix animation issue on iOS Safari
  // @see https://github.com/amazeui/amazeui-touch/issues/11
  renderTransition(children) {
    return (
      <CSSTransitionGroup
        transitionName={this.prefixClass('transition')}
        transitionAppear={true}
        transitionAppearTimeout={TRANSITION_TIMEOUT}
        transitionEnterTimeout={TRANSITION_TIMEOUT}
        transitionLeaveTimeout={TRANSITION_TIMEOUT}
      >
        {children}
      </CSSTransitionGroup>
    );
  }

  render() {
    let {
      closed,
      isClosing,
    } = this.state;

    if (closed) {
      return null;
    }

    // listen out animation end envent
    if (isClosing) {
      let node = this.refs.modal;

      if (node) {
        let closedHandler = (e) => {
          if (e && e.target !== node) {
            return;
          }

          TransitionEvents.off(node, closedHandler);
          this.handleClosed();
        };

        TransitionEvents.on(node, closedHandler);
      }
    }

    let classSet = this.getClassSet();
    let {
      noMask,
      role,
      className,
      backdropClassName,
      title,
      children,
      modalWidth,
      modalHeight,
      noPadded,
      ...props
    } = this.props;
    let modal;

    classSet[this.prefixClass('out')] = isClosing;
    role && (classSet[this.prefixClass(role)] = true);

    if (this.isActions()) {
      modal = this.renderTransition(this.renderActions(classSet));
    } else if (this.isPopup()) {
      modal = this.renderTransition(this.renderPopup(classSet));
    } else if (this.isCustom()) {
      modal = this.renderCustom(classSet);
    } else {
      let style = {
        width: modalWidth,
        height: modalHeight
      };

      modal = (
        <div
          {...this.removeUnknownProp(props)}
          style={style}
          ref="modalContainer"
          className={cx(classSet, className)}
        >
          <div
            className="modal-inner"
            ref="modal"
          >
            <div
              className={this.prefixClass('dialog')}
            >
              {this.renderHeader()}
              <div
                className={cx(this.prefixClass('body'),{[this.prefixClass('no-padded')]:noPadded})}
                ref="modalBody" >
                {role === 'loading' 
                ?(children ? children : <Loader />)
                :children}
              </div>
              {this.renderFooter()}
            </div>
          </div>
        </div>
      );
    }

    return this.renderBackdrop(modal,noMask,backdropClassName);
  }
}

export default BackdropHoc(ClassNameHoc(Modal));
