"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 颜色的名称与颜色值键值对
 * @typedef GenConfigColor
 * @type {object}
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
 * @property {string|number} base - 16,
 * @property {number} min - 8,
 * @property {number} minCount - fontSizeMinCalc: 4,
 * @property {number} max - fontSizeMax: 24,
 * @property {number} maxCount - fontSizeMaxCalc: 4,
 * @property {(Array.number|string[])} set -
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
  bodyBackground: 'none',
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
  // border
  // -------------------
  borderWidthSizeSet: [1, 2, 5, 10],
  borderRadiusSizeBase: 5,
  borderRadiusSizeSet: [1, 2, 5, 10, ['rounded', 1000]],

  /* spacing */
  spacingSizeBase: 10,
  spacingSizeMin: 4,
  spacingSizeMinCalc: 3,
  spacingSizeMax: 16,
  spacingSizeMaxCalc: 3,
  spacingSizeSet: [0, 1, 2, '2', '3', '4'],

  /* text */
  fontSizeBase: 16,
  fontSizeMin: 8,
  fontSizeMinCalc: 4,
  fontSizeMax: 24,
  fontSizeMaxCalc: 4,
  fontSizeSet: ['2', '3', '4'],
  fontWeightSizeBase: 'normal',
  fontWeightSizeSet: {
    'light': '100',
    'bold': '600',
    'bolder': '1000'
  },
  textTruncateSet: [1, 2, 3, 4],
  fontFamilys: {
    'sans-serif': '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    'serif': 'Georgia, "Times New Roman", Times, SimSun, serif',
    'monospace': 'Monaco, Menlo, Consolas, "Courier New"'
  },
  lineHeightSizeBase: 1.4,
  lineHeightSizeSet: [],

  /* animation */
  animationTimeSizeSet: {
    '500': '500ms',
    '1000': '1000ms',
    '1500': '1500ms',
    '2500': '2500ms',
    '3500': '3500ms'
  },
  animationCountSizeSet: {
    '1': '1',
    'infinite': 'infinite'
  },
  animationPropertySizeSet: ['none', 'all', 'transform', 'width', 'height', 'opacity'],

  /* control */
  stateOpacityDisabled: 0.5,
  stateOpacityActive: 0.8,

  /* icon */
  iconFonts: null,
  iconClassName: 'icon-'
};
var _default = genConfig;
exports.default = _default;