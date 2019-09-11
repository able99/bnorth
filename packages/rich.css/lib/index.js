"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _gen = _interopRequireDefault(require("./gen"));

var _background = _interopRequireDefault(require("./gens/background"));

var _base = _interopRequireDefault(require("./gens/base"));

var _border = _interopRequireDefault(require("./gens/border"));

var _control = _interopRequireDefault(require("./gens/control"));

var _cursor = _interopRequireDefault(require("./gens/cursor"));

var _display = _interopRequireDefault(require("./gens/display"));

var _flex = _interopRequireDefault(require("./gens/flex"));

var _position = _interopRequireDefault(require("./gens/position"));

var _size = _interopRequireDefault(require("./gens/size"));

var _spacing = _interopRequireDefault(require("./gens/spacing"));

var _text = _interopRequireDefault(require("./gens/text"));

/**
 * @module 
 */

/**
 * 生成全部 css class names
 * 
 * 执行后，将读取 css 配置对象，生成并写入 html header。修改 css 配置，需要在执行该函数前
 * 
 * 一般来说，在生成前，还需要引入标准化 css 文件，如果需要还需要引入自定义 css 文件等
 * @exportdefault
 * @example
 * ```js
 * import '@bnorth/rich.css/css/normalize.css';
 * import './index.css';
 * import genCss from '@bnorth/rich.css';
 * 
 * let app = new App({
 * plugin:{
 *   onAppStarting: async ()=>{genCss()},
 * })
 * app.start();
 * ```
 */
function genCss() {
  (0, _gen.default)('richcss', _base.default, _background.default, _border.default, _text.default, _position.default, _display.default, _flex.default, _spacing.default, _size.default, _cursor.default, _control.default);
}

var _default = genCss;
exports.default = _default;