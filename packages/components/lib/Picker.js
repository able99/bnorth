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

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.string.pad-start");

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.name");

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _BaseComponent5 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Touchable = _interopRequireDefault(require("./Touchable"));

var _Button = _interopRequireDefault(require("./Button"));

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
    var data = props.data,
        index = props.index,
        onInit = props.onInit;
    index = _this._parseData(index, data, true);
    _this.state = {
      index: index,
      itemSize: 0
    };
    onInit && onInit(_this._parseIndex(index, _this.data));
    return _this;
  }

  (0, _createClass2.default)(Picker, [{
    key: "_parseIndex",
    value: function _parseIndex(index, data) {
      return index.map(function (v, i) {
        return data[i][v];
      });
    }
  }, {
    key: "_parseData",
    value: function _parseData(index, data, parseIndex) {
      var _this2 = this;

      this.data = [];
      var aindex = parseIndex ? [] : index;
      data.forEach(function (v, i) {
        if (typeof v === 'function') v = v(i, _this2.data, aindex);

        if (i === 0) {
          v = v || [];
        } else {
          v = v.filter(function (vv) {
            if (!vv) return false;
            if ((0, _typeof2.default)(vv) !== 'object' || vv.pid === undefined || vv.pid === null) return true;
            var pobj = _this2.data[i - 1][aindex[i - 1] || 0];
            return pobj && vv.pid === (pobj.id || pobj.name);
          });
        }

        if (parseIndex) aindex[i] = index[i] ? Math.max(v.findIndex(function (vv) {
          return (0, _typeof2.default)(vv) === 'object' ? (vv.id || vv.name) === index[i] : vv === index[i];
        }), 0) : 0;
        _this2.data[i] = v;
      });
      return aindex;
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(i, colIndex, index, data) {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          originData = _this$props.data;
      index = (0, _toConsumableArray2.default)(index);
      index[i] = colIndex;

      for (var ii = i + 1; ii < data.length; ii++) {
        if (data[ii][0] && (0, _typeof2.default)(data[ii][0]) === 'object' && data[ii][0].pid !== null && data[ii][0].pid !== undefined) index[ii] = 0;
      }

      this._parseData(index, originData);

      for (var _ii = 0; _ii < data.length; _ii++) {
        if (index[_ii] < 0) index[_ii] = 0;

        if (index[_ii] >= this.data[_ii].length) {
          index[_ii] = this.data[_ii].length - 1;
        }
      }

      if (onChange && onChange(this._parseIndex(index, this.data)) === false) {
        this.setState({});
      } else {
        this.setState({
          index: index
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _BaseComponent = (0, _BaseComponent5.default)(this.props, Picker),
          lineCount = _BaseComponent.lineCount,
          data = _BaseComponent.data,
          onInit = _BaseComponent.onInit,
          onChange = _BaseComponent.onChange,
          _index = _BaseComponent.index,
          _BaseComponent$compon = _BaseComponent.component,
          Component = _BaseComponent$compon === void 0 ? _Panel.default : _BaseComponent$compon,
          componentPanel = _BaseComponent.componentPanel,
          className = _BaseComponent.className,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["lineCount", "data", "onInit", "onChange", "index", "component", "componentPanel", "className"]);

      var _this$state = this.state,
          index = _this$state.index,
          itemSize = _this$state.itemSize;
      var classStr = 'flex-display-block  overflow-y-hidden';
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        className: (0, _classes.default)(classStr, className)
      }, props), data.map(function (v, i) {
        return _react.default.createElement(Picker._Col, {
          data: _this3.data[i].map(function (v) {
            return (0, _typeof2.default)(v) === 'object' ? v.name : v;
          }),
          onChange: function onChange(e) {
            return _this3._handleChange(i, e, index, _this3.data);
          },
          onSize: i === 0 && function (e) {
            return _this3.setState({
              itemSize: e
            });
          },
          key: i,
          lineCount: lineCount,
          index: index[i] || 0
        });
      }), _react.default.createElement(Picker._Line, {
        lineCount: lineCount,
        itemSize: itemSize
      }));
    }
  }]);
  return Picker;
}(_react.default.Component);

exports.Picker = Picker;
Picker.defaultProps = {
  lineCount: 5,
  data: [],
  index: []
};

Picker._Line = function (aprops) {
  var _BaseComponent2 = (0, _BaseComponent5.default)(aprops, Picker._Line),
      itemSize = _BaseComponent2.itemSize,
      lineCount = _BaseComponent2.lineCount,
      _BaseComponent2$compo = _BaseComponent2.component,
      Component = _BaseComponent2$compo === void 0 ? _Panel.default : _BaseComponent2$compo,
      componentPanel = _BaseComponent2.componentPanel,
      className = _BaseComponent2.className,
      style = _BaseComponent2.style,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["itemSize", "lineCount", "component", "componentPanel", "className", "style"]);

  var classStr = 'border-set-v- position-absolute width-full pointer-events-none';

  var styleSet = _objectSpread({
    top: Math.floor(lineCount / 2) * itemSize,
    height: itemSize
  }, style);

  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _classes.default)(classStr, className),
    style: styleSet
  }, props));
};

