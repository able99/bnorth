"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Mask = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _props = _interopRequireDefault(require("./utils/props"));

var _react = _interopRequireDefault(require("react"));

var _Panel = _interopRequireDefault(require("./Panel.Loader"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

/**
 * 提供了蒙层组件和蒙层插件
 * @module
 */

/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */
var Mask = function Mask(aprops) {
  var _parseProps = (0, _props.default)(aprops, Mask.props),
      loaderProps = _parseProps.loaderProps,
      mask = _parseProps.mask,
      Component = _parseProps.component,
      className = _parseProps.className,
      props = (0, _objectWithoutProperties2.default)(_parseProps, ["loaderProps", "mask", "component", "className"]);

  var classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center text-color-white';
  return _react.default.createElement(Component, (0, _extends2.default)({
    mask: mask,
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(_Panel.default.Loader, (0, _extends2.default)({
    position: "top"
  }, loaderProps)));
};

exports.Mask = Mask;
Mask.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:mask.Mask.loaderProps
 * @type {object}
 */

/**
 * 设置 Backdrop 的 mask 属性
 * @type {boolean}
 */

Mask.defaultProps.mask = true;
/**
 * 渲染为该组件
 * @type {component|element}
 */

Mask.defaultProps.component = _Backdrop.default;
/**
 * 提供了对蒙层的显示和控制的能力，同时修改了 app.render.mask 的默认行为
 * @plugin mask
 * @exportdefault
 */

var mask = {
  // plugin 
  // --------------------------------
  _id: 'mask',
  onPluginMount: function onPluginMount(app) {
    /**
     * 挂载在 App 实例上的蒙层操作对象
     * @memberof module:mask.mask
     */
    app.mask = {};
    /**
     * 显示蒙层
     * @memberof module:mask.mask
     * @param {object?} options - 参数
     * @returns {string} 弹出层 id
     */

    app.mask.show = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          props = (0, _objectWithoutProperties2.default)(_ref, ["options"]);

      var _id = app.mask._id || app.router.genPopLayerId(options);

      options._id = _id;
      options.isModal = true;
      return app.mask._id = app.router.addPopLayer(_react.default.createElement(Mask, null), props, options);
    };
    /**
     * 关闭蒙层
     * @memberof module:mask.mask
     */


    app.mask.close = function () {
      var _ref2 = app.router.getPopLayerInfo(app.mask._id) || {},
          content = _ref2.content,
          _ref2$props = _ref2.props,
          props = _ref2$props === void 0 ? {} : _ref2$props,
          _ref2$options = _ref2.options,
          options = _ref2$options === void 0 ? {} : _ref2$options;

      if (!content) {
        app.mask._id = undefined;
        return;
      }

      props.in = false;

      props.onTransitionFinished = function () {
        app.router.removePopLayer(app.mask._id);
        app.mask._id = undefined;
      };

      return app.router.addPopLayer(content, props, options);
    };

    app.mask._oldMask = app.render.mask;

    app.render.mask = function (show, options) {
      return show ? app.mask.show(options) : app.mask.close();
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  }
};
var _default = mask;
exports.default = _default;