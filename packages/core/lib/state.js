"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

require("core-js/modules/es6.string.starts-with");

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

/**
 * @module
 */

/**
 * 数据单元的声明对象
 * @typedef StateDefine
 * @type {object}
 * @property {string?} id - 覆盖默认的实例 id 生成规则生成的 id
 * @property {*} [initialization={}] - 指定数据单元中数据的初始值
 * @property {boolean?} removeOnStop - 拥有者生命周期结束时不删除数据单元
 * @property {boolean?} deepCopy - 数据更新时，采用深复制方案，参见 `app.utils.objectUpdate`
 * @property {boolean?} append - 数据更新时，采用的数据追加方案，参见 `app.utils.objectUpdate`
 * @property {function?} onXXX - 注册 app 的事件处理函数
 * @property {function?} onStateXXX - 注册该数据单元的事件处理函数
 * @property {(class|object)?} state - 用于扩展和定制数据单元
 * 
 * - 参数为 class 则使用该继承与 State 的数据单元
 * - 参数为 object，对象中的 constructor 为数据单元类，其他将覆盖数据对象实例，实现定制
 * @property {*?} xxx - 其他存在 options 中的属性
 */

/**
 * 数据单元创建时事件
 * @event module:state.State#onStateStart
 * @property {string} _id - 拥有者 id
 */

/**
 * 数据单元注销时事件
 * @event module:state.State#onStateStop
 * @property {string} _id - 拥有者 id
 */

/**
 * 数据单元数据更新中触发事件，如果事件处理函数返回非假数据，则使用该数据更新数据单元
 * @event module:state.State#onStateUpdating
 * @property {*} nextData - 更新后的数据
 * @property {*} prevData - 更新后的数据
 * @property {*} data - 调用更新函数时的数据
 * @property {object} options - state 的参数
 */

/**
 * 数据单元更新完成时触发事件，参数同 onStateUpdating
 * @event module:state.State#onStateUpdated
 */

/**
 * 数据单元拥有唯一 id，每个数据单元通过 id 对应 context 数据仓库的一个数据块，是对数据的包装，提供读取，更新等操作
 * @see {@link https://able99.github.io/cbnorth/data.html} bnorth 数据流
 * @exportdefault
 */
