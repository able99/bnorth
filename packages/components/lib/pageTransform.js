"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.PageTransform = void 0;

require("core-js/modules/es6.array.find");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var PageTransform = {
  _id: 'page_transform',
  _onStart: function _onStart(app) {
    app.router._oldComponent = app.router.Component;

    app.router.Component =
    /*#__PURE__*/
    function (_app$router$Component) {
      (0, _inherits2.default)(_class, _app$router$Component);

      function _class() {
        (0, _classCallCheck2.default)(this, _class);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
      }

      (0, _createClass2.default)(_class, [{
        key: "_pageTransform",
        value: function _pageTransform() {
          var _this = this;

          if (!this._isTransforming()) return;
          var app = this.props.app;
          var page = app.Page.getPage();
          var deactivePageInfo = this.state.pageInfos.find(function (v) {
            return v.isInactive;
          });
          var deactivePage = deactivePageInfo && app.Page.getPage(deactivePageInfo._id);
          var time = new Date().getTime();
          var finish = false;
          this._isPageTransforming = true;

          var _run = function _run() {
            if (finish) {
              _this._isPageTransforming = false;

              _this._updateRouterInfo();

              return;
            }

            var diff = new Date().getTime() - time;
            var percent = diff * 100 / 250;

            if (percent >= 100) {
              percent = 100;
              finish = true;
            }

            if (page && page.dom) page.dom.style.webkitTransform = "translate3d(" + (page.status === 'pushin' ? 100 - percent : percent - 100) + "%, 0, 0)";
            if (deactivePage && deactivePage.dom) deactivePage.dom.style.webkitTransform = "translate3d(" + (deactivePageInfo.status === 'popout' ? 1 : -1) * percent + "%, 0, 0)";
            requestAnimationFrame(_run);
          };

          _run();
        }
      }]);
      return _class;
    }(app.router.Component);
  },
  _onStop: function _onStop(app) {
    app.router.Component = app.router._oldComponent;
    delete app.router._oldComponent;
  }
};
exports.PageTransform = PageTransform;