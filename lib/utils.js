'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = function () {
  function Utils(app, options) {
    (0, _classCallCheck3.default)(this, Utils);

    this._app = app;
  }

  // options
  // ------------------------


  (0, _createClass3.default)(Utils, [{
    key: 'getOptions',
    value: function getOptions() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray3.default)(args.filter(function (v) {
        return v;
      }).map(function (v) {
        return typeof v === 'function' ? v() : v;
      }))));
    }

    // path props
    // ------------------------

  }, {
    key: '_checkPath',
    value: function _checkPath(path) {
      if (path[0] !== '.' && path[0] !== '[') path = '.' + path;
      return path;
    }
  }, {
    key: 'pathSet',
    value: function pathSet(data, path, val) {
      path = this._checkPath(path);if (!path) return false;
      try {
        eval('data' + path + '=val');
      } catch (e) {
        return false;
      }
      return true;
    }
  }, {
    key: 'pathGet',
    value: function pathGet(data, path) {
      path = this._checkPath(path);if (!path) return false;
      try {
        return eval('data' + path);
      } catch (e) {
        return;
      }
    }

    // message
    // -------------------------

  }, {
    key: 'message2String',
    value: function message2String(message) {
      if (message instanceof Error) {
        return message.message;
      } else if ((typeof message === 'undefined' ? 'undefined' : (0, _typeof3.default)(message)) === 'object') {
        return message.message || '';
      } else if (typeof message === 'string') {
        return message;
      } else {
        return String(message);
      }
    }

    // object op
    // --------------------------

  }, {
    key: 'objectCopy',
    value: function objectCopy(obj) {
      if (!obj) return obj;
      return Array.isArray(data) ? [].concat((0, _toConsumableArray3.default)(data)) : (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' ? (0, _extends3.default)({}, data) : data;
    }
  }, {
    key: 'objectUpdate',
    value: function objectUpdate(prevData, data) {
      if (!data) return data;
      return Array.isArray(data) ? [].concat((0, _toConsumableArray3.default)(prevData), (0, _toConsumableArray3.default)(data)) : (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' ? (0, _extends3.default)({}, prevData, data) : data;
    }
  }, {
    key: 'is',
    value: function is(x, y) {
      if (x === y) {
        //排除 +0 == -0
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
  }, {
    key: 'shallowEqual',
    value: function shallowEqual(objA, objB) {
      if (this.is(objA, objB)) {
        return true;
      }

      if ((typeof objA === 'undefined' ? 'undefined' : (0, _typeof3.default)(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : (0, _typeof3.default)(objB)) !== 'object' || objB === null) {
        return false;
      }

      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }

      for (var i = 0; i < keysA.length; i++) {
        if (keysA[i] === 'context') continue;
        if (!hasOwnProperty.call(objB, keysA[i]) || !this.is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }

      return true;
    }

    // string
    // -------------------------

  }, {
    key: 'captilaze',
    value: function captilaze(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }]);
  return Utils;
}();

exports.default = Utils;
module.exports = exports['default'];