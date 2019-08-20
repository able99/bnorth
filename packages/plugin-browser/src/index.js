/**
 * @module
 */
import Url from 'url-parse';


/**
 * 浏览器插件使用的路由声明对象，扩展了默认的路由声明对象
 * @typedef BrowserRouterOptions
 * @extends package:core:router~RouterDefine
 * @type {object}
 * @property {boolean|string} title - string 代表该路由的浏览器标题，false 代表路由不处理标题
 */

/**
 * 浏览器插件参数，扩展了默认的插件参数
 * @typedef PluginOptions
 * @extends package:core:plugin~PluginDefine
 * @type {object}
 * @property {boolean} autoTitle - 是否支持自动设置浏览器标题
 */

/**
 * url 对象
 * @typedef Url
 * @see {@link https://github.com/unshiftio/url-parse} npm package url-parse
 * @type {class}
 */


/**
 * 浏览器操作对象，由插件构造，挂载在 app 上
 */
class Browser {
  constructor(app, _id, options) {
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 所属插件的实例的 id
     * @type {string}
     */
    this._id = _id;
    /**
     * 所属插件的实例的 options
     * @type {module:index~PluginOptions}
     */
    this.options = options;
    this._uaInit();
  };

  /**
   * 浏览器 user agent
   * @type {string}
   */
  get userAgent() {
    return window.navigator.userAgent;
  }

  _uaInit() {
    let ua = this.userAgent.toLowerCase();
    /**
     * 是否运行在移动端
     * @type {boolean}
     */
    this.isMobile  = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
    /**
     * 是否运行在 ios 系统
     * @type {boolean}
     */
    this.isiOS     = /iphone|ipad|ipod/.test(ua);
    /**
     * 是否运行在 android 系统
     * @type {boolean}
     */
    this.isAndroid = /(?:android)/.test(ua);
    /**
     * 是否运行在微信
     * @type {boolean}
     */
    this.isWeChat  = /(?:micromessenger)/.test(ua);
    /**
     * 是否运行在支付宝
     * @type {boolean}
     */
    this.isAliPay  = /alipayclient/.test(ua);
    /**
     * 是否运行在 cordova 应用
     * @type {boolean}
     */
    this.isCordova = /(?:cordova)/.test(ua)||/(?:Crosswalk)/.test(ua);
  }

  /**
   * 读取与设置浏览器标题
   * @type {string}
   */
  get title(){
    return window.top.document.title;
  };

  set title(str){
    window.top.document.title = str;

    if(this.options.titleIframeSrc!==false&&this.isiOS) {
      let iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      iframe.setAttribute('src', this.options.titleIframeSrc);
      let iframeCallback = function() {
        setTimeout(function() {
          iframe.removeEventListener('load', iframeCallback);
          document.body.removeChild(iframe);
        }, 0);
      };
      iframe.addEventListener('load', iframeCallback);
      document.body.appendChild(iframe);
    }
  };

  /**
   * 读取与设置浏览器图标
   * @type {string}
   */
  get icon() {
    let el = document.querySelector('link[rel="shortcut icon"]');
    return el && el.getAttribute('href');
  }

  set icon(url) {
    let el = document.querySelector('link[rel="shortcut icon"]');
    if(el) {
      el.setAttribute('href', url);
    }else {
      let ico = document.createElement('link');
      ico.setAttribute("rel", "shortcut icon");
      ico.setAttribute("href", url);
      document.getElementsByTagName("head")[0].appendChild(ico);
    }
  }

  /**
   * 读取浏览器当前 url
   * @type {boolean}
   * @readonly
   */
  get url(){
    return window.location.href;
  };

  /**
   * 读取浏览器当前地址信息
   * @type {object}
   * @readonly
   */
  get location(){
    return window.location;
  };


  //parser
  //------------------------------

  /**
   * 解析 url 地址
   * @param {string} - url 地址，默认是当前地址
   * @returns {module:index~Url} 返回 url 解析对象
   */
  urlParse(url){
    url = url || this.url;
    return Url(url,true);
  };

  /**
   * 格式化 url 地址
   * @param {string|object|module:index~Url} - url 
   * @param {object} - 查询字符串对象
   * @returns {string} 返回 url 解析对象
   */
  urlFormat(url, query=null){
    if(!url)return "/";
    if(!query && typeof(url)==='string') return url;

    query = typeof(url)==='object' && !(url instanceof Url)?{...url.query,...query}:query;
    url = (url instanceof Url)?url:Url(typeof(url)==='object'?url.pathname:url,true);
    url.query = { ...url.query, ...query };
    
    return url.toString();
  };
  
  /**
   * 解析查询字符串
   * @param  {string} - 查询字符串
   * @returns {object} 查询字符键值对
   */
  queryParse(url) {
    return Url.qs.parse(url);
  }

