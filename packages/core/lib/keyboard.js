"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

/**
 * @module
 */

/**
 * 键盘按下
 * @event module:keyboard.Keyboard#keydown
 * @property {event} - 键盘事件
 */

/**
 * 键盘产生可见字符
 * @event module:keyboard.Keyboard#keypress
 * @property {event} - 键盘事件
 */

/**
 * 键盘抬起
 * @event module:keyboard.Keyboard#keyup
 * @property {event} - 键盘事件
 */

/**
 * App 键盘事件管理模块，统一管理键盘事件
 * @exportdefault
 */
var Keyboard =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Keyboard(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Keyboard);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.keyboard';
    this._listeners = [];

    this._handleKeyEventWork = function (e) {
      return _this._handleKeyEvent(e);
    };

    document.addEventListener('keydown', this._handleKeyEventWork);
    document.addEventListener('keypress', this._handleKeyEventWork);
    document.addEventListener('keyup', this._handleKeyEventWork);
  }

  (0, _createClass2.default)(Keyboard, [{
    key: "_handleKeyEvent",
    value: function _handleKeyEvent(e) {
      this.app.event.emit(this.app._id, 'onKeyEvent', e);
      var poplayerInfos = this.app.router.getPoplayerInfos();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)((0, _toConsumableArray2.default)(poplayerInfos.filter(function (v) {
          return v.options.isModal && !v.options._idPage;
        })).reverse()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var poplayerInfo = _step.value;
          var poplayer = this.app.Poplayer.getPoplayer(poplayerInfo._id);
          if (!poplayer) continue;

          if (poplayer._onKeyEvent && poplayer._onKeyEvent(e)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
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

      var page = this.app.Page.getPage();
      if (!page) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator2.default)((0, _toConsumableArray2.default)(poplayerInfos.filter(function (v) {
          return v.options.isModal && v.options._idPage === page._id;
        })).reverse()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _poplayerInfo = _step2.value;

          var _poplayer = this.app.Poplayer.getPoplayer(_poplayerInfo.options._id);

          if (!_poplayer) continue;

          if (_poplayer._onKeyEvent && _poplayer._onKeyEvent(e)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (page._onKeyEvent && page._onKeyEvent(e)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
  }]);
  return Keyboard;
}();

var _default = Keyboard;
exports.default = _default;