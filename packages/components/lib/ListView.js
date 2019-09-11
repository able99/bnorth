"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactWindow = require("react-window");

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */
var ListView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ListView, _React$Component);

  function ListView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ListView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListView).call(this, props));
    _this.state = {
      height: props.height,
      itemSize: props.itemSize
    };
    return _this;
  }

  (0, _createClass2.default)(ListView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state = this.state,
          height = _this$state.height,
          itemSize = _this$state.itemSize;
      var state = {};

      var dom = _reactDom.default.findDOMNode(this);

      if (!height) {
        state.height = dom.clientHeight;
      }

      if (!itemSize) {
        dom = dom.firstChild;
        var size = dom.clientHeight;

        state.itemSize = function () {
          return size;
        };
      }

      if (!height || !itemSize) this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent = (0, _BaseComponent2.default)(this.props, ListView),
          containerProps = _BaseComponent.containerProps,
          itemCount = _BaseComponent.itemCount,
          data = _BaseComponent.data,
          Item = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["containerProps", "itemCount", "data", "children"]);

      var _this$state2 = this.state,
          height = _this$state2.height,
          itemSize = _this$state2.itemSize;
      return _react.default.createElement(_Panel.default, containerProps, !height || !itemSize ? _react.default.createElement(Item, {
        data: [],
        index: 0,
        style: {}
      }) : _react.default.createElement(_reactWindow.VariableSizeList, (0, _extends2.default)({
        useIsScrolling: true,
        itemData: data,
        itemCount: itemCount >= 0 ? itemCount : data ? data.length : 0
      }, props, {
        height: height,
        itemSize: itemSize
      }), Item));
    }
  }]);
  return ListView;
}(_react.default.Component);

exports.default = ListView;