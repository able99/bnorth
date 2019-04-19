/**
 * @module
 */


/**
 * 颜色键值对
 * @typedef GenConfigColor
 * @type {object}
 * @property {string} xxx - 颜色的名称键值对
 * @example
 * ```js
 * textColors: {
 *   normal: '#383838',
 * },
 * ```
 */

/**
 * 样式值集合，支持配置生成。
 * 
 * - 不是对象而是数组时，将首先转换为键值都为数组元素的对象在进行下面步骤
 * - 下划线开够为特殊属性，是对应生成函数的参数
 * - 属性值为 true，使用属性名
 * - 属性值为数字时，转为为带单位的字符串
 * - 属性值为字符串时，直接使用
 * 
 * @typedef GenConfigSet
 * @type {object|array}
 * @property {number?} _base - 平分生成函数和倍数生成函数的基数
 * @property {number?} _min - 平分生成函数向下的最小值参数
 * @property {number?} _minCount - 平分生成函数向下的平分个数参数
 * @property {number?} _max - 平分生成函数向上的最小值参数
 * @property {number?} _maxCount - 平分生成函数向上的平分个数参数
 * @property {number[]?} _multiple - 倍数生成函数的因数参数
 * @property {number?} _from - 范围生成函数的起始
 * @property {number?} _to - 范围生成函数的结尾
 * @property {number?} _step - 范围生成函数的步长
 * @property {string} [_unit='px'] - 设置属性值为数字时自动转换的单位
 * @property {string|boolean} xxx - 配置属性
 */

/**
 * @typedef GenConfig
 * @type {object}
 * @property {string} bodyBackground - 设置 body 的背景
 * @property {string|number} stateOpacityDisabled - disabled 状态的透明值
 * @property {string|number} stateOpacityActive - active 状态的透明值
 * @property {GenConfigSet}  hMapTextSize - 标题元素到字体集合的映射
 * @property {GenConfigSet} lineHeight - 行高集合
 * 
 * @property {GenConfigColor} textColors - 文字颜色集合
 * @property {GenConfigColor} utilColors - 工具颜色集合
 * @property {GenConfigColor} mainColors - 主色调颜色集合
 * @property {GenConfigColor} opacityColors - 透明颜色集合
 * 
 * @property {GenConfigSet} directionEdge - 方向常亮集合：四边
 * @property {GenConfigSet} directionCorner - 方向常亮集合：四角
 * @property {GenConfigSet} directionOffset - 方向常亮集合：偏移
 * @property {GenConfigSet} directionOffsetAll - 方向常亮集合：偏移，带全部
 * @property {GenConfigSet} directionSize - 方向常亮集合：尺寸
 * @property {GenConfigSet} directionAxis - 方向常亮集合：数轴方向
 * 
 * @property {object} textFontFamily - 文字字体
 * @property {GenConfigSet} textSize - 字体大小
 * @property {GenConfigSet} textWeight - 字体粗度
 * @property {GenConfigSet} textStyle - 字体样式
 * @property {GenConfigSet} textDecoration - 字体装饰
 * @property {GenConfigSet} textAlign - 文字对齐方式
 * @property {GenConfigSet} textVerticalAligns - 文字垂直对齐方式
 * @property {GenConfigSet} textWhiteSpaces - 元素内空白方式
 * @property {GenConfigSet} textTruncate - 文字截取方式
 * 
 * @property {GenConfigSet} display - 显示方式
 * @property {GenConfigSet} visibility - 可见方式
 * @property {GenConfigSet} opacity - 透明度
 * @property {GenConfigSet} pointerEvents - 事件目标
 * @property {GenConfigSet} float - 浮动类型
 * 
 * @property {GenConfigSet} spacing - 边距集合
 * 
 * @property {GenConfigSet} position - 位置集合
 * 
 * @property {GenConfigSet} size - 尺寸集合
 * 
 * @property {GenConfigSet} flexDisplay - 伸缩盒布局的显示类型
 * @property {GenConfigSet} flexDirection - 定义伸缩盒布局的主轴方向
 * @property {GenConfigSet} flexJustify - 伸缩盒布局的主轴对齐方式
 * @property {GenConfigSet} flexAlign - 伸缩盒布局的侧轴对齐方式
 * @property {GenConfigSet} flexWrap - 伸缩盒布局的新行堆叠的方向
 * @property {GenConfigSet} flexSubFlex - 伸缩盒布局的子元素分配空间方式
 * 
 * @property {GenConfigSet} cursor - 光标样式
 * 
 * @property {GenConfigSet} transitionProperty - 过度动画影像的属性
 * @property {GenConfigSet} transitionTime - 过度动画的时间
 * @property {GenConfigSet} animationTime - 帧动画时间
 * @property {GenConfigSet} animationCount - 帧动画次数
 * @property {GenConfigSet} animationTimingFunction - 帧动画过度类型
 * @property {GenConfigSet} animationDirection - 帧动画循环中的方向
 * @property {GenConfigSet} animationPlayState - 帧动画播放状态
 */


/**
 * 样式表生成配置
 * @exportdefault
 * @type {GenConfig}
 */
