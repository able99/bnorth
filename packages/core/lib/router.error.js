"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(props) {
  var app = props.app,
      _props$data = props.data;
  _props$data = _props$data === void 0 ? {} : _props$data;
  var title = _props$data.title,
      message = _props$data.message,
      data = _props$data.data,
      _id = _props$data._id;
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, _react.default.createElement("div", null, _react.default.createElement("big", null, _react.default.createElement("strong", null, "Error")), _react.default.createElement("button", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.refresh();
    }
  }, "[refresh]"), _react.default.createElement("button", {
    style: {
      padding: 4
    },
    onClick: function onClick() {
      return app.router.replaceRoot();
    }
  }, "[home]")), _react.default.createElement("h3", null, title), _react.default.createElement("hr", null), _react.default.createElement("p", null, app.utils.message2String(message)), data ? _react.default.createElement("p", null, "error data:", JSON.stringify(data)) : null, _id ? _react.default.createElement("p", null, "page id:", _id) : null);
};

exports.default = _default;