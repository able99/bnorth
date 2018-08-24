"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * app 的插件管理器模块
 * @class
 */
var Plugins =
/*#__PURE__*/
function () {
  function Plugins(app) {
    (0, _classCallCheck2.default)(this, Plugins);
    this.app = app;
    this._idNum = 0;
    this._plugins = [];
  }

  (0, _createClass2.default)(Plugins, [{
    key: "_checkPlugin",
    value: function _checkPlugin(plugin) {
      var _this = this;

      if (!plugin) return;
      if (!plugin._id) plugin._id = 'anonymous' + ++this._idNum;
      if (!plugin.dependencies) plugin.dependencies = [];

      if (this._plugins.find(function (v) {
        return v._id === plugin._id;
      })) {
        this.app.render.critical(plugin._id, {
          title: 'plugin dup'
        });
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var dependence = _step.value;

          if (!_this._plugins.find(function (v) {
            return v._id === dependence;
          })) {
            _this.app.render.critical("no dependence plugin: ".concat(plugin._id, " - ").concat(dependence), {
              title: 'plugin nodeps'
            });

            return {
              v: void 0
            };
          }
        };

        for (var _iterator = (Array.isArray(plugin.dependencies) ? plugin.dependencies : [plugin.dependencies])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
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

      return true;
    }
  }, {
    key: "add",
    value: function add(plugin) {
      this.app.log.info('plugin add', plugin && plugin._id);
      if (!this._checkPlugin(plugin)) return;

      this._plugins.push(plugin);

      plugin.onPluginMount && plugin.onPluginMount(this.app);
      this.app.event.emitSync(this.app._id, 'onPluginAdd', plugin);
    }
  }, {
    key: "remove",
    value: function remove(_id) {
      this.app.log.info('plugin remove', _id);

      var index = this._plugins.findIndex(function (v) {
        return v._id === _id;
      });

      if (index < 0) return;
      var plugin = this._plugins[index];
      plugin.onPluginUnmount && plugin.onPluginUnmount(this.app);

      this._plugins.splice(index, 1);

      this.app.event.emitSync(this.app._id, 'onPluginRemove', name);
      this.app.event.off(name);
    }
  }]);
  return Plugins;
}();

exports.default = Plugins;
module.exports = exports["default"];