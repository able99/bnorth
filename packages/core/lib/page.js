"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.object.keys");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

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
    key: "getEmbed",
    value: function getEmbed(routerName) {
      var _id = this.props.embeds[routerName] && this.props.embeds[routerName].props._id;

      return _id && this.props.app.router.getPage(_id);
    } // key event
    // ---------------------------

  }, {
    key: "handleKeyEvent",
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
          _this2.app.log.info('page action', _this2.name, name);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return func.apply(_this2, args);
        } catch (e) {
          _this2.app.log.error('page action', name, e);

          _this2.app.render.panic(e, {
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

      var _this$props = this.props,
          app = _this$props.app,
          _this$props$route = _this$props.route;
      _this$props$route = _this$props$route === void 0 ? {} : _this$props$route;
      var component = _this$props$route.component,
          controller = _this$props$route.controller;
      var acontroller = controller || component.controller || {};
      var controllerObj = typeof acontroller === 'function' ? acontroller(app, this) : acontroller;
      if (!controllerObj.stateData) controllerObj.stateData = undefined;
      if (!controllerObj.actionGoBack) controllerObj.actionGoBack = function () {
        return app.router.back();
      };
      Object.entries(controllerObj).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k.startsWith('state') || k.startsWith('_state')) {
          _this3[k] = app.State.createState(app, v, k, _this3._id);

          if (!_this3[k]) {
            app.render.panic(v, {
              title: 'no state'
            });
            return;
          }

          if (typeof v === 'string') return;
          app.event.on(_this3._id, 'onPageStart', function (page, active) {
            app.event.emit(_this3[k]._id, 'onStateStart', _this3[k]._id, active);
          }, _this3[k]._id);
          app.event.on(_this3._id, 'onPageActive', function (page, onStart) {
            app.event.emit(_this3[k]._id, 'onStateActive', _this3[k]._id, onStart);
          }, _this3[k]._id);
          app.event.on(_this3._id, 'onPageInactive', function (page, onStop) {
            app.event.emit(_this3[k]._id, 'onStateInactive', _this3[k]._id, onStop);
          }, _this3[k]._id);
          app.event.on(_this3._id, 'onPageStop', function (page) {
            app.event.emit(_this3[k]._id, 'onStateStop', _this3[k]._id);
          }, _this3[k]._id);
        }
      });
      Object.entries(controllerObj).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        if (k.startsWith('state') || k.startsWith('_state')) {// state
        } else if (k === 'onPageAdd' || k === 'onPageRemove') {
          // app event
          app.event.on(app._id, k, v, _this3._id);
        } else if (k.startsWith('onPage')) {
          // page event
          app.event.on(_this3._id, k, v, _this3._id);
        } else if (k.startsWith('onState')) {
          // page state event
          var stateEvents = k.split('_');
          if (stateEvents[0] && _this3[stateEvents[1]]) app.event.on(_this3[stateEvents[1]]._id, stateEvents[0], v, _this3._id);
        } else if (k.startsWith('on')) {
          // app event
          app.event.on(app._id, k, v, _this3._id);
        } else if (k.startsWith('action')) {
          // action
          _this3[k] = _this3.action(v, k.slice(6));
        } else {
          // user props
          _this3[k] = v;
        }
      });
    }
  }, {
    key: "_getStateKeys",
    value: function _getStateKeys() {
      return Object.entries(this).filter(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return k.startsWith('_state') || k.startsWith('state') && k !== 'state';
      }).map(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return v._id;
      });
    }
  }, {
    key: "_getStateObjs",
    value: function _getStateObjs() {
      var ret = {};
      Object.entries(this).filter(function (_ref9) {
        var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

        return k.startsWith('_state') || k.startsWith('state') && k !== 'state';
      }).forEach(function (_ref11) {
        var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        ret[k] = v.data();
        var extData = v.extData();
        if (extData) ret["".concat(k, "Ext")] = extData;
      });
      return ret;
    } // page life circle
    // ---------------------------

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var _this$props2 = this.props,
          app = _this$props2.app,
          _id = _this$props2._id,
          active = _this$props2.route.active;
      app.log.info('page did mount', _id);
      this._offKeyEvent = app.keyboard.on(_id, 'keydown', function (e) {
        return _this4.handleKeyEvent(e);
      });
      app.event.emit(app._id, 'onPageAdd', _id, this);
      app.event.emit(this._id, 'onPageStart', this, active);
      active && app.event.emit(this._id, 'onPageActive', this, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props3 = this.props,
          app = _this$props3.app,
          _id = _this$props3._id;
      app.log.info('page will unmount', _id);
      app.event.emit(this._id, 'onPageInactive', this, true);
      app.event.emit(this._id, 'onPageStop', this);
      app.event.emit(app._id, 'onPageRemove', _id, this);
      this._offKeyEvent && this._offKeyEvent();
      app.event.off(_id);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props4 = this.props,
          app = _this$props4.app,
          active = _this$props4.route.active;

      if (prevProps.route.active !== active) {
        app.event.emit(this._id, active ? 'onPageActive' : 'onPageInactive', this, false);
      }
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      var app = this.props.app;
      app.log.info('page did catch');
      app.render.panic(error, {
        title: 'page error catch'
      }, this._id);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.props.app.utils.shallowEqual(this.props.route, nextProps.route, ['params', 'query'])) return true; // if (!this.props.app.utils.shallowEqual(this.props.views, nextProps.views)) return true;
      // if (!this.props.app.utils.shallowEqual(this.props.embeds, nextProps.embeds)) return true;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._getStateKeys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var k = _step.value;
          if (this.props.context[k] !== nextProps.context[k]) return true;
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

      var _this$props5 = this.props,
          context = _this$props5.context,
          app = _this$props5.app,
          _id = _this$props5._id,
          route = _this$props5.route,
          views = _this$props5.views,
          embeds = _this$props5.embeds,
          props = (0, _objectWithoutProperties2.default)(_this$props5, ["context", "app", "_id", "route", "views", "embeds"]);
      app.log.info('page render', _id);
      var active = route.active,
          embed = route.embed;
      this._actionNum = 0;
      var componentProps = (0, _objectSpread2.default)({
        app: app,
        _id: _id,
        route: route,
        page: this,
        frame: this.frame
      }, this._getStateObjs());
      Object.keys(embeds).forEach(function (v) {
        embeds[v] = (0, _react.cloneElement)(embeds[v], (0, _objectSpread2.default)({}, v.props, {
          frame: _this5.frame
        }));
      });

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

        return _react.default.createElement("main", {
          "data-page": _id,
          ref: refFrame,
          style: styleSet
        }, _react.default.createElement(route.component, (0, _extends2.default)({}, props, componentProps), embeds), views);
      } else {
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(route.component, (0, _extends2.default)({}, props, componentProps), embeds), views);
      }
    }
  }, {
    key: "_id",
    get: function get() {
      return this.props._id;
    }
  }, {
    key: "app",
    get: function get() {
      return this.props.app;
    }
  }]);
  return Page;
}(_react.default.Component);

exports.default = Page;