"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es6.function.name");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

require("core-js/modules/es6.array.fill");

var _isNan = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-nan"));

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.string.ends-with");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _GridView = _interopRequireDefault(require("./GridView"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var Table =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Table, _React$Component);

  function Table(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Table);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Table).call(this, props));
    _this.state = {
      width: props.width,
      height: props.height
    };
    return _this;
  }

  (0, _createClass2.default)(Table, [{
    key: "_getColumeWidth",
    value: function _getColumeWidth(col, width, cols) {
      if (!col.width) return width / cols.reduce(function (v1, v2) {
        return v1 + (v2.subs ? v2.subs.length : 1);
      }, 0);
      if (typeof col.width === 'function') return col.width(width);
      if (typeof col.width === 'string' && col.width.endsWith('%')) return width ? width * Number(col.width.slice(0, -1)) / 100 : col.width;
      if (!(0, _isNan.default)(col.width)) return col.width;
      return 0;
    }
  }, {
    key: "_getColumeWidthFixed",
    value: function _getColumeWidthFixed(fixedNum) {
      var _this2 = this;

      return Array(fixedNum).fill(0).reduce(function (v1, v2, i) {
        return v1 + _this2.colWidthsHeader[i];
      }, 0);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var cols = this.props.cols;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height;
      var state = {};

      var dom = _reactDom.default.findDOMNode(this);

      if (!width || !height) {
        state.width = dom.clientWidth;
        state.height = dom.clientHeight;
      }

      this.colCells = [];
      this.colWidthsCell = [];
      this.colWidthsHeader = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(cols), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var col = _step.value;
          var sum = 0;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator2.default)(col.subs || [col]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var sub = _step2.value;

              var colWidth = this._getColumeWidth(sub, width, cols);

              this.colWidthsCell.push(colWidth);
              sum += colWidth;
              this.colCells.push(sub);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          this.colWidthsHeader.push(sum);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.columnWidthCell = function (index) {
        return _this3.colWidthsCell[index];
      };

      this.columnWidthHeader = function (index) {
        return _this3.colWidthsHeader[index];
      };

      state.colCells = this.colCells;
      if (!width || !height) this.setState(state);
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      var dom = _reactDom.default.findDOMNode(this);

      var domMain = dom.childNodes[0].firstChild;
      var domHeader = dom.childNodes[3].firstChild;
      var domFixed = dom.childNodes[2].firstChild;
      domHeader.scrollLeft = domMain.scrollLeft;
      domFixed.scrollTop = domMain.scrollTop;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Table),
          cols = _BaseComponent.cols,
          data = _BaseComponent.data,
          fixedNum = _BaseComponent.fixedNum,
          _rowHeight = _BaseComponent.rowHeight,
          headerHeight = _BaseComponent.headerHeight,
          onCellClick = _BaseComponent.onCellClick,
          cellElementType = _BaseComponent.cellElementType,
          cellBorderColor = _BaseComponent.cellBorderColor,
          cellBackground = _BaseComponent.cellBackground,
          cellStyle = _BaseComponent.cellStyle,
          cellClassName = _BaseComponent.cellClassName,
          cellProps = _BaseComponent.cellProps,
          headerElementType = _BaseComponent.headerElementType,
          headerBorderColor = _BaseComponent.headerBorderColor,
          headerBackground = _BaseComponent.headerBackground,
          headerStyle = _BaseComponent.headerStyle,
          headerClassName = _BaseComponent.headerClassName,
          headerProps = _BaseComponent.headerProps,
          containerProps = _BaseComponent.containerProps,
          Item = _BaseComponent.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["cols", "data", "fixedNum", "rowHeight", "headerHeight", "onCellClick", "cellElementType", "cellBorderColor", "cellBackground", "cellStyle", "cellClassName", "cellProps", "headerElementType", "headerBorderColor", "headerBackground", "headerStyle", "headerClassName", "headerProps", "containerProps", "children"]);

      var _this$state2 = this.state,
          width = _this$state2.width,
          height = _this$state2.height;
      var classNamePre = 'position-relative ';
      var classNameStrBg = 'bg-color-white ';
      var classNameStrMask = 'position-absolute offset-top-start offset-left-start pointer-events-none ';
      var classNameStrPiece = classNameStrMask + classNameStrBg;
      var gridProps, gridPropsHeader, gridPropsCell;

      if (width && height) {
        gridProps = {
          data: _objectSpread({}, this.props, {}, this.state),
          width: width,
          height: height,
          rowHeight: function rowHeight(index) {
            return index ? _rowHeight : headerHeight;
          },
          rowCount: data.length + 1
        };
        gridPropsHeader = _objectSpread({}, gridProps, {
          height: headerHeight,
          rowCount: 1,
          columnCount: cols.length,
          columnWidth: this.columnWidthHeader
        });
        gridPropsCell = _objectSpread({}, gridProps, {
          columnCount: this.colCells.length,
          columnWidth: this.columnWidthCell
        });
      }

      var fixedWidth = width && height ? this._getColumeWidthFixed(fixedNum) : 0;
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        classNamePre: classNamePre
      }, containerProps, props), width && height ? _react.default.createElement(_GridView.default, (0, _extends2.default)({
        tag: "cell",
        "bp-container-className": classNameStrBg,
        onScroll: function onScroll() {
          return _this4.handleScroll();
        }
      }, gridPropsCell), Item || Table.Cell) : null, width && height ? _react.default.createElement(_GridView.default, (0, _extends2.default)({
        "bp-container-className": classNameStrMask
      }, gridPropsCell, {
        columnCount: fixedNum
      }), Item || Table.Cell) : null, fixedNum && width && height ? _react.default.createElement(_GridView.default, (0, _extends2.default)({
        tag: "fixed",
        "bp-container-className": classNameStrPiece
      }, gridPropsCell, {
        width: fixedWidth,
        columnCount: cols.slice(0, fixedNum).reduce(function (v1, v2) {
          return v1 + (v2.subs ? v2.subs.length : 1);
        }, 0)
      }), Item || Table.Cell) : null, width && height ? _react.default.createElement(_GridView.default, (0, _extends2.default)({
        tag: "header",
        "bp-container-className": classNameStrPiece
      }, gridPropsHeader), Item || Table.Cell) : null, fixedNum && width && height ? _react.default.createElement(_GridView.default, (0, _extends2.default)({
        tag: "headerFixed",
        "bp-container-className": classNameStrPiece
      }, gridPropsHeader, {
        width: fixedWidth,
        columnCount: fixedNum
      }), Item || Table.Cell) : null);
    }
  }]);
  return Table;
}(_react.default.Component);

