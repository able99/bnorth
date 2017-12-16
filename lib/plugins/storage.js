"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function () {
  function Storage(app, isSession) {
    (0, _classCallCheck3.default)(this, Storage);

    this.storage = isSession ? window.sessionStorage : window.localStorage;
  }

  (0, _createClass3.default)(Storage, [{
    key: "setObj",
    value: function setObj(item, data) {
      this.storage.setItem(item, JSON.stringify(data));
    }
  }, {
    key: "getObj",
    value: function getObj(item, removeFalse) {
      var val = this.storage.getItem(item);
      try {
        var obj = JSON.parse(this.storage.getItem(item));
        if (!removeFalse) return obj;
        for (var key in obj) {
          if (!obj[key]) delete obj[key];
        }
        return obj;
      } catch (e) {
        return val;
      }
    }
  }, {
    key: "set",
    value: function set(item, data) {
      this.storage.setItem(item, data);
    }
  }, {
    key: "get",
    value: function get(item) {
      var val = this.storage.getItem(item);
      return val;
    }
  }, {
    key: "remove",
    value: function remove(item) {
      this.storage.removeItem(item);
    }
  }, {
    key: "clear",
    value: function clear(reg) {
      if (reg) {
        for (var item in this.storage) {
          if (new RegExp(reg).test(item)) {
            this.removeItem(item);
          }
        }
      } else {
        this.storage.clear();
      }
    }
  }]);
  return Storage;
}();

exports.default = {
  init: function init(app) {
    app.Storage = Storage;
    app.storage = new Storage(app);
    app.sessionStorage = new Storage(app, true);
  }
};