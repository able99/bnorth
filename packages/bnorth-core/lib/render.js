"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var Render =
/*#__PURE__*/
function () {
  function Render(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Render);
    this.app = app;
    this.component = null;
    this.domWaiting = null;
    this.stopForRenderError = false;
    this.app.event.on(this.app, 'onAppStartRender', function () {
      _this.renderApp();
    });
  }

  (0, _createClass2.default)(Render, [{
    key: "critical",
    value: function critical(message) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          title = _ref.title;

      if (this.stopForRenderError) return;
      this.stopForRenderError = true;

      _reactDom.default.render(_react.default.createElement("div", null, _react.default.createElement("h3", null, title ? app.utils.message2String(title) : 'error'), _react.default.createElement("pre", null, app.utils.message2String(message))), this.domRoot);
    }
  }, {
    key: "panic",
    value: function panic(message) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          title = _ref2.title;

      app.router.goErr(message, title);
    }
  }, {
    key: "error",
    value: function error(message) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          title = _ref3.title;

      alert(app.utils.message2String(message));
    }
  }, {
    key: "notice",
    value: function notice(content, options) {
      alert(app.utils.message2String(content));
    }
  }, {
    key: "mask",
    value: function mask(show, options) {}
  }, {
    key: "loading",
    value: function loading(show, options) {}
  }, {
    key: "renderApp",
    value: function renderApp() {
      if (this.stopForRenderError) return;
      this.domWaiting = this.domRoot.querySelector('*');

      if (!this.domWaiting) {
        this.domWaiting = document.createElement('div');
        this.domWaiting.setAttribute('style', 'text-align: center: margin-top: 48px;');
        this.domWaiting.innerText = '...';
      }

      _reactDom.default.render(this.component, this.domRoot);
    }
  }, {
    key: "limitWidth",
    value: function limitWidth(width) {
      this.domRoot.style.maxWidth = width ? "".concat(width, "px") : 'initial';
      this.domRoot.style.marginLeft = width ? 'auto' : 'unset';
      this.domRoot.style.marginRight = width ? 'auto' : 'unset';
    }
  }, {
    key: "domRoot",
    get: function get() {
      return document.querySelector(this.app.options.rootId || '#root');
    }
  }]);
  return Render;
}();

exports.default = Render;
module.exports = exports["default"];