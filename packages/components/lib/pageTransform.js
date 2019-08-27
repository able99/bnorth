"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageTransform = void 0;

require("core-js/modules/es6.array.find");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

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

          var app = this.props.app;
          var page = app.Page.getPage();
          var status = page && page.status;

          if (status !== 'normal') {
            var deactivePageInfo = this.state.pageInfos.find(function (v) {
              return v.isInactive;
            });
            var deactivePage = deactivePageInfo && app.Page.getPage(deactivePageInfo._id);
            var time = new Date().getTime();
            var finish = false;

            var _run = function _run() {
              if (finish) {
                _this._updateRouterInfo();

                return;
              }

              var diff = new Date().getTime() - time;
              var percent = diff * 100 / 300;

              if (percent >= 100) {
                percent = 100;
                finish = true;
              }

              page.dom.style.webkitTransform = "translate3d(" + (status === 'pushin' ? 100 - percent : percent - 100) + "%, 0, 0)";
              deactivePage && (deactivePage.dom.style.webkitTransform = "translate3d(" + (status === 'pushout' ? 1 : -1) * percent + "%, 0, 0)");
              requestAnimationFrame(_run);
            };

            _run();
          }
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