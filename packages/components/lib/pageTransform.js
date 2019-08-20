"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageTransform = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var PageTransform = {
  _id: 'page_transform',
  onPluginMount: function onPluginMount(app) {
    app.router._RouterComponent =
    /*#__PURE__*/
    function (_app$router$_RouterCo) {
      (0, _inherits2.default)(_class, _app$router$_RouterCo);

      function _class() {
        (0, _classCallCheck2.default)(this, _class);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
      }

      (0, _createClass2.default)(_class, [{
        key: "_pageTrans",
        value: function _pageTrans() {
          var app = this.props.app;
          var router = app.router;
          if (!router._transStatus) return;
          var activeEl = document.querySelector('main[data-page="' + router._activeId + '"]');
          var deactiveEl = document.querySelector('main[data-page="' + router._deactiveId + '"]');
          Array.from(document.querySelectorAll('main')).filter(function (v) {
            return !v.getAttribute('data-page-sub');
          }).forEach(function (v) {
            var id = v.getAttribute('data-page');

            if (id === router._activeId) {
              v.style.webkitTransform = "translateX(" + (router._transStatus === 'push' ? 100 : -100) + "%)";
              v.style.display = 'block';
            } else if (id === router._deactiveId) {
              v.style.webkitTransform = "translateX(" + 0 + "%)";
              v.style.display = 'block';
            } else {
              v.style.display = 'none';
            }
          });
          var time = new Date().getTime();
          var finish = false;

          var _run = function _run() {
            if (finish) {
              deactiveEl && (deactiveEl.style.display = 'none');

              router._updateRouterInfo(router._history.location);

              return;
            }

            var diff = new Date().getTime() - time;
            var percent = diff * 100 / 200;

            if (percent >= 100) {
              percent = 100;
              finish = true;
            }

            activeEl.style.webkitTransform = "translate3d(" + (router._transStatus === 'push' ? 100 - percent : percent - 100) + "%, 0, 0)";
            deactiveEl && (deactiveEl.style.webkitTransform = "translate3d(" + (router._transStatus === 'push' ? -1 : 1) * percent + "%, 0, 0)");
            requestAnimationFrame(_run);
          };

          _run();
        }
      }]);
      return _class;
    }(app.router._RouterComponent);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldError;
    delete app.notice;
  }
};
exports.PageTransform = PageTransform;