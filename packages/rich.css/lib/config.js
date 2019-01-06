"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 颜色的名称与颜色值键值对
 * @typedef GenConfigColor
 * @type {object}
 * @property {string} xxx
 * @example
 * ```js
 * textColors: {
 *   normal: '#383838',
 * },
 * ```
 */

/**
 * 键值对集合配置
 * @typedef GenConfigSet
 * @type {object}
 * @property {number} base - 16,
 * @property {number} min - 8,
 * @property {number} minCount - fontSizeMinCalc: 4,
 * @property {number} max - fontSizeMax: 24,
 * @property {number} maxCount - fontSizeMaxCalc: 4,
 * @property {number[]} multiple - 
 * @property {string|boolean} xxx
 * @example
 * ```js
 * ```
 */

/**
 * @typedef GenConfig
 * @type {object}
 * @property {object} body - 设置 body 的默认样式
 * @property {GenConfigColor} textColors - 文字颜色集合
 * @property {GenConfigColor} utilColors - 工具颜色集合
 * @property {GenConfigColor} mainColors - 主色调颜色集合
 * @property {GenConfigColor} opacityColors - 透明颜色集合
 * @property {GenConfigSet} borderWidth - 边框宽度集合
 * @property {GenConfigSet} borderRadius - 边框圆角尺寸集合
 * @property {GenConfigSet} spacing - 空隙尺寸集合
 * @property {GenConfigSet} fontSize - 字体尺寸结合
 * @property {GenConfigSet} fontWeight - 字体粗细度集合
 * @property {GenConfigSet} fontFamilys - 字体粗细度集合
 * @property {GenConfigSet} lineHeight - 行高集合集合
 * @property {GenConfigSet} animationTime - 动画时间集合
 * @property {GenConfigSet} animationCount - 动画次数集合
 * @property {GenConfigSet} animationProperty - 动画属性集合
 * @property {string|number} stateOpacityDisabled - disabled 状态的透明值
 * @property {string|number} stateOpacityActive - active 状态的透明值
 */
// iconFonts: null, 
// iconClassName: 'icon-',

/**
 * class names 生成配置
 * @exportdefault
 * @type {GenConfig}
 */
