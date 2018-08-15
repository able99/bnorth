export default {
  /* body */
  bodyBackground: 'none',

  /* color */
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

  /* border */
  borderWidthSizeSet: [1, 2, 5, 10],
  borderRadiusSizeBase: 5,
  borderRadiusSizeSet: [1, 2, 5, 10, ['rounded', 1000]],

  /* spacing */
  spacingSizeBase: 10,
  spacingSizeMin: 4,
  spacingSizeMinCalc: 3,
  spacingSizeMax: 16,
  spacingSizeMaxCalc: 3,
  spacingSizeSet: [0,1,2,'2','3','4'],

  /* text */
  fontSizeBase: 16,
  fontSizeMin: 8,
  fontSizeMinCalc: 4,
  fontSizeMax: 24,
  fontSizeMaxCalc: 4,
  fontSizeSet: ['2','3','4'],

  fontWeightSizeBase: 'normal',
  fontWeightSizeSet: {
    'light': '100',
    'bold': '600',
    'bolder': '1000',
  },

  textTruncateSet: [1,2,3,4],

  fontFamilys: {
    'sans-serif':  '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "wenquanyi micro hei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    'serif': 'Georgia, "Times New Roman", Times, SimSun, serif',
    'monospace': 'Monaco, Menlo, Consolas, "Courier New"',
  },

  lineHeightSizeBase: 1.4,
  lineHeightSizeSet: [],

  /* animation */
  animationTimeSizeSet: {
    '500': '500ms',
    '1000': '1000ms',
    '1500': '1500ms',
    '2500': '2500ms',
    '3500': '3500ms',
  },

  animationCountSizeSet: {
    '1': '1',
    'infinite': 'infinite',
  },

  animationPropertySizeSet: ['none', 'all', 'transform', 'width', 'height', 'opacity'],

  /* control */
  stateOpacityDisabled: 0.5,
  stateOpacityActive: 0.8,

  /* icon */
  iconFonts: null, 
  iconClassName: 'icon',
}