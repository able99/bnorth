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
      _createContent: function _createContent($id, Content) {
        return typeof Content === 'function' ? app.context.consumerHoc(function () {
          return _react.default.createElement(Content, {
            modalRef: $id,
            modalClose: function modalClose() {
              return app.modal.close($id);
            },
            modalStateData: app.context.stateData($id) || {},
            modalStateUpdate: function modalStateUpdate(state) {
              return app.context.stateUpdate($id, state);
            }
          });
        }) : Content;
      },
      show: function show(Content) {
        var aoptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!Content) return;
        var onAction = aoptions.onAction,
            options = (0, _objectWithoutProperties2.default)(aoptions, ["onAction"]);
        var $id = app.router.getViewId(options);
        options.$id = $id;
        options.in = true;
        options.$isModal = true, options.$onAdd = function ($id) {
          return app.keyboard.on($id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close($id);
          });
        }, options.$onRemove = function ($id) {
          return app.keyboard.off($id, 'keydown', function (e) {
            return e.keyCode === 27 && app.modal.close($id);
          });
        }, options.handleAction = function (index) {
          return (!onAction || onAction(index, app.context.stateData($id) || {}, function () {
            return app.modal.close($id);
          }, $id) !== false) && app.modal.close($id);
        };
        options.children = app.modal._createContent($id, Content);
        return app.router.addView(_react.default.createElement(_Modal.default, {
          ref: function ref(e) {
            debugger;
          }
        }), options);
      },
      update: function update($id, Content, aoptions) {
        if (!$id) return;

        var _ref = app.router.getView($id) || {},
            content = _ref.content,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) return;
        options = (0, _objectSpread2.default)({}, options, aoptions, {
          children: app.modal._createContent($id, Content)
        });
        return app.router.addView(content, options);
      },
      close: function close($id) {
        if (!$id) return;

        var _ref2 = app.router.getView($id) || {},
            content = _ref2.content,
            _ref2$options = _ref2.options,
            options = _ref2$options === void 0 ? {} : _ref2$options;

        if (!content) return;
        options.in = false;

        options.onExited = function () {
          app.router.removeView($id);
          app.context.stateClean($id);
        };

        return app.router.addView(content, options);
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.modal;
  }
};
exports.default = _default;
module.exports = exports["default"];