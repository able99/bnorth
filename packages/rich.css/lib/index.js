"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;
Object.defineProperty(exports, "setCssConfig", {
  enumerable: true,
  get: function get() {
    return _gen.setCssConfig;
  }
});
Object.defineProperty(exports, "getCssConfig", {
  enumerable: true,
  get: function get() {
    return _gen.getCssConfig;
  }
});

var _gen = _interopRequireWildcard(require("./gen"));

var _background = _interopRequireDefault(require("./gens/background"));

var _base = _interopRequireDefault(require("./gens/base"));

var _border = _interopRequireDefault(require("./gens/border"));

var _control = _interopRequireDefault(require("./gens/control"));

var _cursor = _interopRequireDefault(require("./gens/cursor"));

var _display = _interopRequireDefault(require("./gens/display"));

var _flex = _interopRequireDefault(require("./gens/flex"));

var _icon = _interopRequireDefault(require("./gens/icon"));

var _position = _interopRequireDefault(require("./gens/position"));

var _size = _interopRequireDefault(require("./gens/size"));

var _spacing = _interopRequireDefault(require("./gens/spacing"));

var _text = _interopRequireDefault(require("./gens/text"));

function index() {
  (0, _gen.default)('richcss', _base.default, _background.default, _border.default, _text.default, _position.default, _display.default, _flex.default, _spacing.default, _size.default, _cursor.default, _control.default, _icon.default);
}