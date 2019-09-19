"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = exports.Picker = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.string.pad-start");

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es6.math.sign");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _NavBar = _interopRequireDefault(require("./NavBar"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var Picker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Picker, _React$Component);

  function Picker(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Picker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Picker).call(this, props, context));
    var indexs = props.modal.indexs,
        data = props.data;
    _this.state = {
      indexs: indexs || (0, _from.default)({
        length: data.length
      }, function () {
        return 0;
      })
    };
    return _this;
  }

  (0, _createClass2.default)(Picker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _BaseComponent = (0, _BaseComponent2.default)(this.props, Picker),
          _BaseComponent$data = _BaseComponent.data,
          adata = _BaseComponent$data === void 0 ? [] : _BaseComponent$data,
          _indexs = _BaseComponent.indexs,
          _BaseComponent$itemSh = _BaseComponent.itemShowCount,
          itemShowCount = _BaseComponent$itemSh === void 0 ? 5 : _BaseComponent$itemSh,
          _BaseComponent$itemHe = _BaseComponent.itemHeight,
          itemHeight = _BaseComponent$itemHe === void 0 ? 40 : _BaseComponent$itemHe,
          linked = _BaseComponent.linked,
          confirm = _BaseComponent.confirm,
          title = _BaseComponent.title,
          _onChange = _BaseComponent.onChange,
          onCancel = _BaseComponent.onCancel,
          onConfirm = _BaseComponent.onConfirm,
          _BaseComponent$modal = _BaseComponent.modal,
          app = _BaseComponent$modal.app,
          _id = _BaseComponent$modal._id,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["data", "indexs", "itemShowCount", "itemHeight", "linked", "confirm", "title", "onChange", "onCancel", "onConfirm", "modal"]);

      var indexs = this.state.indexs;
      var data = (0, _toConsumableArray2.default)(adata);
      data.forEach(function (v, i, a) {
        return typeof v === 'function' && (a[i] = v(indexs, a));
      });
      return _react.default.createElement(_Panel.default, props, confirm ? _react.default.createElement(_NavBar.default, {
        "bc-border-set-bottom-": true
      }, _react.default.createElement(_NavBar.default.Item, {
        onClick: function onClick() {
          onCancel && onCancel();
          app.modal.close(_id);
        }
      }, "\u53D6\u6D88"), _react.default.createElement(_NavBar.default.Title, {
        "bc-text-size-lg": true
      }, title || ' '), _react.default.createElement(_NavBar.default.Item, {
        onClick: function onClick() {
          onConfirm && onConfirm(indexs, data);
          app.modal.close(_id);
        }
      }, "\u786E\u5B9A")) : null, _react.default.createElement(_Panel.default, {
        className: "flex-display-block flex-align-stretch position-relative user-select-none"
      }, data.map(function (v, i) {
        return _react.default.createElement(Picker.Col, {
          onChange: function onChange(index) {
            indexs[i] = index;
            indexs = (0, _toConsumableArray2.default)(indexs);
            if (linked) data.forEach(function (vv, ii) {
              return ii > i && (indexs[ii] = 0);
            });

            _this2.setState({
              indexs: indexs
            });

            _onChange && _onChange(indexs, data);
          },
          onClick: !confirm && function (index) {
            onConfirm && onConfirm(index, data);
            app.modal.close(_id);
          },
          itemHeight: itemHeight,
          itemShowCount: itemShowCount,
          index: indexs[i] || 0,
          data: v,
          key: i
        });
      }), _react.default.createElement(_Panel.default, {
        className: "position-absolute width-full border-set-v- bg-none- pointer-events-none bg-color-translucent",
        "bs-top": itemHeight * Math.floor(itemShowCount / 2),
        "bs-height": itemHeight
      })));
    }
  }]);
  return Picker;
}(_react.default.Component);

exports.Picker = Picker;

