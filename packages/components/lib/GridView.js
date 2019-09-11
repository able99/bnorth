"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.string.ends-with");

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

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var GridView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(GridView, _React$Component);

  function GridView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GridView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GridView).call(this, props));
    _this.state = {
      width: props.width,
      height: props.height,
      columnWidth: props.columnWidth,
      rowHeight: props.rowHeight
    };
    return _this;
  }

  (0, _createClass2.default)(GridView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var columnCount = this.props.columnCount;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height,
          columnWidth = _this$state.columnWidth,
          rowHeight = _this$state.rowHeight;
      var state = {};

      var dom = _reactDom.default.findDOMNode(this);

      var awidth = dom.clientWidth;

      if (!width || !height) {
        state.width = dom.clientWidth;
        state.height = dom.clientHeight;
      }

      if (!columnWidth) {
        state.columnWidth = function () {
          return awidth / columnCount;
        };
      } else if (typeof columnWidth === 'number') {
        state.columnWidth = function () {
          return columnWidth;
        };
      } else if (typeof columnWidth === 'string' && columnWidth.endsWith('%')) {
        state.columnWidth = function () {
          return awidth * Number(columnWidth.slice(0, -1) / 100);
        };
      } else if ((0, _isArray.default)(columnWidth)) {
        state.columnWidth = function (index) {
          return (typeof columnWidth[index] === 'string' && columnWidth[index].endsWith('%') ? awidth * Number(columnWidth[index].slice(0, -1) / 100) : columnWidth[index]) || awidth / columnCount;
        };
      }

      if (!rowHeight) {
        dom = dom.firstChild;
        var size = dom.clientHeight;

        state.rowHeight = function () {
          return size;
        };
      }

      if (!height || !rowHeight || !rowHeight || !columnWidth) this.setState(state);
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent = (0, _BaseComponent2.default)(this.props, GridView),
          containerProps = _BaseComponent.containerProps,
          columnCount = _BaseComponent.columnCount,
          rowCount = _BaseComponent.rowCount,
          tag = _BaseComponent.tag,
          data = _BaseComponent.data,
          Item = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["containerProps", "columnCount", "rowCount", "tag", "data", "children"]);

      var _this$state2 = this.state,
          width = _this$state2.width,
          height = _this$state2.height,
          columnWidth = _this$state2.columnWidth,
          rowHeight = _this$state2.rowHeight;
      return _react.default.createElement(_Panel.default, containerProps, !width || !height || !columnWidth || !rowHeight ? _react.default.createElement(Item, {
        data: [],
        columnIndex: 0,
        rowIndex: 0,
        style: {}
      }) : _react.default.createElement(_reactWindow.VariableSizeGrid, (0, _extends2.default)({
        useIsScrolling: true
      }, props, {
        itemData: tag ? _objectSpread({}, data, {
          tag: tag
        }) : data,
        columnCount: columnCount,
        rowCount: rowCount >= 0 ? rowCount : data ? data.length : 0,
        columnWidth: columnWidth,
        rowHeight: rowHeight,
        width: width,
        height: height
      }), Item));
    }
  }]);
  return GridView;
}(_react.default.Component);

exports.default = GridView;
GridView.defaultProps = {
  columnCount: 1
};