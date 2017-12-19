"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {};

config.browser = {};
config.browser.title = '';
config.browser.favicon = null;

config.networkCache = false;
config.version = "0.1.0";
config.debug = false;
config.verbose = false;
config.onBrowserSimulation = false;
config.onBrowser = Boolean(!window.cordova);
config.onApp = !config.onBrowser || config.onBrowserSimulation;

config.urls = {};
config.urls.base = window.location.protocol + "//" + window.location.hostname + (window.location.port === 80 || window.location.port === 443 || window.location.port === "" ? "" : ":" + window.location.port) + "/";
config.urls.api = "rapi/";

config.paths = {};
config.paths.Home = "/";
config.paths.Login = "/login";
config.paths.Resister = "/resister";
config.paths.ForgetPassword = "/forget-password";
config.paths.ChangePassword = "/change-password";

config.strings = {};
config.strings.networkError = "网络连接错误";

config.images = {};

config.keys = {};
config.keys.user = 'BNorthStorageUserKey';

config.login = {};
config.login.urls = {
  info: 'auth/',
  password: 'auth/',
  verifyCode: 'auth/',
  logout: 'auth/'
};
config.login.logoutMethod = 'POST';
config.login.logoutData = {};
config.login.logoutToLoginOrHome = false;
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

//ui swticher
config.limitWidth = true;
config.hideNavBar = false;

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