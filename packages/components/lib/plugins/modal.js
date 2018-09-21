"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'modal',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.modal = {
      _createContent: function _createContent(_id, Content) {
        return typeof Content === 'function' ? app.context.consumerHoc(function () {
          return _react.default.createElement(Content, {
            modalId: _id,
            modalClose: function modalClose() {
              return app.modal.close(_id);
            },
            modalData: app.context.data(_id) || {},
            modalUpdate: function modalUpdate(state) {
              return app.context.update(_id, state);
            }
          });
        }) : Content;
      },
      show: function show(Content) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onAction = _ref.onAction,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = (0, _objectWithoutProperties2.default)(_ref, ["onAction", "options"]);

        if (!Content) return;

        var _id = app.router.getViewId(options);

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
          return (!onAction || onAction(index, app.context.data(_id) || {}, function () {
            return app.modal.close(_id);
          }, _id) !== false) && app.modal.close(_id);
        };

        props.children = app.modal._createContent(_id, Content);
        return app.router.addView(_react.default.createElement(_Modal.default, null), props, options);
      },
      update: function update(_id, Content) {
        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options,
            props = (0, _objectWithoutProperties2.default)(_ref2, ["options"]);

        if (!_id) return;

        var _ref3 = app.router.getView(_id) || {},
            content = _ref3.content,
            _ref3$prevProps = _ref3.prevProps,
            prevProps = _ref3$prevProps === void 0 ? {} : _ref3$prevProps,
            _ref3$options = _ref3.options,
            prevOptions = _ref3$options === void 0 ? {} : _ref3$options;

        if (!content) return;
        props = (0, _objectSpread2.default)({}, prevProps, props, {
          children: app.modal._createContent(_id, Content)
        });
        options = (0, _objectSpread2.default)({}, prevOptions, options);
        return app.router.addView(content, props, options);
      },
      close: function close(_id) {
        if (!_id) return;

        var _ref4 = app.router.getView(_id) || {},
            content = _ref4.content,
            props = _ref4.props,
            options = _ref4.options;

        if (!content) return;
        props.in = false;

        props.onExited = function () {
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