var State =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(State, null, [{
    key: "getState",
    // states
    // ---------------

    /**
     * 通过 state 的实例 id 获取 state 实例
     * @param {string} - state 实例 id 
     * @returns {module:state.State} state 实例
     */
    value: function getState(_id) {
      return State.states[_id];
    } // state helper
    // ---------------

    /**
     * 创建数据单元
     * @param {module:app.App} - App 的实例 
     * @param {module:state.StateDefine} - 数据单元声明对象 
     * @param {string} - state 在所有者上的属性名
     * @param {string} - state 所有者 id 
     */

  }, {
    key: "createState",
    value: function createState(stateKey) {
      var aoptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ownerId = arguments.length > 2 ? arguments[2] : undefined;
      if (typeof aoptions === 'string') return State.app.State.getState(aoptions);
      if (!stateKey) return;

      var _ref = (0, _isArray.default)(aoptions) ? aoptions : [aoptions, State.app.State],
          _ref2 = (0, _slicedToArray2.default)(_ref, 3),
          options = _ref2[0],
          state = _ref2[1],
          override = _ref2[2];

      ownerId = ownerId || State.app._id;

      var _id = options._id || "*".concat(stateKey, "@").concat(ownerId);

      if (State.states[_id]) {
        State.app.log.error('state _id dup:', _id);

        State.states[_id].destructor();
      }

      return State.states[_id] = (0, _assign.default)(new state(_id, options, ownerId), override);
    }
  }, {
    key: "attachStates",
    value: function attachStates(modulee, options, cb) {
      var _this = this;

      options.forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        modulee[k] = State.app.State.createState(k, v, modulee._id);

        if (!modulee[k]) {
          State.app.render.panic(v, {
            title: 'no state',
            _id: _this._id
          });
          return;
        }

        cb && cb(k, v, modulee[k]);
      });
    }
  }, {
    key: "detachStates",
    value: function detachStates(modulee, options) {
      options.forEach(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return modulee[k] && modulee[k].destructor(typeof v !== 'string');
      });
    }
  }, {
    key: "checkStates",
    value: function checkStates(modulee, context, nextContext, options) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 1),
              k = _step$value[0];

          var key = modulee[k] && modulee[k]._id;
          if (context[key] !== nextContext[key]) return true;
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
    }
  }, {
    key: "getStates",
    value: function getStates(modulee, options) {
      var ret = {};
      options.forEach(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        v = modulee[k];
        if (!v) return;
        ret[k] = v.data();
        var extData = v.extData();
        extData && (ret["".concat(k, "Ext")] = extData);
      });
      return ret;
    } // constructor
    // ---------------

    /**
     * 不用于直接构造，而是通过定义拥有者定义数据单元声明对象，由拥有者通过数据单元构建函数构造
     */

  }]);

  function State(_id) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ownerId = arguments.length > 2 ? arguments[2] : undefined;
    (0, _classCallCheck2.default)(this, State);
    this.app = State.app;
    /**
     * 数据单元的 id
     * @type {string}
     */

    this._id = _id;
    /**
     * 数据单元的声明对象
     * @type {module:state~StateDefine}
     */

    this.options = typeof options === 'function' ? options(State.app, this) : options;
    this.options.ownerId = ownerId;
    if (this.options.initialization === undefined) this.options.initialization = {};
    (0, _entries.default)(this.options).forEach(function (_ref9) {
      var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
          k = _ref10[0],
          v = _ref10[1];

      if (k.startsWith('on')) {
        State.app.event.on(null, k, v, _this2._id);
      } //else{ this[k] = v }

    });
    State.app.event.emit(null, 'onStateStart', this._id);
    this.options._onStart && this.options._onStart();
  }

  (0, _createClass2.default)(State, [{
    key: "destructor",
    value: function destructor(remove) {
      State.app.event.emit(null, 'onStateStop', this._id);
      this.options._onStart && this.options._onStart();
      State.app.event.off(this._id);
      if (this.options.cleanOnStop !== false) this.clear();
      if (remove) delete State.states[this._id];
    } // state work

  }, {
    key: "clear",
    value: function clear() {
      return State.app.context.clear(this._id);
    }
  }, {
    key: "stateData",
    value: function stateData() {
      return State.app.utils.objectCopy(State.app.context.data(this._id, {}));
    }
  }, {
    key: "stateUpdate",
    value: function stateUpdate(data) {
      State.app.context.update(this._id, data);
    }
  }, {
    key: "stateSet",
    value: function stateSet(data) {
      State.app.context.set(this._id, data);
    }
  }, {
    key: "stateDelete",
    value: function stateDelete(did) {
      State.app.context.delete(this._id, did);
    } // data operation interface
    // -------------------

    /**
     * 读取数据单元中的数据
     * @returns {*} 读取的数据
     */

  }, {
    key: "data",
    value: function data() {
      return State.app.utils.objectCopy(this.stateData().data || this.options.initialization, this.options.deepCopy);
    }
    /**
     * 读取数据单元中的扩展数据
     * @returns {*} 读取的数据
     */

  }, {
    key: "extData",
    value: function extData() {}
    /**
     * 以 json path 方式读取数据单元中的数据
     * @param {string} - json path 
     * @returns {*} 读取的数据
     */

  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = this.data();
      return State.app.utils.pathGet(data, path);
    }
    /**
     * 更新数据单元的数据, 异步更新，同时调用2次 update，会导致后面更新覆盖前一次，建议用同步方式调用
     * @async
     * @param {*} - 新数据  
     * @param {object} - 更新参数，其中的 append 用于指定追加方式，参见 app.utils.objectUpdate 中对参数的说明
     * @returns {*} 更新后的数据
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(data, options) {
        var prevData, nextData;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = State.app.utils.getOptions(this.options, options);
                prevData = this.data();
                nextData = State.app.utils.objectUpdate(prevData, data, options.append);
                _context.next = 5;
                return State.app.event.emit(null, 'onStateUpdating', this._id, nextData, prevData, data, options);

              case 5:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 8;
                  break;
                }

                _context.t0 = nextData;

              case 8:
                nextData = _context.t0;
                nextData = this.options._onStateUpdating && this.options._onStateUpdating(nextData, prevData, data, options) || nextData;
                State.app.context.update(this._id, {
                  data: nextData
                });
                State.app.event.emit(null, 'onStateUpdated', this._id, nextData, prevData, data, options);
                this.options._onStateUpdated && this.options._onStateUpdated(nextData, prevData, data, options);
                return _context.abrupt("return", nextData);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * 以 json path 方式设置数据单元中的数据
     * @async
     * @param {string} - json path 
     * @param {*} - 新的数据
     * @param {boolean} - 是否是输入中状态
     * @returns {*} 更新后的数据
     */

  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var path,
            val,
            input,
            data,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
                val = _args2.length > 1 ? _args2[1] : undefined;
                input = _args2.length > 2 ? _args2[2] : undefined;
                data = this.data();

                if (State.app.utils.pathSet(data, path, val)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", false);

              case 6:
                _context2.next = 8;
                return this.update(data, {
                  path: path,
                  input: input
                });

              case 8:
                return _context2.abrupt("return", _context2.sent);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function set() {
        return _set.apply(this, arguments);
      }

      return set;
    }()
    /**
     * 删除数据单元中的数据
     * @param {*} - 删除的参数，参见 app.utils.objectDelete 中对参数的说明
     * @returns {*} 更新后的数据
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_did) {
        var data;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = State.app.utils.objectDelete(this.data(), _did);
                _context3.next = 3;
                return this.update(data, {
                  append: false
                });

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return State;
}();

State.app = void 0;
State.states = {};
var _default = State;
exports.default = _default;