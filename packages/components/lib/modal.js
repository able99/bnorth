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

var _BaseComponent9 = _interopRequireDefault(require("./BaseComponent"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Button = _interopRequireDefault(require("./Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _this = void 0;

var Modal = function Modal(aprops) {
  var _BaseComponent = (0, _BaseComponent9.default)(aprops, Modal),
      role = _BaseComponent.role,
      handleAction = _BaseComponent.handleAction,
      _BaseComponent$in = _BaseComponent.in,
      isIn = _BaseComponent$in === void 0 ? true : _BaseComponent$in,
      onTransitionFinished = _BaseComponent.onTransitionFinished,
      containerProps = _BaseComponent.containerProps,
      title = _BaseComponent.title,
      titleProps = _BaseComponent.titleProps,
      hasTitleClose = _BaseComponent.hasTitleClose,
      titleCloseProps = _BaseComponent.titleCloseProps,
      titleCloseIconProps = _BaseComponent.titleCloseIconProps,
      headerProps = _BaseComponent.headerProps,
      bodyProps = _BaseComponent.bodyProps,
      footerProps = _BaseComponent.footerProps,
      _BaseComponent$compon = _BaseComponent.component,
      Component = _BaseComponent$compon === void 0 ? _Panel.default : _BaseComponent$compon,
      style = _BaseComponent.style,
      className = _BaseComponent.className,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["role", "handleAction", "in", "onTransitionFinished", "containerProps", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "headerProps", "bodyProps", "footerProps", "component", "style", "className", "children"]);

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
  var _BaseComponent2 = (0, _BaseComponent9.default)(aprops, Modal._Container),
      role = _BaseComponent2.role,
      handleAction = _BaseComponent2.handleAction,
      transition = _BaseComponent2.transition,
      _BaseComponent2$compo = _BaseComponent2.component,
      Component = _BaseComponent2$compo === void 0 ? _Backdrop.default : _BaseComponent2$compo,
      className = _BaseComponent2.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["role", "handleAction", "transition", "component", "className"]);

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
  var _BaseComponent3 = (0, _BaseComponent9.default)(aprops, Modal._Header),
      role = _BaseComponent3.role,
      handleAction = _BaseComponent3.handleAction,
      title = _BaseComponent3.title,
      titleProps = _BaseComponent3.titleProps,
      hasTitleClose = _BaseComponent3.hasTitleClose,
      titleCloseProps = _BaseComponent3.titleCloseProps,
      titleCloseIconProps = _BaseComponent3.titleCloseIconProps,
      _BaseComponent3$compo = _BaseComponent3.component,
      Component = _BaseComponent3$compo === void 0 ? _Panel.default : _BaseComponent3$compo,
      className = _BaseComponent3.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["role", "handleAction", "title", "titleProps", "hasTitleClose", "titleCloseProps", "titleCloseIconProps", "component", "className"]);

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
  var _BaseComponent4 = (0, _BaseComponent9.default)(aprops, Modal._Header._Title),
      hasTitleClose = _BaseComponent4.hasTitleClose,
      _BaseComponent4$compo = _BaseComponent4.component,
      Component = _BaseComponent4$compo === void 0 ? _Panel.default : _BaseComponent4$compo,
      className = _BaseComponent4.className,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["hasTitleClose", "component", "className"]);

  var classStr = 'flex-sub-flex-grow text-weight-bold text-size-lg';
  var classSet = {
    'text-align-center': !hasTitleClose
  };
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, classSet, className)
  }, props));
};