let genConfig = {
  // base
  // ---------------------
  bodyBackground: 'none',

  stateOpacityDisabled: 0.5,
  stateOpacityActive: 0.3,

  hMapTextSize: {
    '1': 'xxl',
    '2': 'xl',
    '3': 'lg',
    '4': '-',
    '5': 'sm',
    '6': 'xs',
  },

  lineHeight: {
    '-': '1.4',
    ' 0': true,
    ' 1': true,
    '1em': true,
  },

  // color
  // -------------------
  textColors: {
    normal:    '#383838',
    light:     '#959595',
    disable:   '#a2a2a2',
  },
  utilColors: {
    component: '#f6f6f6',
    view:      '#eff0f4',
    border:    '#e2e2e2',
    black:     'plack',
    white:     'white',
  },
  mainColors: {
    success:   '#17c729',
    warning:   '#faff72',
    alert:     '#f72a27',
    notice:    '#00baff',
    link:      '#00baff',
    primary:   '#0074c3',
  },
  opacityColors: {
    transparent: 'transparent',
    translucent: 'rgba(255,255,255,0.3)',
    mask:        'rgba(0,0,0,0.53)',
    overlay:     'rgba(0,0,0,0.3)',
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
    'bottom': true,
  },

  directionCorner: {
    '':  '',
    'top-left': true,
    'top-right': true,
    'bottom-left': true,
    'bottom-right': true,
  },

  directionOffset: {
    'left': true,
    'right': true,
    'top': true,
    'bottom': true,
  },
  
  directionOffsetAll: {
    'a': ['left', 'right', 'top', 'bottom'],
    'h': ['left', 'right'],
    'v': ['top', 'bottom'],
    'left': true,
    'right': true,
    'top': true,
    'bottom': true,
  },

  directionSize: ['width', 'height', 'min-width', 'min-height', 'max-width', 'max-height'],
  
  directionAxis: {
    a: '',
    x: true,
    y: true,
  },

  // text
  // -------------------
  textFontFamily: {
    'sans-serif':  '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    'serif': 'Georgia, "Times New Roman", Times, SimSun, serif',
    'monospace': 'Monaco, Menlo, Consolas, "Courier New"',
  },

  textSize: {
    _base: 16,
    _min: 8,
    _minCount: 4,
    _max: 24,
    _maxCount: 4,
    _multiple: [2,3,4],
  },

  textWeight: {
    '-': 'normal',
    'light': '100',
    'bold': '600',
    'bolder': '1000',
  },

  textStyle: {
    '-': 'normal',
    'italic': true,
    'oblique': true,
    'inherit': true,
  },
  
  textDecoration: {
    '-': 'none',
    'underline': true,
    'overline': true,
    'linethrough': 'line-through',
    'blink': true,
    'inherit': true,
  },
  
  textAlign: {
    '-': 'left',
    'left': true,
    'center': true,
    'right': true,
    'justify': true,
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
    'inherit': true,
  },
  
  textWhiteSpaces: {
    '-': 'normal',
    'normal': true,
    'inherit': true,
    'pre': true,
    'nowrap': true,
    'prewrap': 'pre-wrap',
    'preline': 'pre-line',
  },

  textTruncate: ['1', '2', '3'],

    // border
  // -------------------
  borderWidth: [1, 2, 5, 10],

  borderStyle: {
    '-': 'solid',
    'solid': true,
    'none': true,
    'dotted': true,
    'dashed': true,
    'inherit': true,
  },

  borderRadius: {
    '-': 5,
    ' 1': 1,
    ' 2': 2,
    ' 5': 5,
    ' 10': 10,
    'rounded': 1000,
  },

  // display
  // ----------------
  display: {
    'inline': true,
    'inlineblock': 'inline-block',
    'none': true,
    'block': true,
  },
  
  visibility: {
    'show': 'visible',
    'hide': 'hidden',
  },

  opacity: {
    _from: 0,
    _to: 100,
    _step: 10,
  },
  
  overflow: ['hidden', 'scroll', 'auto', 'inherit', 'visible'],
  
  pointerEvents: ['none', 'all'],
  
  float: ['left', 'right', 'none'],

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
    _multiple: [2,3,4],
  },

  // position
  // -------------------
  position: {
    '-': 'initial',
    'initial': true,
    'relative': true,
    'absolute': true,
    'fixed': true,
    'sticky': true,
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
    '2em0': '2em',
  },

  // flex
  // ----------------
  flexDisplay: {
    'block':  'flex' ,
    'inline': 'flex-inline',
  },
  
  flexDirection: {
    'h':  'row',
    'v':  'column' ,
    'hv': 'row-reverse',
    'vv': 'column-reverse',
  },
  
  flexJustify: {
    'start':   'flex-start',
    'center':  'center',
    'end':     'flex-end',
    'between': 'space-between',
    'around':  'space-around',
  },
  
  flexAlign: {
    'start':    'flex-start',
    'center':   'center',
    'end':      'flex-end',
    'baseline': 'baseline',
    'stretch':  'stretch',
  },
  
  flexWrap: {
    'wrap': 'wrap',
    'nowrap': 'nowrap',
    'reverse': 'reverse',
  },

  flexSubFlex: {
    'auto': true,
    'none': true,
    'extend': '1',
  },

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
    'swresize': 'sw-resize',
  },


  // animation
  // ----------------
  transitionProperty: ['none', 'all', 'transform', 'width', 'height', 'opacity'],

  transitionTime: {
    '-': '.15s',
    '500': '.5s',
    '1000': '1s',
  },

  animationTime: {
    '500': '500ms',
    '1000': '1000ms',
    '1500': '1500ms',
    '2500': '2500ms',
    '3500': '3500ms',
  },

  animationCount: {
    '1': '1',
    'infinite': 'infinite',
  },

  animationTimingFunction: {
    'ease': true,
    'linear': true,
    'easein': 'ease-in',
    'easeout': 'ease-out',
    'easeinout': 'ease-in-out',
    'cubicbezier': 'cubic-bezier',
  },

  animationDirection: {
    'normal': true,
    'reverse': true,
    'alternate': true,
    'alternatereverse': 'alternate-reverse',
  },
  
  animationPlayState: {
    'running': true,
    'paused': true,
  },
}


export default genConfig;