'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appComponentContainer = exports.AppComponentPage = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * app 的根页面Page
 * 保留了，页面在bnroth 层处理页面的能力，目前实现了对html 中waitting 的管理
 * @class
 */
var AppComponentPage = exports.AppComponentPage = function (_React$Component) {
  (0, _inherits3.default)(AppComponentPage, _React$Component);

  function AppComponentPage() {
    (0, _classCallCheck3.default)(this, AppComponentPage);
    return (0, _possibleConstructorReturn3.default)(this, (AppComponentPage.__proto__ || Object.getPrototypeOf(AppComponentPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(AppComponentPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.state__page.ready !== false) {
        this.app.removeWaiting();
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.state__page.ready === false && nextProps.state__page.ready) {
        this.app.removeWaiting();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);
  return AppComponentPage;
}(_react2.default.Component);

/*!
 * app 的根页面Container
 * 保留了，页面在bnroth 层处理页面的能力，目前实现了页面生命周期映射到 app event 中
 * @class
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var appComponentContainer = exports.appComponentContainer = function appComponentContainer(app, props, container) {
  container.reducers.app = true;

  container.handlers.onWillStart = function () {
    app.trigger('onAppWillStart');
  };
  container.handlers.onStart = function () {
    app.trigger('onAppStart');
  };
  container.handlers.onStop = function () {
    app.trigger('onAppStop');
  };
  container.handlers.onResume = function () {
    app.trigger('onAppResume');
  };
  container.handlers.onPause = function () {
    app.trigger('onAppPause');
  };
};