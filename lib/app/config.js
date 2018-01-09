"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * config 是app 的配置类，通过app 的config 属性访问config 的属性，读取或设置其属性
 * @class config
 * @example
 * app.config.xxx
 */
var config = {};

// browser
//-------------------------
/**
 * @property {object} browser - 浏览器相关配置
 */
config.browser = {};
/**
 * @property {string} browser.title - 设置浏览器的标题栏标题
 */
config.browser.title = '';
/**
 * @property {string} browser.favicon - 设置浏览器的标题栏图标
 */
config.browser.favicon = null;

// swticher
//---------------------------------
/**
 * 是否限制页面显示的最大宽度
 * @property {boolean}
 */
config.limitWidth = true;
/**
 * 是否隐藏标题栏
 * @property {boolean}
 */
config.hideNavBar = false;
/**
 * 是否开启网络缓存
 * @property {boolean}
 */
config.networkCache = false;
/**
 * 是否开启debug模式
 * @property {boolean}
 */
config.debug = false;
/**
 * 是否开启冗余模式，开启后bnorth 打印的log信息会更加丰富
 * @property {boolean}
 */
config.verbose = false;

// urls
//----------------------------
/**
 * 配置应用使用的url合集，config阶段，可以增加和修改其中项目
 * @property {object}
 */
config.urls = {};
/**
 * base url
 * @property {string}
 * @default 网页的当前地址
 */
config.urls.base = window.location.protocol + "//" + window.location.hostname + (window.location.port === 80 || window.location.port === 443 || window.location.port === "" ? "" : ":" + window.location.port) + "/";
/**
 * api的地址，network插件访问地址为，base+api+xxx
 * @property {string}
 */
config.urls.api = "rapi/";

// paths
//-------------------------
/**
 * 配置应用使用的访问路径合集，config阶段，可以增加和修改其中项目
 * @property {object}
 */
config.paths = {};
/**
 * 首页地址
 * @property {string}
 */
config.paths.Home = "/";
/**
 * 登录页地址
 * @property {string}
 */
config.paths.Login = "/login";
/**
 * 注册页地址
 * @property {string}
 */
config.paths.Resister = "/resister";
/**
 * 忘记密码页地址
 * @property {string}
 */
config.paths.ForgetPassword = "/forget-password";
/**
 * 修改密码页地址
 * @property {string}
 */
config.paths.ChangePassword = "/change-password";

// strings
//-------------------------------
/**
 * @property {string} locale - 配置多语言，暂未实现
 */
/**
 * @property {object} strings - 配置字符串列表，可在config 阶段增加
 */
config.strings = {};
/**
 * @property {string} strings.networkError="网络连接错误" - 网络连接错误的提示文字
 */
config.strings.networkError = "网络连接错误";

// images
//-------------------------------
/**
 * @property {object} images - 配置图片列表，可在config 阶段增加
 */
config.images = {};

// keys
//-------------------------------
/**
 * @property {object} keys - 配置关键字列表，可在config 阶段增加，比如storage 中的存储名等
 */
config.keys = {};
/**
 * @property {string} user='BNorthStorageUserKey' - localStarage中存储用户信息的key
 */
config.keys.user = 'BNorthStorageUserKey';

// login
// ---------------------
/**
 * 配置登录相关信息
 * @property {object}
 */
config.login = {};
/**
 * 配置用户相关的url
 * ```js
 * {
 *   info: 'auth/',       // 获取用户信息
 *   password: 'auth/',   // 密码登录方式
 *   verifyCode: 'auth/', // 验证码登录方式
 *   logout: 'auth/',     // 登出
 * }
 * ```
 * @property {object}
 */
config.login.urls = {
  info: 'auth/',
  password: 'auth/',
  verifyCode: 'auth/',
  logout: 'auth/'
  /**
   * 登录后跳转到首页或者跳转到之前页面
   * @property {boolean}
   */
};config.login.loginToHomeOrAuto = false;
/**
 * 登出请求的接口方法，POST DELETE等
 * @property {string}
 */
config.login.logoutMethod = 'POST';
/**
 * 登出请求的数据
 * @property {object}
 */
config.login.logoutData = {};
/**
 * 登出后进入登录页还是首页
 * @property {boolean}
 */
config.login.logoutToLoginOrHome = false;
/**
 * 登录页面的配置，包括登录方式以及每个登录方式的输入内容
 * @property {object}
 * @default
 */
config.login.types = [{
  type: 'password',
  title: '密码登录',
  fields: [{
    type: 'userName',
    title: '',
    placeholder: '请输入邮箱或者手机号',
    isPassword: false,
    rule: 'required',
    checkOnInput: false
  }, {
    type: 'password',
    title: '',
    placeholder: '请输入密码',
    isPassword: true,
    rule: 'required',
    checkOnInput: false,
    crypto: 'md5'
  }],
  submit: {
    title: '确认',
    method: null
  }
}, {
  type: 'verifyCode',
  title: '验证码登录',
  fields: [{
    type: 'phoneNo',
    title: '',
    placeholder: '请输入邮箱或者手机号',
    isPassword: false,
    rule: 'required',
    checkOnInput: false
  }, {
    type: 'verifyCode',
    title: '',
    placeholder: '请输入验证码',
    isPassword: false,
    rule: 'number',
    checkOnInput: true,
    verify: {
      title: '获取验证码',
      index: 0,
      method: null,
      countdown: 0
    }
  }],
  submit: {
    title: '确认',
    method: null
  }
}];

/**
 * theme
 */
// theme
config.themes = {};
config.themes.normal = 'normal';
config.themes.light = 'light';
config.themes.disabled = 'disable';
config.themes.cnormal = 'cnormal';
config.themes.clight = 'clight';
config.themes.cdisabled = 'cdisable';
config.themes.component = 'component';
config.themes.border = 'border';
config.themes.view = 'view';
config.themes.alert = 'alert';
config.themes.pblack = 'pblack';
config.themes.pwhite = 'pwhite';
config.themes.mask = 'mask';
config.themes.overlay = 'overlay';

// icons
config.iconFonts = [];
config.iconNames = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
  leftNav: 'left-nav',
  rightNav: 'right-nav',
  upNav: 'up-nav',
  downNav: 'down-nav',
  check: 'check',
  close: 'close',
  backTop: 'up'
};
config.iconCodes = {
  'back': "\uE80A",
  'bars': "\uE80E",
  'caret': "\uE80F",
  'check': "\uE810",
  'close': "\uE811",
  'code': "\uE812",
  'compose': "\uE813",
  'download': "\uE815",
  'edit': "\uE829",
  'forward': "\uE82A",
  'gear': "\uE821",
  'home': "\uE82B",
  'info': "\uE82C",
  'list': "\uE823",
  'more-vertical': "\uE82E",
  'more': "\uE82F",
  'pages': "\uE824",
  'pause': "\uE830",
  'person': "\uE832",
  'play': "\uE816",
  'plus': "\uE817",
  'refresh': "\uE825",
  'search': "\uE819",
  'share': "\uE81A",
  'sound': "\uE827",
  'sound2': "\uE828",
  'sound3': "\uE80B",
  'sound4': "\uE80C",
  'star-filled': "\uE81B",
  'star': "\uE81C",
  'stop': "\uE81D",
  'trash': "\uE81E",
  'up-nav': "\uE81F",
  'up': "\uE80D",
  'right-nav': "\uE818",
  'right': "\uE826",
  'down-nav': "\uE814",
  'down': "\uE820",
  'left-nav': "\uE82D",
  'left': "\uE822"
};

exports.default = config;
module.exports = exports["default"];