var genConfig = {
  // base
  // ---------------------
  bodyBackground: 'none',
  stateOpacityDisabled: 0.5,
  stateOpacityActive: 0.8,
  iconFonts: null,
  iconClassName: 'icon-',
  hMapTextSize: {
    '1': 'xxl',
    '2': 'xl',
    '3': 'lg',
    '4': '-',
    '5': 'sm',
    '6': 'xs'
  },
  lineHeight: {
    '-': '1.4',
    ' 0': true,
    ' 1': true,
    '1em': true
  },
  // color
  // -------------------
  textColors: {
    normal: '#383838',
    light: '#959595',
    disable: '#a2a2a2'
  },
  utilColors: {
    component: '#f6f6f6',
    view: '#eff0f4',
    border: '#e2e2e2',
    black: 'plack',
    white: 'white'
  },
  mainColors: {
    success: '#17c729',
    warning: '#faff72',
    alert: '#f72a27',
    notice: '#00baff',
    link: '#00baff',
    primary: '#0074c3'
  },
  opacityColors: {
    transparent: 'transparent',
    translucent: 'rgba(255,255,255,0.3)',
    mask: 'rgba(0,0,0,0.53)',
    overlay: 'rgba(0,0,0,0.3)'
  },
  // direction
  // -------------------
  directionEdge: {
    'a': '',
    'h': ['left', 'right'],
    'v': ['top', 'bottom'],
    'left': true,
    'right': true,
    'top': true,
    'bottom': true
  },
  directionCorner: {
    '': '',
    'top-left': true,
    'top-right': true,
    'bottom-left': true,
    'bottom-right': true
  },
  directionOffset: {
    'left': true,
    'right': true,
    'top': true,
    'bottom': true
  },
  directionOffsetAll: {
    'a': ['left', 'right', 'top', 'bottom'],
    'h': ['left', 'right'],
    'v': ['top', 'bottom'],
    'left': true,
    'right': true,
    'top': true,
    'bottom': true
  },
  directionSize: ['width', 'height', 'min-width', 'min-height', 'max-width', 'max-height'],
  directionAxis: {
    a: '',
    x: true,
    y: true
  },
  // size
  // -------------------
  size: {
    'auto': true,
    'full': '100%',
    'half': '50%',
    ' 0': '0',
    ' 1': 1,
    ' 2': 2,
    '1em': '1em',
    '0em25': '0.25em',
    '0em5': '0.5em',
    '2em0': '2em'
  },
  // position
  // -------------------
  position: {
    '-': 'initial',
    'initial': true,
    'relative': true,
    'absolute': true,
    'fixed': true
  },
  // border
  // -------------------
  borderWidth: [1, 2, 5, 10],
  borderRadius: {
    '-': 5,
    ' 1': 1,
    ' 2': 2,
    ' 5': 5,
    ' 10': 10,
    'rounded': 1000
  },
  borderStyle: {
    '-': 'solid',
    'solid': true,
    'none': true,
    'dotted': true,
    'dashed': true,
    'inherit': true
  },
  // spacing
  // -------------------
  spacing: {
    _base: 10,
    _min: 4,
    _minCount: 3,
    _max: 16,
    _maxCount: 3,
    ' 0': '0',
    ' 1': 1,
    ' 2': 2,
    _multiple: [2, 3, 4]
  },
  // text
  // -------------------
  textFontFamily: {
    'sans-serif': '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    'serif': 'Georgia, "Times New Roman", Times, SimSun, serif',
    'monospace': 'Monaco, Menlo, Consolas, "Courier New"'
  },
  textSize: {
    _base: 16,
    _min: 8,
    _minCount: 4,
    _max: 24,
    _maxCount: 4,
    _multiple: [2, 3, 4]
  },
  textWeight: {
    '-': 'normal',
    'light': '100',
    'bold': '600',
    'bolder': '1000'
  },
  textStyle: {
    '-': 'normal',
    'italic': true,
    'oblique': true,
    'inherit': true
  },
  textDecoration: {
    '-': 'none',
    'underline': true,
    'overline': true,
    'linethrough': 'line-through',
    'blink': true,
    'inherit': true
  },
  textAlign: {
    '-': 'left',
    'left': true,
    'center': true,
    'right': true,
    'justify': true
  },
  textVerticalAligns: {
    '-': 'baseline',
    'baseline': true,
    'sub': true,
    'super': true,
    'top': true,
    'texttop': 'text-top',
    'middle': true,
    'bottom': true,
    'textbottom': 'text-bottom',
    'inherit': true
  },
  textWhiteSpaces: {
    '-': 'normal',
    'normal': true,
    'inherit': true,
    'pre': true,
    'nowrap': true,
    'prewrap': 'pre-wrap',
    'preline': 'pre-line'
  },
  textTruncate: ['1', '2', '3'],
  // flex
  // ----------------
  flexDisplay: {
    'block': 'flex',
    'inline': 'flex-inline'
  },
  flexDirection: {
    'h': 'row',
    'v': 'column',
    'hv': 'row-reverse',
    'vv': 'column-reverse'
  },
  flexJustify: {
    'start': 'flex-start',
    'center': 'center',
    'end': 'flex-end',
    'between': 'space-between',
    'around': 'space-around'
  },
  flexAlign: {
    'start': 'flex-start',
    'center': 'center',
    'end': 'flex-end',
    'baseline': 'baseline',
    'stretch': 'stretch'
  },
  flexWrap: {
    'wrap': 'wrap',
    'nowrap': 'nowrap',
    'reverse': 'reverse'
  },
  flexSubFlex: {
    'auto': true,
    'none': true,
    'extend': '1'
  },
  // display
  // ----------------
  display: {
    'inline': true,
    'inlineblock': 'inline-block',
    'none': true,
    'block': true
  },
  visibility: {
    'show': 'visible',
    'hide': 'hidden'
  },
  opacity: {
    _from: 0,
    _to: 100,
    _step: 10
  },
  overflow: ['hidden', 'scroll', 'auto', 'inherit', 'visible'],
  pointerEvents: ['none', 'all'],
  float: ['left', 'right', 'none'],
  // cursor
  // ----------------
  cursor: {
    '-': 'default',
    'default': true,
    'auto': true,
    'pointer': true,
    'notallowed': 'not-allowed',
    'crosshair': true,
    'text': true,
    'wait': true,
    'help': true,
    'move': true,
    'nresize': 'n-resize',
    'sresize': 's-resize',
    'wresize': 'w-resize',
    'eresize': 'e-resize',
    'neresize': 'ne-resize',
    'nwresize': 'nw-resize',
    'seresize': 'se-resize',
    'swresize': 'sw-resize'
  },
  // animation
  // ----------------
  transitionTime: {
    '-': '.15s'
  },
  animationTime: {
    '500': '500ms',
    '1000': '1000ms',
    '1500': '1500ms',
    '2500': '2500ms',
    '3500': '3500ms'
  },
  animationCount: {
    '1': '1',
    'infinite': 'infinite'
  },
  animationTimingFunction: {
    'ease': true,
    'linear': true,
    'easein': 'ease-in',
    'easeout': 'ease-out',
    'easeinout': 'ease-in-out',
    'cubicbezier': 'cubic-bezier'
  },
  animationDirection: {
    'normal': true,
    'reverse': true,
    'alternate': true,
    'alternatereverse': 'alternate-reverse'
  },
  animationPlayState: {
    'running': true,
    'paused': true
  },
  animationProperty: ['none', 'all', 'transform', 'width', 'height', 'opacity']
};
var _default = genConfig;
exports.default = _default;