Modal._Header._TitleClose = function (aprops) {
  var _BaseComponent5 = (0, _BaseComponent9.default)(aprops, Modal._Header._TitleClose),
      handleAction = _BaseComponent5.handleAction,
      titleCloseIconProps = _BaseComponent5.titleCloseIconProps,
      _BaseComponent5$compo = _BaseComponent5.component,
      Component = _BaseComponent5$compo === void 0 ? _Button.default : _BaseComponent5$compo,
      className = _BaseComponent5.className,
      children = _BaseComponent5.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["handleAction", "titleCloseIconProps", "component", "className", "children"]);

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
  var _BaseComponent6 = (0, _BaseComponent9.default)(aprops, Modal._Header._TitleClose._Icon),
      _BaseComponent6$compo = _BaseComponent6.component,
      Component = _BaseComponent6$compo === void 0 ? _Icon.default : _BaseComponent6$compo,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent6, ["component"]);

  return _react.default.createElement(Component, (0, _extends2.default)({
    name: "close",
    defaultName: "x"
  }, props));
};

Modal._Body = function (aprops) {
  var _BaseComponent7 = (0, _BaseComponent9.default)(aprops, Modal._Body),
      role = _BaseComponent7.role,
      handleAction = _BaseComponent7.handleAction,
      _BaseComponent7$compo = _BaseComponent7.component,
      Component = _BaseComponent7$compo === void 0 ? _Panel.default : _BaseComponent7$compo,
      className = _BaseComponent7.className,
      children = _BaseComponent7.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent7, ["role", "handleAction", "component", "className", "children"]);

  children = typeof children === 'function' ? children(_this) : children;
  if (!children) return null;
  var classStr = 'padding-a-';
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className)
  }, props), children);
};

Modal._Footer = function (aprops) {
  var _BaseComponent8 = (0, _BaseComponent9.default)(aprops, Modal._Footer),
      role = _BaseComponent8.role,
      handleAction = _BaseComponent8.handleAction,
      _BaseComponent8$butto = _BaseComponent8.buttons,
      buttons = _BaseComponent8$butto === void 0 ? Modal._Footer._buttons[aprops.role] || [] : _BaseComponent8$butto,
      itemProps = _BaseComponent8.itemProps,
      _BaseComponent8$itemG = _BaseComponent8.itemGetClassName,
      itemGetClassName = _BaseComponent8$itemG === void 0 ? Modal._Footer._itemGetClassName : _BaseComponent8$itemG,
      _BaseComponent8$itemG2 = _BaseComponent8.itemGetStyle,
      itemGetStyle = _BaseComponent8$itemG2 === void 0 ? Modal._Footer._itemGetStyle : _BaseComponent8$itemG2,
      _BaseComponent8$itemG3 = _BaseComponent8.itemGetProps,
      itemGetProps = _BaseComponent8$itemG3 === void 0 ? Modal._Footer._itemGetProps : _BaseComponent8$itemG3,
      _BaseComponent8$compo = _BaseComponent8.component,
      Component = _BaseComponent8$compo === void 0 ? _Button.default.Group : _BaseComponent8$compo,
      className = _BaseComponent8.className,
      children = _BaseComponent8.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent8, ["role", "handleAction", "buttons", "itemProps", "itemGetClassName", "itemGetStyle", "itemGetProps", "component", "className", "children"]);

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
    'bc-bg-none-': true,
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

        var _id = app.router.genPopLayerId(options);

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
        return app.router.addPopLayer(_react.default.createElement(Modal, null), props, options);
      },
      update: function update(_id, Content) {
        var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            state = _ref3.state,
            props = (0, _objectWithoutProperties2.default)(_ref3, ["options", "state"]);

        if (!_id) return;

        var _ref4 = app.router.getPopLayerInfo(_id) || {},
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
        return app.router.addPopLayer(content, props, options);
      },
      close: function close(_id) {
        if (!_id) return;

        var _ref5 = app.router.getPopLayerInfo(_id) || {},
            content = _ref5.content,
            props = _ref5.props,
            options = _ref5.options;

        if (!content) return;
        props.in = false;

        props.onTransitionFinished = function () {
          app.router.removePopLayer(_id);
          app.context.clear(_id);
        };

        return app.router.addPopLayer(content, props, options);
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.modal;
  }
};
exports.default = _default;