  /**
   * 字符串化查询字符串键值对
   * @param  {object} - 查询字符串
   * @returns {string} 查询字符键值对
   */
  queryStringify(query) {
    return Url.qs.stringify(query);
  }

  // navi
  //------------------------------
  /**
   * 跳转到地址
   * @param {@param {string|object|module:index~Url} - url } - url 地址 
   * @param {object} - 查询字符串键值对 
   */
  push(url, query){
    window.location.href = this.urlFormat(url,query);
  };
  
  /**
   * 替换地址
   * @param {@param {string|object|module:index~Url} - url } - url 地址 
   * @param {object} - 查询字符串键值对 
   */
  replace(url,query){
    window.location.replace(this.urlFormat(url,query));
  };

  /**
   * 倒退浏览器历史
   * @param {number} - 倒退次数
   */
  back(step=1){
    window.history.go(-step);
  };

  /**
   * 刷新页面
   * @param {number} - 延时毫秒 
   */
  reload(delay) {
    delay?setTimeout(()=>window.location.reload(),delay):window.location.reload();
  }

  /**
   * 推送浏览器状态
   * @param {string} - 地址 
   * @param {object} - 状态对象 
   * @param {string} - 浏览器标题 
   */
  pushState(url, state, title) {
    window.history.pushState(state,title,url)
  }

  /**
   * 替换浏览器状态
   * @param {string} - 地址 
   * @param {object} - 状态对象 
   * @param {string} - 浏览器标题 
   */
  replaceState(url, state, title) {
    window.history.replaceState(state,title,url)
  }

  // cookie
  //------------------------------
  /**
   * 设置 cookie
   * @param {string} 名称 
   * @param {string} 值 
   * @param {number} - 有效期期天数 
   */
  setCookie(cname, cvalue, exdays=7) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*86400000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  }

  /**
   * 获取 cookie 值
   * @param {stirng} - 名称
   * @returns {string} 值 
   */
  getCookie(cname) {
    let ret = '';
    document.cookie.split(';').filter(v=>v&&v.indexOf('=')>=0).forEach(v=>{
      let vs = v.split('=');
      if(vs[0].trim()===cname) ret = vs[1];
    })
    return ret;
  }

  /**
   * 清除 cookie 
   * @param {string} - 需要清除的名，为空全部清除
   */
  clearCookie(name) { 
    if(name){ this.setCookie(name, "", -1); return }
    document.cookie.match(/[^ =;]+(?==)/g).forEach(v=>this.clearCookie(v));
  } 

  //jsload
  //------------------------------
  /**
   * 动态加载 js 文件到 html
   * @param {string} - js 文件名 
   * @param {boolean} - 默认增加随机查询字符串，为 false 关闭机制
   * @returns {promise} js 加载状态
   */
  loadjs(filename, nocache){
    return new Promise((resolve,reject)=>{
      if(!filename) reject("js filename error");
      
      let version = nocache===false?'':(nocache||Math.ceil((new Date()).getTime()/(1000*60)))
      var fileref=document.createElement('script');
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", `${filename}${filename.indexOf('?')?'?':'&'}version=${version}`)
      fileref.onload = ()=>{resolve()};
      fileref.onerror = (error)=>{reject(error)};
      document.getElementsByTagName("head")[0].appendChild(fileref);  
    });
  }
}

/**
 * 为 App 实例增加浏览器模块，提供了浏览器操作功能
 * @plugin 
 * @exportdefault
 */
let browser = (app,options={})=>({
  _id: 'browser',

  onPluginMount(app, plugin) {
    /**
     * 为 App 实例增加浏览器操作类
     * @memberof module:index.browser
     * @type {module:index~Browser}
     * @mount app.Browser
     */
    app.Browser = Browser;

    /**
     * 为 App 实例增加浏览器操作实例
     * @memberof module:index.browser
     * @type {module:index~Browser}
     * @mount app.browser
     */
    app.browser = new Browser(app, plugin._id, options);

    if(options.titleIframeSrc!==false) options.titleIframeSrc = options.titleIframeSrc||'logo.png';
    if(options.defaultTitle) app.browser._defaultTitle = options.defaultTitle;
    if(options.autoTitle) {
      app.event.on(app._id, 'onActivePageChange', _idPage=>{
        if(!app.browser._defaultTitle) app.browser._defaultTitle = app.browser.title;
        let page = app.Page.getPage(_idPage);
        if(page&&page.props.info.title===false) return;
        app.browser.title = (page&&page.info.routeDefine.title)||app.browser._defaultTitle;
      }, app.browser._id);
    }
  },

  onPluginUnmount(app) {
    app.event.off(app.browser._id);
    delete app.Browser;
    delete app.browser;
  },
})


export default browser;
