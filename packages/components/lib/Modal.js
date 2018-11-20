"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Modal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _this = void 0;

var Modal = function Modal(aprops) {
  var _parseProps = (0, _props.default)(aprops, Modal.props),
      role = _parseProps.role,
      handleAction = _parseProps.handleAction,
      _parseProps$in = _parseProps.in,
      isIn = _parseProps$in === void 0 ? true : _parseProps$in,
      onTransitionFinished = _parseProps.onTransitionFinished,
      containerProps = _parseProps.containerProps,
      title = _parseProps.title,
      titleProps = _parseProps.titleProps,
      hasTitleClose = _parseProps.hasTitleClose,
      titleCloseProps = _parseProps.titleCloseProps,
      titleCloseIconProps = _parseProps.titleCloseIconProps,
      headerProps = _parseProps.headerProps,
      bodyProps = _parseProps.bodyProps,
      footerProps = _parseProps.footerProps,
      _parseProps$component = _parseProps.component,
      Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
      style = _parseProps.style,
      className = _parseProps.className,
      children = _parseProps.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["role", "handleAction", "in", "onTransitionFinished", "containerProps", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "headerProps", "bodyProps", "footerProps", "component", "style", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  var classStr = 'position-relative backface-hidden overflow-a-hidden bg-color-white';
  var classSet = {
    'square-full': role === 'popup',
    'border-radius-': role !== 'popup' && role !== 'document'
  };
  var styleSet = (0, _objectSpread2.default)({
    width: role !== 'popup' ? '80%' : undefined
  }, style || {});
  var component = role === 'document' ? children : _react.default.createElement(Component, (0, _extends2.default)({
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: styleSet,
    className: (0, _classes.default)(classStr, classSet, className)
  }, props), _react.default.createElement(Modal._Header, (0, _extends2.default)({
    role: role,
    handleAction: handleAction,
    title: title,
    titleProps: titleProps,
    hasTitleClose: hasTitleClose,
    titleCloseProps: titleCloseProps,
    titleCloseIconProps: titleCloseIconProps
  }, headerProps)), _react.default.createElement(Modal._Body, (0, _extends2.default)({
    role: role,
    handleAction: handleAction
  }, bodyProps), children), _react.default.createElement(Modal._Footer, (0, _extends2.default)({
    role: role,
    handleAction: handleAction
  }, footerProps)));
  return _react.default.createElement(Modal._Container, (0, _extends2.default)({
    role: role,
    handleAction: handleAction,
    in: isIn,
    onTransitionFinished: onTransitionFinished
  }, containerProps), component);
};

exports.Modal = Modal;

Modal._Container = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops),
      role = _parseProps2.role,
      handleAction = _parseProps2.handleAction,
      transition = _parseProps2.transition,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Backdrop.default : _parseProps2$componen,
      className = _parseProps2.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["role", "handleAction", "transition", "component", "className"]);

  var classSet = {
    'flex-display-block': role !== 'document',
    'flex-justify-center': role !== 'document',
    'flex-align-center': role !== 'document'
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    className: (0, _classes.default)(classSet, className)
  }, props));
};

Modal._Header = function (aprops) {
  var _parseProps3 = (0, _props.default)(aprops, Modal._Header.props),
      role = _parseProps3.role,
      handleAction = _parseProps3.handleAction,
      title = _parseProps3.title,
      titleProps = _parseProps3.titleProps,
      hasTitleClose = _parseProps3.hasTitleClose,
      titleCloseProps = _parseProps3.titleCloseProps,
      titleCloseIconProps = _parseProps3.titleCloseIconProps,
      _parseProps3$componen = _parseProps3.component,
      Component = _parseProps3$componen === void 0 ? _Panel.default : _parseProps3$componen,
      className = _parseProps3.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps3, ["role", "handleAction", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "component", "className"]);

  if (!title && !hasTitleClose) return null;
  var classStr = 'width-full padding-a- border-set-bottom- flex-display-block flex-justify-between flex-align-center';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(Modal._Header._Title, (0, _extends2.default)({
    hasTitleClose: hasTitleClose
  }, titleProps), title), !hasTitleClose ? null : _react.default.createElement(Modal._Header._TitleClose, (0, _extends2.default)({
    handleAction: handleAction,
    titleCloseIconProps: titleCloseIconProps
  }, titleCloseProps), hasTitleClose));
};