Picker._Col =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(_class, _React$Component2);

  function _class(props, context) {
    var _this4;

    (0, _classCallCheck2.default)(this, _class);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props, context));
    _this4.state = {
      offset: 0
    };
    return _this4;
  }

  (0, _createClass2.default)(_class, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var el = (0, _BaseComponent5.domFindNode)(this);
      this.itemSize = el && el.children[0] && el.children[0].children && (0, _BaseComponent5.domOffset)(el.children[0].children[0]).height;
      this.props.onSize && this.props.onSize(this.itemSize);
    }
  }, {
    key: "handleMove",
    value: function handleMove(event, target) {
      this.setState({
        offset: event.deltaY
      });
      event.preventDefault();
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(event, target) {
      var _this$props2 = this.props,
          data = _this$props2.data,
          index = _this$props2.index,
          onChange = _this$props2.onChange;
      var indexChange = this.props.index + Math.round(-event.deltaY / this.itemSize);
      indexChange = Math.max(indexChange, 0);
      indexChange = Math.min(indexChange, data.length - 1);
      if (indexChange !== index && onChange) onChange(indexChange);
      this.setState({
        offset: 0
      });
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _BaseComponent3 = (0, _BaseComponent5.default)(this.props, Picker._Col),
          _BaseComponent3$data = _BaseComponent3.data,
          data = _BaseComponent3$data === void 0 ? [] : _BaseComponent3$data,
          index = _BaseComponent3.index,
          lineCount = _BaseComponent3.lineCount,
          onSize = _BaseComponent3.onSize,
          _BaseComponent3$compo = _BaseComponent3.component,
          Component = _BaseComponent3$compo === void 0 ? _Touchable.default : _BaseComponent3$compo,
          componentPanel = _BaseComponent3.componentPanel,
          className = _BaseComponent3.className,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["data", "index", "lineCount", "onSize", "component", "componentPanel", "className"]);

      var offset = this.state.offset;
      if (!data.length) data.push(' ');
      var translateY = "".concat(this.itemSize * (Math.floor(lineCount / 2) - index) + offset, "px");
      var classStr = 'flex-sub-flex-extend transition-set- overflow-a-hidden';
      return _react.default.createElement(Component, (0, _extends2.default)({
        component: componentPanel,
        direction: "vertical",
        onPan: this.handleMove.bind(this),
        onPanCancel: function onPanCancel(el, e) {
          return _this5.handleEnd(el, e);
        },
        onPanEnd: function onPanEnd(el, e) {
          return _this5.handleEnd(el, e);
        },
        "bs-height": this.itemSize * lineCount,
        className: (0, _classes.default)(classStr, className)
      }, props), _react.default.createElement(_Panel.default, {
        style: (0, _animation.transform)('translateY', translateY)
      }, data.map(function (v, i) {
        return _react.default.createElement(Picker._Item, {
          key: i,
          selected: i === index
        }, v);
      })));
    }
  }]);
  return _class;
}(_react.default.Component);

Picker._Item = function (aprops) {
  var _BaseComponent4 = (0, _BaseComponent5.default)(aprops, Picker._Item),
      selected = _BaseComponent4.selected,
      _BaseComponent4$compo = _BaseComponent4.component,
      Component = _BaseComponent4$compo === void 0 ? _Panel.default : _BaseComponent4$compo,
      componentPanel = _BaseComponent4.componentPanel,
      className = _BaseComponent4.className,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["selected", "component", "componentPanel", "className", "children"]);

  var classStr = 'padding-a- text-align-center width-full';
  return _react.default.createElement(Component, (0, _extends2.default)({
    component: componentPanel,
    "b-theme": !selected && 'light',
    className: (0, _classes.default)(classStr, className)
  }, props), _react.default.createElement(_Panel.default, {
    className: "text-truncate-1-placeholder"
  }, children));
};

