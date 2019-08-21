"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

/**
 * @module
 */
var PopLayer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PopLayer, _React$Component);
  (0, _createClass2.default)(PopLayer, [{
    key: "getDom",
    // poplayer interface
    // ---------------------------------------
    value: function getDom() {
      return _reactDom.default.findDOMNode(this);
    } // poplayer interface
    // ---------------------------------------

  }], [{
    key: "getPopLayer",
    // poplayer interface
    // ---------------------------------------
    value: function getPopLayer(_id) {
      return PopLayer.poplayers[_id];
    } // poplayer interface
    // ---------------------------------------

  }, {
    key: "addPopLayer",

    /**
     * 添加弹出层
     * @param {number|string|component|element} - 内容 
     * @param {object} props - 组件属性
     * @param {module:router~PopLayerOptions} options - 弹出层配置
     * @returns {string} 弹出层 id 
     */
    value: function addPopLayer(content) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options._id = options._id || "".concat(++PopLayer._IdRandom, "@").concat(options._idPage ? options._idPage : '#');
      var popLayer = PopLayer.getPopLayerInfo(options._id);

      if (!popLayer) {
        if (!content) return;
        PopLayer.app.router.setPopLayerInfos((0, _toConsumableArray2.default)(PopLayer.app.router.getPopLayerInfos()).concat([{
          content: content,
          props: props,
          options: options
        }]));
      } else {
        content && (popLayer.content = content);
        popLayer.props = (0, _objectSpread2.default)({}, popLayer.props, props);
        popLayer.options = (0, _objectSpread2.default)({}, popLayer.options, options);
        PopLayer.app.router.refresh();
      }

      return options._id;
    }
    /**
     * 移除弹出层
     * @param {!string} - 弹出层 id
     */

  }, {
    key: "removePopLayer",
    value: function removePopLayer(_id) {
      var infos = PopLayer.app.router.getPopLayerInfos();
      var index = infos.findIndex(function (v) {
        return v.options._id === _id;
      });

      if (index >= 0) {
        infos.splice(index, 1);
        PopLayer.app.router.getPopLayerInfos(infos);
      }
    }
    /**
     * 获取弹出层信息
     * @param {string} - 弹出层 id
     * @returns {module:router~PopLayerInfo}
     */

  }, {
    key: "getPopLayerInfo",
    value: function getPopLayerInfo(_id) {
      return PopLayer.app.router.getPopLayerInfos().find(function (v) {
        return v.options._id === _id;
      });
    }
  }]);

  function PopLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PopLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopLayer).call(this, props));
    var options = _this.props.options;
    PopLayer.poplayers[options._id] = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    PopLayer.app.State.attachStates(PopLayer.app, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), options._id, options);
    return _this;
  }

  (0, _createClass2.default)(PopLayer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var options = this.props.options;
      PopLayer.app.State.detachStates(this, options);
      delete PopLayer.poplayers[options._id];
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props = this.props,
          props = _this$props.props,
          options = _this$props.options;
      if (!PopLayer.app.utils.shallowEqual(nextProps.props, props)) return true;
      if (!PopLayer.app.utils.shallowEqual(nextProps.options, options)) return true;
      if (PopLayer.app.State.checkStates(this, nextProps.context, this.props.context, options)) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          Component = _this$props2.content,
          props = _this$props2.props,
          options = _this$props2.options;
      if (typeof Component !== 'function') return Component;

      var component = _react.default.createElement(Component, (0, _extends2.default)({
        "data-poplayer": options._id,
        app: PopLayer.app,
        _id: options._id,
        poplayer: this,
        info: this.props
      }, PopLayer.app.State.getStates(this, options), props));

      if (options._idPage) {
        var page = PopLayer.app.Page.getPage(options._idPage);
        var dom = page && page.dom;
        if (dom) return _reactDom.default.createPortal(component, dom);
      }

      return component;
    }
  }]);
  return PopLayer;
}(_react.default.Component);

(0, _defineProperty2.default)(PopLayer, "app", void 0);
(0, _defineProperty2.default)(PopLayer, "poplayers", {});
(0, _defineProperty2.default)(PopLayer, "_IdRandom", 0);
var _default = PopLayer;
exports.default = _default;