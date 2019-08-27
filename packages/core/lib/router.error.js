"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var RouterError = function RouterError(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? 'error' : _props$title,
      message = props.message,
      data = props.data,
      _id = props._id;
  return _react.default.createElement("div", {
    style: {
      padding: 8
    }
  }, _react.default.createElement("h3", null, title), _react.default.createElement("hr", null), _id ? _react.default.createElement("p", null, "id:", _id) : null, _react.default.createElement("p", null, RouterError.app.utils.message2String(message)), data ? _react.default.createElement("p", null, "error data:", JSON.stringify(data)) : null);
};

var _default = RouterError;
exports.default = _default;