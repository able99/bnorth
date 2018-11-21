"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.object.assign");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var RouterComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RouterComponent, _React$Component);

  function RouterComponent() {
    (0, _classCallCheck2.default)(this, RouterComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(RouterComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', function () {
        return _this.forceUpdate();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.eventOffRouterUpdate();
    }
  }, {
    key: "_renderPage",
    value: function _renderPage(_ref, activeId, focusId) {
      var _this2 = this;

      var _id = _ref._id,
          _idParent = _ref._idParent,
          name = _ref.name,
          pathname = _ref.pathname,
          fullPathName = _ref.fullPathName,
          query = _ref.query,
          state = _ref.state,
          params = _ref.params,
          routeParams = _ref.routeParams,
          pathnameParams = _ref.pathnameParams,
          viewItems = _ref.viewItems,
          embeds = _ref.embeds,
          embed = _ref.embed,
          routeName = _ref.routeName,
          route = _ref.route;
      var app = this.props.app;
      var embedsPage = {};
      Object.entries(embeds).map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            k = _ref3[0],
            v = _ref3[1];

        return embedsPage[k] = _this2._renderPage(v, activeId, focusId);
      });
      var props = {
        app: app,
        key: _id,
        _id: _id,
        route: (0, _objectSpread2.default)({}, route, {
          name: name,
          routeName: routeName,
          pathname: pathname,
          fullPathName: fullPathName,
          _idParent: _idParent,
          query: query,
          state: state,
          params: params,
          pathnameParams: pathnameParams,
          active: embed ? _idParent === activeId : _id === activeId,
          embed: embed
        }),
        views: viewItems.map(function (v) {
          return _this2._renderView(v);
        }),
        embeds: embedsPage
      };

      if (route.loader) {
        route.loader(app).then(function (v) {
          Object.assign(route, v, {
            loader: null
          });

          _this2.forceUpdate();
        });
        return _react.default.createElement(app.router.PageLoading, {
          key: _id
        });
      } else if (typeof route.component === 'function') {
        return _react.default.createElement(app.Page, props);
      } else {
        return _react.default.createElement(app.router, {
          key: _id,
          app: app,
          data: {
            errorRoute: "wrong component"
          }
        });
      }
    }
  }, {
    key: "_renderView",
    value: function _renderView(_ref4) {
      var Component = _ref4.content,
          props = _ref4.props,
          _ref4$options = _ref4.options,
          _id = _ref4$options._id,
          isContentComponent = _ref4$options.isContentComponent;
      var aprops = (0, _objectSpread2.default)({}, isContentComponent ? {} : Component.porps, props, {
        key: _id
      });
      return isContentComponent ? _react.default.createElement(Component, aprops) : (0, _typeof2.default)(Component) === 'object' && Component.type ? (0, _react.cloneElement)(Component, aprops) : Component;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var app = this.props.app;
      var _app$router = app.router,
          _pathinfos = _app$router._pathinfos,
          _error = _app$router._error,
          _activeId = _app$router._activeId,
          _focusId = _app$router._focusId;
      var viewItems = app.router.getNoPageViews().map(function (v) {
        return (0, _objectSpread2.default)({}, v);
      });

      if (!_error) {
        return _react.default.createElement(_react.default.Fragment, null, _pathinfos.map(function (v) {
          return _this3._renderPage(v, _activeId, _focusId);
        }), viewItems.map(function (v) {
          return _this3._renderView(v, _activeId, _focusId);
        }));
      } else {
        return _react.default.createElement(app.router.PageError, {
          app: app,
          data: _error
        });
      }
    }
  }]);
  return RouterComponent;
}(_react.default.Component);

exports.default = RouterComponent;