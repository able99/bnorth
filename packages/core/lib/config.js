"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.object.assign");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Event =
/*#__PURE__*/
function () {
  function Event(app, options) {
    (0, _classCallCheck2.default)(this, Event);
    this.app = app;
  }

  (0, _createClass2.default)(Event, [{
    key: "update",
    value: function update() {
      var adata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var app = adata.app,
          update = adata.update,
          get = adata.get,
          set = adata.set,
          data = (0, _objectWithoutProperties2.default)(adata, ["app", "update", "get", "set"]);

      var _arr = Object.entries(data);

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
            k = _arr$_i[0],
            v = _arr$_i[1];

        this[k] = Object.assign(this[k] || {}, v);
      }

      this.app.event.emitMerge('onConfigUpdate', this);
    }
  }, {
    key: "set",
    value: function set() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 ? arguments[1] : undefined;
      var nextData = (0, _objectSpread2.default)({}, this);
      this.app.utils.pathSet(nextData, path, data);
      var app = nextData.app,
          update = nextData.update,
          get = nextData.get,
          set = nextData.set,
          nextDataOmit = (0, _objectWithoutProperties2.default)(nextData, ["app", "update", "get", "set"]);
      Object.assign(this, nextDataOmit);
      this.app.event.emitMerge('onConfigUpdate', this);
    }
  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.app.utils.pathGet(this, path);
    }
  }]);
  return Event;
}();

exports.default = Event;