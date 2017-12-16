'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _browser = require('../utils/browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, Wrapper) {
  return function (_Wrapper) {
    (0, _inherits3.default)(_class, _Wrapper);

    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.app = app;
      _this._focus = false;
      return _this;
    }

    (0, _createClass3.default)(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        app.pages.push(this);
        if (this.props.onWillStart) this.props.onWillStart(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this).call(this);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.onStart) this.props.onStart(this);
        if (this.checkFocusChange()) {
          this.componentDidResume();
        }
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidMount', this).call(this);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.checkFocusChange()) {
          if (this.isFocus()) {
            this.componentDidResume();
          } else {
            this.componentDidPause();
          }
        }

        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidUpdate', this).call(this);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.componentDidPause();

        if (this.props.onStop) this.props.onStop(this);
        var ret = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentWillMount', this).call(this);

        app.pages.splice(app.pages.indexOf(this));
        return ret;
      }
    }, {
      key: 'componentDidPause',
      value: function componentDidPause() {
        if (this.props.onPause) this.props.onPause(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidPause', this).call(this);
      }
    }, {
      key: 'componentDidResume',
      value: function componentDidResume() {
        (0, _browser.setBrowserTitle)(this.props.route.title || app.config.browser.title);
        if (this.props.onResume) this.props.onResume(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidResume', this).call(this);
      }
    }, {
      key: 'componentDidBackKey',
      value: function componentDidBackKey() {
        if (this.props.onBackKey) this.props.onBackKey(this);
        return (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidBackKey', this) && (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'componentDidBackKey', this).call(this);
      }
    }, {
      key: 'render',
      value: function render() {
        var name = Wrapper.displayName || Wrapper.name;
        app.verbose('page render(' + name + '):', this);

        var ret = void 0;
        try {
          ret = (0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
        } catch (e) {
          return app.trigger('onErrorPageRender', e);
        }
        if (this.isAppPage()) {
          return ret;
        }

        ret = _react2.default.cloneElement(ret, Object.assign({
          'data-bnorth-page': name,
          'data-blur': !this.isFocus()
        }, ret.props));

        if (this.getSubs().indexOf(this.getPageChildPath()) >= 0) {
          return _react2.default.createElement(
            'div',
            null,
            ret,
            this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children
          );
        } else {
          return _react2.default.createElement(
            'div',
            null,
            ret,
            this.isSubPage() ? null : this.props.children
          );
        }
      }
    }, {
      key: 'isAppPage',
      value: function isAppPage() {
        return this.props.routes[0] === this.props.route;
      }
    }, {
      key: 'checkFocusChange',
      value: function checkFocusChange() {
        var oldFocus = this._focus;
        this._focus = this.isFocus();
        return this._focus !== oldFocus;
      }
    }, {
      key: 'isFocus',
      value: function isFocus() {
        if (this.getSubs().hasOwnProperty(this.getPageChildPath())) {
          return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
        } else {
          return !Boolean(this.props.children);
        }
      }
    }, {
      key: 'isContainer',
      value: function isContainer() {
        return (this.props.route.childRoutes || []).find(function (v) {
          return v.components;
        });
      }
    }, {
      key: 'getSubs',
      value: function getSubs() {
        return (this.props.route.childRoutes || []).filter(function (v) {
          return v.components;
        }).map(function (v) {
          return v.path;
        });
      }
    }, {
      key: 'isSubPage',
      value: function isSubPage() {
        return Boolean(this.props.route.components);
      }
    }, {
      key: 'getPageFullPath',
      value: function getPageFullPath() {
        var routes = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;

            if (!route.path) continue;
            routes.push(route.path === "/" ? "" : route.path);
            if (route === this.props.route) break;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var pathname = routes.join("/");
        for (var key in this.props.router.params) {
          var re = new RegExp(":" + key, "g");
          pathname = pathname.replace(re, this.props.router.params[key]);
        }
        return pathname;
      }
    }, {
      key: 'getPageChildPath',
      value: function getPageChildPath() {
        var ret = null;
        for (var i = 0; i < this.props.routes.length; i++) {
          var route = this.props.routes[i];
          if (!route.path) continue;
          if (route === this.props.route) {
            ret = this.props.routes[i + 1];
            break;
          }
        }
        return ret ? ret.path : null;
      }
    }, {
      key: 'getPageParentPath',
      value: function getPageParentPath() {
        var ret = null;
        for (var i = 0; i < this.props.routes.length; i++) {
          var route = this.props.routes[i];
          if (!route.path) continue;
          if (route === this.props.route) break;
          ret = route.path;
        }
        return ret;
      }
    }]);
    return _class;
  }(Wrapper);
};