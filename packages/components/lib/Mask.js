"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mask = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _Loader = require("./Loader");

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
var _Mask = function Mask(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Mask),
      loaderProps = _BaseComponent.loaderProps,
      classNamePre = _BaseComponent.classNamePre,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["loaderProps", "classNamePre", "children"]);

  classNamePre = (0, _objectSpread2.default)({
    'flex-display-block flex-direction-v flex-justify-center flex-align-center': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Backdrop.default,
    classNamePre: classNamePre
  }, props), _react.default.createElement(_Loader.PanelLoader, (0, _extends2.default)({
    position: "top"
  }, loaderProps), children));
};

_Mask.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:mask.Mask.loaderProps
 * @type {object}
 */

Object.defineProperty(_Mask, "Mask", {
  get: function get() {
    return _Mask;
  },
  set: function set(val) {
    _Mask = val;
  }
});
_Mask.isBnorth = true;
_Mask.defaultProps['b-precast'] = {
  'b-theme': 'white'
};
var _default = _Mask;
/**
 * 提供了对蒙层的显示和控制的能力，同时修改了 app.render.mask 的默认行为
 * @plugin mask
 * @exportdefault
 */

exports.default = _default;
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

    app.mask.show = function (Content) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options,
          props = (0, _objectWithoutProperties2.default)(_ref, ["options"]);

      options._id = app.mask._id || app.router.genPopLayerId(options);
      if (!options.hasOwnProperty('isModal')) options.isModal = true;
      return app.mask._id = app.router.addPopLayer(typeof Content === 'function' ? function (props) {
        return _react.default.createElement(_Mask, props.props, _react.default.createElement(Content, props));
      } : _react.default.createElement(_Mask, null, Content), props, options);
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

      props.rewind = true;

      props.onFinished = function () {
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
exports.mask = mask;