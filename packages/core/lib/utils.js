"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.object.assign");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Utils =
/*#__PURE__*/
function () {
  function Utils(app, options) {
    (0, _classCallCheck2.default)(this, Utils);
    this.app = app;
  } // options
  // ------------------------


  (0, _createClass2.default)(Utils, [{
    key: "getOptions",
    value: function getOptions() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2.default)(args.filter(function (v) {
        return v;
      }).map(function (v) {
        return typeof v === 'function' ? v() : v;
      }))));
    } // path props
    // ------------------------

  }, {
    key: "_checkPath",
    value: function _checkPath(path) {
      if (path[0] !== '.' && path[0] !== '[') path = '.' + path;
      return path;
    }
  }, {
    key: "pathSet",
    value: function pathSet(data, path, val) {
      path = this._checkPath(path);
      if (!path) return false;
      /* eslint-disable no-eval*/

      try {
        eval("data".concat(path, "=val"));
      } catch (e) {
        return false;
      }

      return true;
    }
  }, {
    key: "pathGet",
    value: function pathGet(data, path) {
      path = this._checkPath(path);
      if (!path) return false;
      /* eslint-disable no-eval*/

      try {
        return eval("data".concat(path));
      } catch (e) {
        return;
      }
    } // message
    // -------------------------

  }, {
    key: "message2String",
    value: function message2String(message) {
      if (message instanceof Error) {
        return message.message;
      } else if ((0, _typeof2.default)(message) === 'object') {
        return message.message || '';
      } else if (typeof message === 'string') {
        return message;
      } else {
        return String(message);
      }
    } // object op
    // --------------------------

  }, {
    key: "objectCopy",
    value: function objectCopy(obj, deep) {
      // :TODO depp copy
      if (!obj) return obj;
      return Array.isArray(obj) ? (0, _toConsumableArray2.default)(obj) : (0, _typeof2.default)(obj) === 'object' ? (0, _objectSpread2.default)({}, obj) : obj;
    }
  }, {
    key: "objectUpdate",
    value: function objectUpdate(obj, data, append) {
      if (Array.isArray(data)) {
        data = (0, _toConsumableArray2.default)(append && obj ? obj : []).concat((0, _toConsumableArray2.default)(data));
      } else if ((0, _typeof2.default)(data) === 'object') {
        if (typeof append === 'string') {
          var appendObj = this.app.utils.pathGet(obj, append);
          var appendData = this.app.utils.pathGet(data, append);
          var appends = this.app.utils.objectUpdate(appendObj, appendData, true);
          data = (0, _objectSpread2.default)({}, obj, data);
          this.app.utils.pathSet(data, append, appends);
        } else if (append === true || append === undefined) {
          data = (0, _objectSpread2.default)({}, obj, data);
        } else {
          data = (0, _objectSpread2.default)({}, data);
        }
      } else {
        data = append ? obj + data : data;
      }

      return data;
    }
  }, {
    key: "objectDelete",
    value: function objectDelete(obj, _id) {
      if (!obj) return;

      if (Array.isArray(obj)) {
        obj.splice(_id, 1);
        obj = (0, _toConsumableArray2.default)(obj);
      } else {
        delete obj[_id];
        obj = (0, _objectSpread2.default)({}, obj);
      }

      return obj;
    } // compare
    // --------------------------

  }, {
    key: "shallowEqual",
    value: function shallowEqual(objA, objB) {
      var checkEqualProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (objA === objB) return true;
      if ((0, _typeof2.default)(objA) !== 'object' || objA === null || (0, _typeof2.default)(objB) !== 'object' || objB === null) return false;
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) return false;

      for (var _i = 0; _i < keysA.length; _i++) {
        var key = keysA[_i];

        if (!objB.hasOwnProperty(key) || (checkEqualProps.includes(key) ? !this.shallowEqual(objA[key], objB[key]) : objA[key] !== objB[key])) {
          // console.log("shallowEqual: ",key);
          return false;
        }
      }

      return true;
    } // string
    // -------------------------

  }, {
    key: "captilaze",
    value: function captilaze(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }]);
  return Utils;
}();

exports.default = Utils;