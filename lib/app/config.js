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

// Path
// =================
/**
 * Path 类是对字符串路径信息的补充信息，配置路径信息的额外属性，比如查询字符串信息，登录要求信息等
 * @class Path
 * @property {!string} path
 * @property {string[]} [params=null] - path-info 配置信息
 * @property {boolean} [absolute=false] - 是否是绝对路径
 * @property {boolean} [extern=false] - 是否是外部地址路径
 * @property {object} [query=null] - query 键值对
 */

// config
// =================
/**
 * config 是app 的配置类，通过app 的config 属性访问config 的属性，读取或设置其属性
 * @class config
 * @example
 * app.config.xxx
 */
var config = {};

// config storage
// -------------------
/*!
 * 获取保存在存贮中的config 配置内容
 * @method
 */
config._getStorage = function () {
  var configStr = window.localStorage.getItem(this.keys.config);
  if (configStr) {
    try {
      return JSON.parse(configStr) || {};
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};

/**
 * 从存储中读取并更新config 的配置
 * @method
 * @return {object} - 返回更新后的config 对象
 */
config.loadStorage = function () {
  var config = this._getStorage();
  return Object.assign(this, config);
};

/**
 * 修改保存在存贮中的config 配置内容
 * @method
 * @param {object} config - 要更新的对象
 * @return {object} - 返回更新后的config 对象
 */
config.saveStorage = function (config) {
  window.localStorage.setItem(this.keys.config, JSON.stringify(config));
  return Object.assign(this, config);
};

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
 * @property {string} urls.base
 * @default 网页的当前地址
 */
config.urls.base = window.location.protocol + "//" + window.location.hostname + (window.location.port === 80 || window.location.port === 443 || window.location.port === "" ? "" : ":" + window.location.port) + "/";
/**
 * api的地址，network插件访问地址为，base+api+xxx
 * @property {string} urls.api
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
 * @property {string} paths.Home
 */
config.paths.Home = "/";
/**
 * 登录页地址
 * @property {string} paths.Login
 */
config.paths.Login = "/login";
/**
 * 注册页地址
 * @property {string} paths.Resister
 */
config.paths.Resister = "/resister";
/**
 * 忘记密码页地址
 * @property {string} paths.ForgetPassword
 */
config.paths.ForgetPassword = "/forget-password";
/**
 * 修改密码页地址
 * @property {string} paths.ChangePassword
 */
config.paths.ChangePassword = "/change-password";

// strings
//-------------------------------
/**
 * 配置多语言，暂未实现
 * @property {string} locale
 */
/**
 * 配置字符串列表，可在config 阶段增加
 * @property {object} strings
 */
config.strings = {};
/**
 * 网络连接错误的提示文字
 * @property {string} strings.networkError
 */
config.strings.networkError = "网络连接错误";

// images
//-------------------------------
/**
 * 配置图片列表，可在config 阶段增加
 * @property {object} images
 */
config.images = {};

// keys
//-------------------------------
/**
 * 配置关键字列表，可在config 阶段增加，比如storage 中的存储名等
 * @property {object} keys
 */
config.keys = {};
/**
 * localStarage中存储用户信息的key
 * @property {string} keys.user
 */
config.keys.user = 'BNorthStorageUserKey';
/**
 * localStarage中存储开启调试模式的key
 * @property {string} keys.config
 */
config.keys.config = 'BNorthStorageConfigKey';

// login
// ---------------------
/**
 * 配置登录相关信息
 * @property {object}
 */
config.login = {};
/**
 * 配置用户相关的url
 * @property {object} login.urls
 */
config.login.urls = {};
/**
 * 获取用户信息的接口地址
 * @property {string} login.urls.info
 */
config.login.urls.info = 'auth';
/**
 * 用户密码登录接口地址
 * @property {string} login.urls.password
 */
config.login.urls.password = 'auth';
/**
 * 用户验证码登录接口地址
 * @property {string} login.urls.verifyCode
 */
config.login.urls.verifyCode = 'auth';
/**
 * 用户注销接口地址
 * @property {string} login.urls.logout
 */
config.login.urls.logout = 'auth';
/**
 * 登录后跳转到首页或者跳转到之前页面
 * @property {boolean} login.loginToHomeOrAuto
 */
config.login.loginToHomeOrAuto = false;
/**
 * 登出请求的接口方法，POST DELETE等
 * @property {string} login.logoutMethod
 */
config.login.logoutMethod = 'POST';
/**
 * 登出请求的数据
 * @property {object} login.logoutData
 */
config.login.logoutData = {};
/**
 * 登出后进入登录页还是首页
 * @property {boolean} login.logoutToLoginOrHome
 */
config.login.logoutToLoginOrHome = false;
/**
 * 登录页面的配置，包括登录方式以及每个登录方式的输入内容
 * 1. types 由数组组成，多个元素对应多个登录方式
 * 1. type 字段唯一索引该登录方式，和对应在login.urls 中的对应url
 * 1. title 字段是登录方式的显示名称
 * 1. submit 字段是确认按钮信息
 *     + title 字段是按钮的显示名称
 *     + methods 字段是自定义登录函数
 * 1. fields 字段是数组，多个元素对应多个输入项目
 *     + type 字段是唯一索引，将对应到提交数据的字段名
 *     + title 字段是显示名称
 *     + placeholder 字段是input 元素的属性
 *     + isPassword 字段表示input 是否选定password 属性
 *     + rule 字段对应actionStateData 的rule 属性
 *     + checkOnInput 字段对应actionStateData 的rule 属性
 * @property {object} login.types
 * @default 默认为密码登录验证码登录
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

exports.default = config;
module.exports = exports["default"];