Modal._Header._Title = function (aprops) {
  var _parseProps4 = (0, _props.default)(aprops, Modal._Header._Title.props),
      hasTitleClose = _parseProps4.hasTitleClose,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      className = _parseProps4.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["hasTitleClose", "component", "className"]);

  var classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  var classSet = {
    'text-align-center': !hasTitleClose
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Modal._Header._TitleClose = function (aprops) {
  var _parseProps5 = (0, _props.default)(aprops, Modal._Header._TitleClose.props),
      handleAction = _parseProps5.handleAction,
      titleCloseIconProps = _parseProps5.titleCloseIconProps,
      _parseProps5$componen = _parseProps5.component,
      Component = _parseProps5$componen === void 0 ? _Button.default : _parseProps5$componen,
      className = _parseProps5.className,
      children = _parseProps5.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps5, ["handleAction", "titleCloseIconProps", "component", "className", "children"]);

  var classStr = 'padding-h-sm padding-v-0';
  return _react.default.createElement(Component, (0, _extends2.default)({
    "b-style": "plain",
    onClick: function onClick() {
      return handleAction && handleAction();
    },
    className: (0, _classes.default)(classStr, className)
  }, props), children === true ? _react.default.createElement(Modal._Header._TitleClose._Icon, titleCloseIconProps) : children);
};

Modal._Header._TitleClose._Icon = function (aprops) {
  var _parseProps6 = (0, _props.default)(aprops, Modal._Header._TitleClose._Icon.props),
      _parseProps6$componen = _parseProps6.component,
      Component = _parseProps6$componen === void 0 ? _Icon.default : _parseProps6$componen,
      props = (0, _objectWithoutProperties2.default)(_parseProps6, ["component"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    name: "close",
    defaultName: "x"
  }, props));
};

Modal._Body = function (aprops) {
  var _parseProps7 = (0, _props.default)(aprops, Modal._Body.props),
      role = _parseProps7.role,
      handleAction = _parseProps7.handleAction,
      _parseProps7$componen = _parseProps7.component,
      Component = _parseProps7$componen === void 0 ? _Panel.default : _parseProps7$componen,
      className = _parseProps7.className,
      children = _parseProps7.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps7, ["role", "handleAction", "component", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  if (!children) return null;
  var classStr = 'padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

Modal._Footer = function (aprops) {
  var _parseProps8 = (0, _props.default)(aprops, Modal._Footer.props),
      role = _parseProps8.role,
      handleAction = _parseProps8.handleAction,
      _parseProps8$buttons = _parseProps8.buttons,
      buttons = _parseProps8$buttons === void 0 ? Modal._Footer._buttons[aprops.role] || [] : _parseProps8$buttons,
      itemProps = _parseProps8.itemProps,
      _parseProps8$itemGetC = _parseProps8.itemGetClassName,
      itemGetClassName = _parseProps8$itemGetC === void 0 ? Modal._Footer._itemGetClassName : _parseProps8$itemGetC,
      _parseProps8$itemGetS = _parseProps8.itemGetStyle,
      itemGetStyle = _parseProps8$itemGetS === void 0 ? Modal._Footer._itemGetStyle : _parseProps8$itemGetS,
      _parseProps8$itemGetP = _parseProps8.itemGetProps,
      itemGetProps = _parseProps8$itemGetP === void 0 ? Modal._Footer._itemGetProps : _parseProps8$itemGetP,
      _parseProps8$componen = _parseProps8.component,
      Component = _parseProps8$componen === void 0 ? _Button.default.Group : _parseProps8$componen,
      className = _parseProps8.className,
      children = _parseProps8.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps8, ["role", "handleAction", "buttons", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

  if (!buttons.length) return null;
  var classStr = 'border-set-top-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    type: "justify",
    containerProps: aprops,
    itemProps: itemProps,
    itemGetClassName: itemGetClassName,
    itemGetStyle: itemGetStyle,
    itemGetProps: itemGetProps,
    className: (0, _classes.default)(classStr, className)
  }, props), buttons.map(function (v, i) {
    return _react.default.createElement(_Button.default.Group.Item, {
      key: i
    }, v);
  }));
};

