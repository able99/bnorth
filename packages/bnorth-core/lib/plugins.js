"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

      this.app.log.info('plugin check');
      if (!plugin) return;
      if (plugin instanceof Function) plugin = plugin(this.app);
      plugin._id = '>' + (plugin._id ? plugin._id : 'anonymous' + ++this._idNum);
      if (!plugin._dependencies) plugin._dependencies = [];

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
            return v._id.slice(1) === dependence;
          })) {
            _this.app.render.critical("no dependence plugin: ".concat(plugin._id, " - ").concat(dependence), {
              title: 'plugin nodeps'
            });

            return {
              v: void 0
            };
          }
        };

        for (var _iterator = (Array.isArray(plugin._dependencies) ? plugin._dependencies : [plugin._dependencies])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      return plugin;
    }
  }, {
    key: "get",
    value: function get(name) {
      var _this2 = this;

      return this._plugins.find(function (v) {
        return v._id === '>' + (name || _this2.app._id);
      });
    }
  }, {
    key: "add",
    value: function add(plugin) {
      plugin = this._checkPlugin(plugin);
      if (!plugin) return;
      var app = this.app;
      var _id = plugin._id;
      app.log.info('plugin add', plugin._id);

      this._plugins.push(plugin);

      Object.entries(plugin).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k === 'onPluginAdd' || k === 'onPluginRemove') {
          app.event.on(app._id, k, v, _id);
        } else if (k.startsWith('onPlugin')) {
          app.event.on(_id, k, v, _id);
        } else if (k.startsWith('on')) {
          app.event.on(app._id, k, v, _id);
        } else if (k.startsWith('state')) {
          var _ref3 = v || {},
              _ref3$state = _ref3.state,
              state = _ref3$state === void 0 ? app.State : _ref3$state,
              stateOptions = (0, _objectWithoutProperties2.default)(_ref3, ["state"]);

          var _idState = stateOptions._id || app.State.genStateId(k, _id);

          stateOptions._id = _idState;
          plugin[k] = new state(app, stateOptions);
          app.event.on(_id, 'onPluginMount', function (app) {
            app.event.emit(_idState, 'onStateStart', _idState, false);
          }, _idState);
          app.event.on(_id, 'onPluginUnmount', function (app) {
            app.event.emit(_idState, 'onStateStop', _idState);
          }, _idState);
        }
      });
      app.event.emit(_id, 'onPluginMount', app, plugin);
      app.event.emit(app._id, 'onPluginAdd', plugin);
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
      app.event.emit(plugin._id._id, 'onPluginUnmount', app, plugin);
      this.app.event.off(name);

      this._plugins.splice(index, 1);

      this.app.event.emitSync(this.app._id, 'onPluginRemove', name);
    }
  }]);
  return Plugins;
}();

exports.default = Plugins;
module.exports = exports["default"];