'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Render = function () {
  function Render(app) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Render);

    this.app = app;
    this.component = null;
    this.domWaiting = null;
    this.stopForRenderError = false;

    this.app.event.on(this.app, 'onAppStartRender', function () {
      _this.renderApp();
    });
  }

  (0, _createClass3.default)(Render, [{
    key: 'critical',
    value: function critical(message, _ref) {
      var title = _ref.title;

      if (this.stopForRenderError) return;this.stopForRenderError = true;
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          title ? app.utils.message2String(title) : 'error'
        ),
        _react2.default.createElement(
          'pre',
          null,
          app.utils.message2String(message)
        )
      ), this.domRoot);
    }
  }, {
    key: 'panic',
    value: function panic(message, _ref2) {
      var title = _ref2.title;

      app.router.goErr(message, title);
    }
  }, {
    key: 'error',
    value: function error(message, _ref3) {
      var title = _ref3.title;
      alert(app.utils.message2String(message));
    }
  }, {
    key: 'notice',
    value: function notice(content, options) {
      alert(app.utils.message2String(content));
    }
  }, {
    key: 'mask',
    value: function mask(show, options) {}
  }, {
    key: 'loading',
    value: function loading(show, options) {}
  }, {
    key: 'renderApp',
    value: function renderApp() {
      if (this.stopForRenderError) return;

      this.domWaiting = this.domRoot.querySelector('*');
      if (!this.domWaiting) {
        this.domWaiting = document.createElement('div');
        this.domWaiting.setAttribute('style', 'text-align: center: margin-top: 48px;');
        this.domWaiting.innerText = '...';
      }
      _reactDom2.default.render(this.component, this.domRoot);
    }
  }, {
    key: 'limitWidth',
    value: function limitWidth(width) {
      this.domRoot.style.maxWidth = width ? width + 'px' : 'initial';
      this.domRoot.style.marginLeft = width ? 'auto' : 'unset';
      this.domRoot.style.marginRight = width ? 'auto' : 'unset';
    }
  }, {
    key: 'domRoot',
    get: function get() {
      return document.querySelector(this.app.options.rootId || '#root');
    }
  }]);
  return Render;
}();

exports.default = Render;
module.exports = exports['default'];