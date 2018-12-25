"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Picker = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es6.array.from");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.name");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _dom = require("./utils/dom");

var _props = _interopRequireDefault(require("./utils/props"));

var _Panel = _interopRequireDefault(require("./Panel.Touchable"));

var _Button = _interopRequireDefault(require("./Button"));

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

      var _parseProps = (0, _props.default)(this.props, Picker.props),
          lineCount = _parseProps.lineCount,
          data = _parseProps.data,
          onInit = _parseProps.onInit,
          onChange = _parseProps.onChange,
          _index = _parseProps.index,
          _parseProps$component = _parseProps.component,
          Component = _parseProps$component === void 0 ? _Panel.default : _parseProps$component,
          componentPanel = _parseProps.componentPanel,
          className = _parseProps.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps, ["lineCount", "data", "onInit", "onChange", "index", "component", "componentPanel", "className"]);

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
(0, _defineProperty2.default)(Picker, "defaultProps", {
  lineCount: 5,
  data: [],
  index: []
});

Picker._Line = function (aprops) {
  var _parseProps2 = (0, _props.default)(aprops, Picker._Line.props),
      itemSize = _parseProps2.itemSize,
      lineCount = _parseProps2.lineCount,
      _parseProps2$componen = _parseProps2.component,
      Component = _parseProps2$componen === void 0 ? _Panel.default : _parseProps2$componen,
      componentPanel = _parseProps2.componentPanel,
      className = _parseProps2.className,
      style = _parseProps2.style,
      props = (0, _objectWithoutProperties2.default)(_parseProps2, ["itemSize", "lineCount", "component", "componentPanel", "className", "style"]);

  var classStr = 'border-set-v- position-absolute width-full pointer-events-none';
  var styleSet = (0, _objectSpread2.default)({
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
      var el = (0, _dom.domFindNode)(this);
      this.itemSize = el && el.children[0] && el.children[0].children && (0, _dom.domOffset)(el.children[0].children[0]).height;
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

      var _parseProps3 = (0, _props.default)(this.props, Picker._Col.props),
          _parseProps3$data = _parseProps3.data,
          data = _parseProps3$data === void 0 ? [] : _parseProps3$data,
          index = _parseProps3.index,
          lineCount = _parseProps3.lineCount,
          onSize = _parseProps3.onSize,
          _parseProps3$componen = _parseProps3.component,
          Component = _parseProps3$componen === void 0 ? _Panel.default.Touchable : _parseProps3$componen,
          componentPanel = _parseProps3.componentPanel,
          className = _parseProps3.className,
          props = (0, _objectWithoutProperties2.default)(_parseProps3, ["data", "index", "lineCount", "onSize", "component", "componentPanel", "className"]);

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
  var _parseProps4 = (0, _props.default)(aprops, Picker._Item.props),
      selected = _parseProps4.selected,
      _parseProps4$componen = _parseProps4.component,
      Component = _parseProps4$componen === void 0 ? _Panel.default : _parseProps4$componen,
      componentPanel = _parseProps4.componentPanel,
      className = _parseProps4.className,
      children = _parseProps4.children,
      props = (0, _objectWithoutProperties2.default)(_parseProps4, ["selected", "component", "componentPanel", "className", "children"]);

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
        })), (0, _objectSpread2.default)({
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

        var data = [Array.from(Array(24), function (v, i) {
          return String(i).padStart(2, '0');
        }), Array.from(Array(60), function (v, i) {
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
          return Array.from(Array(yearCount), function (v, i) {
            return String(year + i).padStart(4, '0');
          });
        }, function () {
          return Array.from(Array(12), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, function (i, data, index) {
          var daycount = 31;
          var year = data[0][index[0]];
          var month = data[1][index[1]];
          if (['04', '06', '09', '11'].includes(month)) daycount = 30;
          if (month === '02') daycount = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
          return Array.from(Array(daycount), function (v, i) {
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
          return Array.from(Array(100), function (v, i) {
            return String(1950 + i).padStart(4, '0');
          });
        }, function () {
          return Array.from(Array(12), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, function () {
          return Array.from(Array(31), function (v, i) {
            return String(i + 1).padStart(2, '0');
          });
        }, Array.from(Array(24), function (v, i) {
          return String(i).padStart(2, '0');
        }), Array.from(Array(60), function (v, i) {
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