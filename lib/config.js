'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Event = function () {
  function Event(app, options) {
    (0, _classCallCheck3.default)(this, Event);

    this.app = app;
  }

  (0, _createClass3.default)(Event, [{
    key: 'update',
    value: function update() {
      var adata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var app = adata.app,
          update = adata.update,
          get = adata.get,
          set = adata.set,
          data = (0, _objectWithoutProperties3.default)(adata, ['app', 'update', 'get', 'set']);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {

        for (var _iterator = Object.entries(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              k = _step$value[0],
              v = _step$value[1];

          this[k] = Object.assign(this[k] || {}, v);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.app.event.emitMerge('onConfigUpdate', this);
    }
  }, {
    key: 'set',
    value: function set() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments[1];

      var nextData = (0, _extends3.default)({}, this);
      this.app.utils.pathSet(nextData, path, data);
      var app = nextData.app,
          update = nextData.update,
          get = nextData.get,
          set = nextData.set,
          nextDataOmit = (0, _objectWithoutProperties3.default)(nextData, ['app', 'update', 'get', 'set']);

      Object.assign(this, nextDataOmit);
      this.app.event.emitMerge('onConfigUpdate', this);
    }
  }, {
    key: 'get',
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.app.utils.pathGet(this, path);
    }
  }]);
  return Event;
}();

exports.default = Event;
module.exports = exports['default'];