Modal._Footer._itemGetProps = function (i, length) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      handleAction = _ref.handleAction;

  var subPropsEach = arguments.length > 3 ? arguments[3] : undefined;
  var subProps = arguments.length > 4 ? arguments[4] : undefined;
  return {
    'b-style': 'hollow',
    onClick: function onClick() {
      return handleAction && handleAction(i);
    }
  };
};

Modal._Footer._buttons = {
  alert: ['确定'],
  prompt: ['取消', '确定']
};
var _default = {
  pluginName: 'modal',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.modal = {
      _createContent: function _createContent(_id, Content, state) {
        return typeof Content === 'function' ? app.context.consumerHoc(function () {
          return _react.default.createElement(Content, {
            modalId: _id,
            modalClose: function modalClose() {
              return app.modal.close(_id);
            },
            modalStateData: state && state.data(),
            modalStateDataExt: state && state.extData(),
            modalState: state
          });
        }) : Content;
      },
      show: function show(Content) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onAction = _ref2.onAction,
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options,
            state = _ref2.state,
            props = (0, _objectWithoutProperties2.default)(_ref2, ["onAction", "options", "state"]);

        if (!Content) return;

        var _id = app.router.getViewId(options);

        state = state && app.State.createState(app, state === true ? undefined : state, 'state', _id);
        options._id = _id;
        options.isModal = true;

        options.onAdd = function (_id) {
          return app.keyboard.on(_id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close(_id);
          });
        };

        options.onRemove = function (_id) {
          return app.keyboard.off(_id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close(_id);
          });
        };

        props.in = true;

        props.handleAction = function (index) {
          return (!onAction || onAction(index, state, function () {
            return app.modal.close(_id);
          }, _id) !== false) && app.modal.close(_id);
        };

        props.children = app.modal._createContent(_id, Content, state);
        return app.router.addView(_react.default.createElement(Modal, null), props, options);
      },
      update: function update(_id, Content) {
        var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            state = _ref3.state,
            props = (0, _objectWithoutProperties2.default)(_ref3, ["options", "state"]);

        if (!_id) return;

        var _ref4 = app.router.getView(_id) || {},
            content = _ref4.content,
            _ref4$prevProps = _ref4.prevProps,
            prevProps = _ref4$prevProps === void 0 ? {} : _ref4$prevProps,
            _ref4$options = _ref4.options,
            prevOptions = _ref4$options === void 0 ? {} : _ref4$options;

        if (!content) return;
        props = (0, _objectSpread2.default)({}, prevProps, props, {
          children: app.modal._createContent(_id, Content, state)
        });
        options = (0, _objectSpread2.default)({}, prevOptions, options);
        return app.router.addView(content, props, options);
      },
      close: function close(_id) {
        if (!_id) return;

        var _ref5 = app.router.getView(_id) || {},
            content = _ref5.content,
            props = _ref5.props,
            options = _ref5.options;

        if (!content) return;
        props.in = false;

        props.onTransitionFinished = function () {
          app.router.removeView(_id);
          app.context.clear(_id);
        };

        return app.router.addView(content, props, options);
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.modal;
  }
};
exports.default = _default;