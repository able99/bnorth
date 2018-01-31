'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('../utils/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _getOptions = require('../utils/getOptions');

var _getOptions2 = _interopRequireDefault(_getOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var BaseActionState = function () {
  (0, _createClass3.default)(BaseActionState, null, [{
    key: 'getClassName',
    value: function getClassName(claxx) {
      return claxx && (claxx.stateName || claxx.name);
    }
  }, {
    key: 'instance',
    value: function instance(claxx, app, uuid, options) {
      uuid = uuid || (0, _uuid2.default)();
      var className = BaseActionState.getClassName(claxx);

      if (!BaseActionState.maps[className]) BaseActionState.maps[className] = {};
      var instance = BaseActionState.maps[className][uuid] || new claxx(app, uuid, (0, _getOptions2.default)(options));
      instance.className = className;
      BaseActionState.maps[className][uuid] = instance;
      return instance;
    }
  }]);

  function BaseActionState(app, uuid) {
    (0, _classCallCheck3.default)(this, BaseActionState);

    this.name = '';
    this.displayName = '';
    this.app = app;
    this.uuid = uuid;
  }

  (0, _createClass3.default)(BaseActionState, [{
    key: 'trigger',
    value: function trigger(event) {
      var handler = this[event];
      if (!handler) return false;
      var title = 'state event(' + event + '-' + this.className + '-' + this.name + '-' + this.displayName + '):';
      try {
        var _app;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_app = this.app).verbose.apply(_app, [title].concat(args));
        return handler.apply(this, args);
      } catch (e) {
        this.app.error('state handler', e);
        this.app.errorNotice(e);
      }
    }
  }, {
    key: 'state',
    get: function get() {
      return null;
    }
  }, {
    key: 'states',
    get: function get() {
      return null;
    }
  }]);
  return BaseActionState;
}();

BaseActionState.maps = {};
exports.default = BaseActionState;
module.exports = exports['default'];