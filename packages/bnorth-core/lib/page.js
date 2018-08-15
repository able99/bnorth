"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var Page =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Page, _React$Component);

  // constructor
  // ---------------------------
  function Page(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Page);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Page).call(this, props));

    _this.parseController();

    return _this;
  }

  (0, _createClass2.default)(Page, [{
    key: "handleKeyEvent",
    // key event
    // ---------------------------
    value: function handleKeyEvent(e) {
      return e.keyCode === 27 && this.actionGoBack();
    } // controller
    // ---------------------------

  }, {
    key: "action",
    value: function action(func, name) {
      var _this2 = this;

      if (!name) name = "_".concat(++this._actionNum);

      var ret = function ret() {
        try {
          app.log.info('page action', _this2.name, name);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          func.apply(_this2, args);
        } catch (e) {
          app.log.error('page action', name, e);
          app.render.panic(e, {
            title: "action(".concat(name, ") error")
          });
        }
      };

      if (name) this["action".concat(name)] = ret;
      return ret;
    }
  }, {
    key: "parseController",
    value: function parseController() {
      var _this3 = this;

      var app = this.props.app;
      var controllerObj = typeof this.props.route.controller === 'function' ? this.props.route.controller(app, this) : this.props.route.controller || {};
      if (!controllerObj.stateData) controllerObj.stateData = undefined;
      if (!controllerObj.actionGoBack) controllerObj.actionGoBack = function () {
        return app.router.back();
      };
      Object.entries(controllerObj).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k.startsWith('state') || k.startsWith('_state')) {
          // state
          if (typeof v === 'string') {
            _this3[k] = app.states[v];
          } else {
            var _ref3 = v || {},
                _ref3$state = _ref3.state,
                state = _ref3$state === void 0 ? app.State : _ref3$state,
                stateOptions = (0, _objectWithoutProperties2.default)(_ref3, ["state"]);

            _this3[k] = new state(app, k, stateOptions, _this3);
          }
        }
      });
      Object.entries(controllerObj).forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
            k = _ref5[0],
            v = _ref5[1];

        if (k.startsWith('state') || k.startsWith('_state')) {// state
        } else if (k.startsWith('onPage')) {
          // page event
          app.event.on(_this3, k, v, _this3.name);
        } else if (k.startsWith('onState')) {
          // page state event
          var stateEvents = k.split('_');
          if (stateEvents[0] && _this3[stateEvents[1]]) app.event.on(_this3[stateEvents[1]], stateEvents[0], v, _this3.name);
        } else if (k.startsWith('on')) {
          // app event
          app.event.on(app, k, v, _this3.name);
        } else if (k.startsWith('action')) {
          // action
          _this3[k] = _this3.action(v, k);
        } else {
          // user props
          _this3[k] = v;
        }
      });
    }
  }, {
    key: "_getStateKeys",
    value: function _getStateKeys() {
      return Object.entries(this).filter(function (_ref6) {
        var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
            k = _ref7[0],
            v = _ref7[1];

        return k.startsWith('_state') || k.startsWith('state') && k !== 'state';
      }).map(function (_ref8) {
        var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
            k = _ref9[0],
            v = _ref9[1];

        return v.name;
      });
    }
  }, {
    key: "_getStateObjs",
    value: function _getStateObjs() {
      var ret = {};
      Object.entries(this).filter(function (_ref10) {
        var _ref11 = (0, _slicedToArray2.default)(_ref10, 2),
            k = _ref11[0],
            v = _ref11[1];

        return k.startsWith('_state') || k.startsWith('state') && k !== 'state';
      }).forEach(function (_ref12) {
        var _ref13 = (0, _slicedToArray2.default)(_ref12, 2),
            k = _ref13[0],
            v = _ref13[1];

        ret[k] = v.data();
        var dataExt = v.dataExt();
        if (dataExt) ret["".concat(k, "Ext")] = dataExt;
      });
      return ret;
    } // page life circle
    // ---------------------------

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var _this$props = this.props,
          app = _this$props.app,
          name = _this$props.name,
          active = _this$props.active;
      app.log.info('page did mount', name);
      this._offKeyEvent = app.keyboard.on('keydown', function (e) {
        return _this4.handleKeyEvent(e);
      }, {
        pageName: name
      });
      app.event.emitSync(app, 'onPageAdd', name, this);
      app.event.emitSync(this, 'onPageStart', this, active);
      active && app.event.emitSync(this, 'onPageActive', this, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          app = _this$props2.app,
          name = _this$props2.name;
      app.log.info('page will unmount', name);
      app.event.emitSync(this, 'onPageInactive', this, true);
      app.event.emitSync(this, 'onPageStop', this);
      app.event.emitSync(app, 'onPageRemove', name, this);
      this._offKeyEvent && this._offKeyEvent();
      app.event.off(name);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props,
          app = _this$props3.app,
          active = _this$props3.active;

      if (prevProps.active !== active) {
        app.event.emitSync(this, active ? 'onPageActive' : 'onPageInactive', this, false);
      }
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var app = this.props.app;
      app.log.info('page did catch');
      app.render.panic(info.componentStack, {
        title: error
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.props.app.utils.shallowEqual(this.props, nextProps)) return true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._getStateKeys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;
          if (!this.props.app.utils.is(this.props.context[k], nextProps.context[k])) return true;
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

      return false;
    } // page render
    // ---------------------------

  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props4 = this.props,
          app = _this$props4.app,
          context = _this$props4.context,
          name = _this$props4.name,
          active = _this$props4.active,
          focus = _this$props4.focus,
          frame = _this$props4.frame,
          route = _this$props4.route,
          match = _this$props4.match,
          views = _this$props4.views,
          embed = _this$props4.embed,
          children = _this$props4.children,
          props = (0, _objectWithoutProperties2.default)(_this$props4, ["app", "context", "name", "active", "focus", "frame", "route", "match", "views", "embed", "children"]);
      app.log.info('page render', name);
      this._actionNum = 0;
      var componentProps = (0, _objectSpread2.default)({
        app: app,
        name: name,
        page: this,
        frame: this.frame || frame,
        route: route,
        match: match
      }, this._getStateObjs());

      var ret = _react.default.createElement(route.component, (0, _extends2.default)({}, props, componentProps), _react.default.Children.map(children, function (children) {
        return (0, _react.cloneElement)(children, (0, _objectSpread2.default)({}, children.props, {
          frame: _this5.frame
        }));
      }));

      if (!embed) {
        var styleSet = {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          visibility: active ? 'visible' : 'hidden'
        };

        var refFrame = function refFrame(e) {
          if (!e) return;
          var update = !_this5.frame;
          _this5.frame = e;
          if (update) _this5.forceUpdate();
        };

        ret = _react.default.createElement("main", {
          "data-page": name,
          ref: refFrame,
          style: styleSet
        }, ret);
      }

      return ret;
    }
  }, {
    key: "name",
    get: function get() {
      return this.props.name;
    }
  }, {
    key: "pathname",
    get: function get() {
      return this.props.route && this.props.route.pathname;
    }
  }, {
    key: "route",
    get: function get() {
      return this.props.route || {};
    }
  }, {
    key: "match",
    get: function get() {
      return this.props.match || {};
    }
  }]);
  return Page;
}(_react.default.Component);

exports.default = Page;
module.exports = exports["default"];