Picker.Col =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(_class, _React$PureComponent);

  function _class(props, context) {
    var _this3;

    (0, _classCallCheck2.default)(this, _class);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props, context));
    _this3.state = {
      offset: -props.itemHeight * props.index
    };
    _this3._handleStart = _this3.handleStart.bind((0, _assertThisInitialized2.default)(_this3));
    _this3._handleMove = _this3.handleMove.bind((0, _assertThisInitialized2.default)(_this3));
    _this3._handleEnd = _this3.handleEnd.bind((0, _assertThisInitialized2.default)(_this3));
    return _this3;
  }

  (0, _createClass2.default)(_class, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.index !== this.props.index) this.setState({
        offset: -this.props.itemHeight * this.props.index
      });
    }
  }, {
    key: "handleStart",
    value: function handleStart(e) {
      this.offset = this.state.offset;
      this.y = _BaseComponent2.domIsMouse ? e.clientY : e.touches[0].clientY;
    }
  }, {
    key: "handleMove",
    value: function handleMove(e) {
      if (this.offset === undefined) return;
      this.offsetY = (_BaseComponent2.domIsMouse ? e.clientY : e.touches[0].clientY) - this.y;
      var offset = this.offset + this.offsetY;
      this.setState({
        offset: offset
      });
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(e) {
      var index = -Math.sign(this.state.offset) * Math.round(Math.abs(this.state.offset) / this.props.itemHeight);
      if (index < 0) index = 0;
      if (index >= this.props.data.length) index = this.props.data.length - 1;
      this.props.onChange && this.props.onChange(index);
      var offset = -this.props.itemHeight * index;
      this.setState({
        offset: offset
      });
      this.offset = undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _ref;

      var _this$props = this.props,
          itemHeight = _this$props.itemHeight,
          itemShowCount = _this$props.itemShowCount,
          data = _this$props.data,
          onClick = _this$props.onClick;
      var offset = this.state.offset;
      var offsetTop = offset % itemHeight;
      var offsetIndex = -Math.sign(offset) * Math.floor(Math.abs(offset) / itemHeight) - Math.floor(itemShowCount / 2);
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({}, (_ref = {}, (0, _defineProperty3.default)(_ref, _BaseComponent2.domIsMouse ? 'onMouseDown' : 'onTouchStart', this._handleStart), (0, _defineProperty3.default)(_ref, _BaseComponent2.domIsMouse ? 'onMouseMove' : 'onTouchMove', this._handleMove), (0, _defineProperty3.default)(_ref, _BaseComponent2.domIsMouse ? 'onMouseUp' : 'onTouchEnd', this._handleEnd), (0, _defineProperty3.default)(_ref, "onTouchCancel", this._handleEnd), _ref), {
        "bs-height": itemShowCount * itemHeight,
        className: "position-relative flex-sub-flex-extend overflow-a-hidden"
      }), (0, _from.default)({
        length: itemShowCount + 4
      }, function (v, i) {
        return i;
      }).map(function (v, i) {
        return _react.default.createElement(_Panel.default, {
          key: i,
          onClick: onClick && function () {
            return onClick(v + offsetIndex);
          },
          className: "flex-display-block flex-justify-center flex-align-center width-full position-absolute transition-set-- ",
          "bs-top": v * itemHeight + offsetTop,
          "bs-height": itemHeight
        }, data[v + offsetIndex]);
      }));
    }
  }]);
  return _class;
}(_react.default.PureComponent);

var _default = {
  _id: 'picker',
  _dependencies: 'modal',
  _onStart: function _onStart(app) {
    app.picker = {
      show: function show(data, aprops, options) {
        var itemShowCount = aprops.itemShowCount,
            itemHeight = aprops.itemHeight,
            linked = aprops.linked,
            confirm = aprops.confirm,
            onChange = aprops.onChange,
            onCancel = aprops.onCancel,
            onConfirm = aprops.onConfirm,
            title = aprops.title,
            props = (0, _objectWithoutProperties2.default)(aprops, ["itemShowCount", "itemHeight", "linked", "confirm", "onChange", "onCancel", "onConfirm", "title"]);
        if (confirm === undefined) confirm = data.length > 1;
        var pickerProps = {
          itemShowCount: itemShowCount,
          itemHeight: itemHeight,
          linked: linked,
          confirm: confirm,
          onChange: onChange,
          onCancel: onCancel,
          onConfirm: onConfirm,
          title: title
        };
        return app.modal.show(function (props) {
          return _react.default.createElement(Picker, (0, _extends2.default)({
            data: data,
            modal: props
          }, pickerProps));
        }, _objectSpread({}, props, {
          type: 'document',
          'bp-container-className': 'flex-display-block flex-direction-v flex-justify-end'
        }), options);
      },
      showTime: function showTime(time, props, options) {
        var data = [(0, _from.default)({
          length: 24
        }, function (v, i) {
          return String(i).padStart(2, '0');
        }), (0, _from.default)({
          length: 60
        }, function (v, i) {
          return String(i).padStart(2, '0');
        })];

        if (!time) {
          var date = new Date();
          time = date.getHours() + ':' + date.getMinutes();
        }

        var times = time.split(':');
        var indexs = [times[0] ? Number(times[0]) : 0, times[1] ? Number(times[1]) : 0];
        return app.picker.show(data, _objectSpread({
          indexs: indexs
        }, props, {
          onConfirm: function onConfirm(indexs) {
            return props.onConfirm && props.onConfirm(data[0][indexs[0]] + ':' + data[1][indexs[1]]);
          }
        }), options);
      },
      showDate: function showDate(date, props, options) {
        var data = [(0, _from.default)({
          length: 100
        }, function (v, i) {
          return String(1970 + i).padStart(4, '0');
        }), (0, _from.default)({
          length: 12
        }, function (v, i) {
          return String(i + 1).padStart(2, '0');
        }), function (indexs, data) {
          var year = data[0][indexs[0]];
          var month = data[1][indexs[1]];
          var daycount = 31;
          if (['04', '06', '09', '11'].includes(month)) daycount = 30;
          if (month === '02') daycount = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
          return (0, _from.default)({
            length: daycount
          }, function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }];

        if (!date) {
          var adate = new Date();
          date = adate.getFullYear() + '-' + adate.getMonth() + '-' + (adate.getDate() - 1);
        }

        var dates = date.split('-');
        var indexs = [dates[0] ? Number(dates[0]) - data[0][0] : 0, dates[1] ? Number(dates[1]) : 0, dates[2] ? Number(dates[2]) : 0];
        return app.picker.show(data, _objectSpread({
          linked: true,
          indexs: indexs
        }, props, {
          onConfirm: function onConfirm(indexs, data) {
            return props.onConfirm && props.onConfirm(data[0][indexs[0]] + '-' + data[1][indexs[1]] + '-' + data[2][indexs[2]]);
          }
        }), options);
      },
      close: function close(_id) {
        app.modal.close(_id);
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.picker;
  }
};
exports.default = _default;