exports.default = Table;
Table.defaultProps = {
  fixedNum: 0,
  cols: [],
  data: [],
  rowHeight: 40,
  headerHeight: 40,
  cellElementType: 'div',
  cellBorderColor: '#e2e2e2',
  cellBackground: '#none',
  headerElementType: 'div',
  headerBorderColor: '#e2e2e2',
  headerBackground: '#cbcbcb'
};

Table.Cell = function (_ref) {
  var cellData = _ref.data,
      columnIndex = _ref.columnIndex,
      rowIndex = _ref.rowIndex,
      style = _ref.style;
  if (cellData.tag === 'cell' && !rowIndex || cellData.tag === 'cell' && columnIndex < cellData.fixedNum || cellData.tag === 'fixed' && !rowIndex || cellData.tag === 'header' && columnIndex < cellData.fixedNum) return null;
  if (cellData.getCellData) cellData = _objectSpread({}, cellData, {}, cellData.getCellData(columnIndex, rowIndex, cellData));
  var _cellData = cellData,
      cols = _cellData.cols,
      data = _cellData.data,
      colCells = _cellData.colCells,
      onCellClick = _cellData.onCellClick,
      cellElementType = _cellData.cellElementType,
      cellBorderColor = _cellData.cellBorderColor,
      cellBackground = _cellData.cellBackground,
      cellStyle = _cellData.cellStyle,
      cellClassName = _cellData.cellClassName,
      cellProps = _cellData.cellProps,
      headerElementType = _cellData.headerElementType,
      headerBorderColor = _cellData.headerBorderColor,
      headerBackground = _cellData.headerBackground,
      headerStyle = _cellData.headerStyle,
      headerClassName = _cellData.headerClassName,
      headerProps = _cellData.headerProps;
  var isHeader = rowIndex === 0;
  var col = isHeader ? cols[columnIndex] : colCells[columnIndex];
  var rowData = data[rowIndex - 1];
  var Component = isHeader ? col.headerElementType || headerElementType : col.cellElementType || cellElementType;

  var styles = _objectSpread({}, style, {
    padding: 8,
    borderBottom: '1px solid ' + (isHeader ? col.headerBorderColor || headerBorderColor : col.cellBorderColor || cellBorderColor),
    borderRight: '1px solid ' + (isHeader ? col.headerBorderColor || headerBorderColor : col.cellBorderColor || cellBorderColor),
    background: isHeader ? col.headerBackground || headerBackground : col.cellBackground || cellBackground
  }, isHeader ? headerStyle : cellStyle, {}, isHeader ? col.headerStyle : col.cellStyle);

  var className = isHeader ? (0, _classes.default)('flex-display-block flex-align-center flex-justify-center text-align-center overflow-hidden line-height-1', headerClassName, col.headerClassName) : (0, _classes.default)('display-tablecell text-truncate- ', cellClassName, col.cellClassName);
  var props = isHeader ? headerProps : cellProps;
  var propsCell = isHeader ? col.headerProps : col.cellProps;
  var children = isHeader ? col.name || col.code : rowData[col.code];
  if (isHeader && col.headerChildren) children = col.headerChildren(children, columnIndex, rowIndex, data, cols);
  if (col.cellChildren) children = col.cellChildren(children, columnIndex, rowIndex, data, cols);

  var onClick = onCellClick && function () {
    return onCellClick(columnIndex, rowIndex, data, cols);
  };

  return _react.default.createElement(Component, (0, _extends2.default)({
    style: styles,
    className: className,
    onClick: onClick
  }, props, propsCell), children);
};