var _default = {
  pluginName: 'picker',
  pluginDependence: ['modal'],
  onPluginMount: function onPluginMount(app) {
    app.picker = {
      show: function show(data) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            index = _ref.index,
            lineCount = _ref.lineCount,
            title = _ref.title,
            hasTitleClose = _ref.hasTitleClose,
            _onChange = _ref.onChange,
            onConfirm = _ref.onConfirm,
            onCancel = _ref.onCancel,
            props = (0, _objectWithoutProperties2.default)(_ref, ["index", "lineCount", "title", "hasTitleClose", "onChange", "onConfirm", "onCancel"]);

        var indexChange = [];

        var _id = app.modal.show(_react.default.createElement(_Panel.default, {
          className: "bg-color-white",
          onClick: function onClick(e) {
            return e.stopPropagation();
          }
        }, _react.default.createElement(_Panel.default, {
          className: "flex-display-block flex-justify-between flex-align-center border-set-bottom- padding-a-xs"
        }, _react.default.createElement(_Button.default, {
          "b-theme": "link",
          "b-style": "plain",
          onClick: function onClick() {
            onCancel && onCancel();
            app.picker.close(_id);
          }
        }, "\u53D6\u6D88"), _react.default.createElement(_Panel.default, {
          "bc-text-weigth": "bold"
        }, title), _react.default.createElement(_Button.default, {
          "b-theme": "link",
          "b-style": "plain",
          onClick: function onClick() {
            if (onConfirm && onConfirm(indexChange.map(function (v) {
              return (0, _typeof2.default)(v) === 'object' ? v.id || v.name : v;
            }), indexChange) === false) return;
            app.picker.close(_id);
          }
        }, "\u786E\u5B9A")), _react.default.createElement(Picker, {
          data: data,
          index: index,
          lineCount: lineCount,
          onInit: function onInit(e) {
            return indexChange = e;
          },
          onChange: function onChange(e) {
            indexChange = e;
            return _onChange && _onChange(indexChange);
          }
        })), _objectSpread({
          role: 'document',
          containerProps: {
            className: 'flex-display-block flex-justify-end flex-direction-v flex-align-stretch'
          }
        }, props));
      },
      time: function time(index) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onChange = _ref2.onChange,
            onConfirm = _ref2.onConfirm,
            props = (0, _objectWithoutProperties2.default)(_ref2, ["onChange", "onConfirm"]);

        var data = [(0, _from.default)(Array(24), function (v, i) {
          return String(i).padStart(2, '0');
        }), (0, _from.default)(Array(60), function (v, i) {
          return String(i).padStart(2, '0');
        })];
        if (index && index.split(':').length === 2) props.index = index.split(':');
        if (onChange) props.onChange = function (e) {
          return onChange(e && "".concat(e[0], ":").concat(e[1]));
        };
        if (onConfirm) props.onConfirm = function (e) {
          return onConfirm(e && "".concat(e[0], ":").concat(e[1]));
        };
        app.picker.show(data, props);
      },
      date: function date(index) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            year = _ref3.year,
            _ref3$yearCount = _ref3.yearCount,
            yearCount = _ref3$yearCount === void 0 ? 50 : _ref3$yearCount,
            onChange = _ref3.onChange,
            onConfirm = _ref3.onConfirm,
            props = (0, _objectWithoutProperties2.default)(_ref3, ["year", "yearCount", "onChange", "onConfirm"]);

        var date = new Date();
        year = year || date.getFullYear() - yearCount + 2;
        var data = [function () {
          return (0, _from.default)(Array(yearCount), function (v, i) {
            return String(year + i).padStart(4, '0');
          });
        }, function () {
          return (0, _from.default)(Array(12), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, function (i, data, index) {
          var daycount = 31;
          var year = data[0][index[0]];
          var month = data[1][index[1]];
          if (['04', '06', '09', '11'].includes(month)) daycount = 30;
          if (month === '02') daycount = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
          return (0, _from.default)(Array(daycount), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }];
        if (!index) index = "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), "-").concat(String(date.getDate()).padStart(2, '0'));
        if (index && index.split('-').length === 3) props.index = index.split('-');
        if (onChange) props.onChange = function (e) {
          return onChange(e && "".concat(e[0], "-").concat(e[1], "-").concat(e[2]));
        };
        if (onConfirm) props.onConfirm = function (e) {
          return onConfirm(e && "".concat(e[0], "-").concat(e[1], "-").concat(e[2]));
        };
        app.picker.show(data, props);
      },
      datetime: function datetime(index) {
        var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            onChange = _ref4.onChange,
            onConfirm = _ref4.onConfirm,
            props = (0, _objectWithoutProperties2.default)(_ref4, ["onChange", "onConfirm"]);

        var data = [function () {
          return (0, _from.default)(Array(100), function (v, i) {
            return String(1950 + i).padStart(4, '0');
          });
        }, function () {
          return (0, _from.default)(Array(12), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, function () {
          return (0, _from.default)(Array(31), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, (0, _from.default)(Array(24), function (v, i) {
          return String(i).padStart(2, '0');
        }), (0, _from.default)(Array(60), function (v, i) {
          return String(i).padStart(2, '0');
        })];
        if (index && index.split(':').length) props.index = index.split(':');
        if (onChange) props.onChange = function (e) {
          return onChange(e && "".concat(e[0], ":").concat(e[1]));
        };
        if (onConfirm) props.onConfirm = function (e) {
          return onConfirm(e && "".concat(e[0], ":").concat(e[1]));
        };
        app.picker.show(data, props);
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