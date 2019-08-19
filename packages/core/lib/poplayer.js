"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.array.find-index");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

/**
 * @module
 */
var PopLayer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PopLayer, _React$Component);

  function PopLayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PopLayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopLayer).call(this, props));
    var _this$props = _this.props,
        app = _this$props.app,
        _id = _this$props.id;
    var info = app.router.getPopLayerInfo(_id);
    if (info) info.instance = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    app.State.attachStates(app, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), _id, info.options);
    return _this;
  }

  (0, _createClass2.default)(PopLayer, [{
    key: "getDom",
    value: function getDom() {
      return _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          app = _this$props2.app,
          _id = _this$props2.id;
      var info = app.router.getPopLayerInfo(_id);
      app.State.detachStates(this, info.options);
      var infos = app.router.getPopLayerInfos();
      var index = infos.findIndex(function (v) {
        return v.options._id === _id;
      });
      index >= 0 && infos.splice(index, 1);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props3 = this.props,
          app = _this$props3.app,
          _id = _this$props3.id;
      var info = app.router.getPopLayerInfo(_id);
      if (!info) return false;
      if (!this.props.app.utils.shallowEqual(this.prevProps, info.props)) return true;
      if (app.State.checkStates(this, this.props.context, nextProps.context, info.options)) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          app = _this$props4.app,
          _id = _this$props4.id;
      var info = app.router.getPopLayerInfo(_id);
      if (!info) return null;
      var Component = info.content,
          props = info.props,
          options = info.options;
      if (typeof Component !== 'function') return Component;
      this.prevProps = (0, _objectSpread2.default)({}, props);
      var poplayer = (0, _objectSpread2.default)({
        app: app,
        _id: _id
      }, info, app.State.getStates(this, options));
      return _react.default.createElement(Component, (0, _extends2.default)({
        "data-poplayer": _id,
        poplayer: poplayer
      }, props));
    }
  }]);
  return PopLayer;
}(_react.default.Component);

var _default = PopLayer;
exports.default = _default;