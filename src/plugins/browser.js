/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import Url from 'url-parse';
import { getBrowserTitle, setBrowserTitle } from '../utils/browser';


/**
 * url 解析类，[参考地址](https://github.com/unshiftio/url-parse)
 * @class Url
 */


/**
 * 提供操作浏览器的功能c
 * @class
 */
class Browser {
  constructor(app) {
    this.app = app;
    this.uaInit();
  };

  //ua
  //------------------------------
  /**
   * @property {string} ua 浏览器的user agent
   */
  get ua() {
    return window.navigator.userAgent;
  }

  /**
   * 在初始化时，计算浏览器类型的函数，包括
   * isMobile, isiOS, isAndroid, isWeChat, isAliPay
   * 可以hook该函数，增加更多的浏览器类型
   * ```js
   * this.isWeChat  = /(?:micromessenger)/.test(ua);
   * ```
   * @method
   */
  uaInit() {
    let ua = this.ua.toLowerCase();
    this.isMobile  = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/.test(ua);
    this.isiOS     = /(?:iphone)/.test(ua);
    this.isAndroid = /(?:android)/.test(ua);
    this.isWeChat  = /(?:micromessenger)/.test(ua);
    this.isAliPay  = /alipayclient/.test(ua);
  }

  //title
  //------------------------------
  /**
   * @property {string} title 设置和读取浏览器标题栏的文字
   */
  get title(){
    return getBrowserTitle();
  };

  set title(str){
    return setBrowserTitle(str);
  };


  //ico
  //------------------------------
  /**
   * @property {string} icon 设置和读取浏览器标题栏的图标
   */
  set icon(url) {
    var ico = document.createElement('link');
    ico.setAttribute("rel", "shortcut icon")
    ico.setAttribute("href", url)
    document.getElementsByTagName("head")[0].appendChild(ico);
  }

  //url
  //------------------------------
  /**
   * 返回当前页面的url 地址
   * @method
   * @return {string} - url 地址
   */
  url(){
    return window.location.href;
  };

  /**
   * 返回解析后的url的类
   * @method
   * @param {string} [url=this.url()] - url 地址，如果为空获取当前地址
   * @return {Url} - url解析类
   */
  parseUrl(url){
    url = url || this.url();
    return Url(url,true);
  };

  /**
   * 将url 对象格式化成url 字符串
   * @method
   * @param {Url|Path|location|string} url - Url解析对象或者bnorth path对象 
   * @param {object} [query=null] - 添加到url中的查询字符串 
   * @returns {string} - url字符串 
   */
  formatUrl(url, query=null){
    if(!url)return "/";
    if(!query && typeof(url)==='string') return url;

    url = (url instanceof Url)?url:Url(typeof(url)==='object'?url.pathname:url,true);
    query = query||{};

    for (let key in query) {
      url.query[key] = query[key];
    }
    
    return url.toString();
  };

  //parser
  //------------------------------
  /**
   * 将query 字符串解析成键值对的对象
   * @method
   * @param {string} query - query 字符串 
   * @return {object} - query 键值对
   */
  queryParse(...args) {
    return Url.qs.parse(...args);
  }

  /**
   * 将包含query 键值对的对象转换为query 字符串
   * @method
   * @param {object} obj - 包含query 键值对的对象 
   * @return {string} - query 字符串
   */
  queryStringify(...args) {
    return Url.qs.stringify(...args);
  }

  //navi
  //------------------------------
  /**
   * 浏览器跳转到指定地址，可返回当前地址
   * @method
   * @param {string|Url|Path|location} url - url地址，可以是字符串，Url 解析类，或者path 解析类，router location类
   * url，path，location 中的query 和 state 也会合并到查询字符串中
   * @param {object} [params=null] - 查询字符串
   */
  push(url,params){
    if(typeof(url)==='object'){
      params = Object.assign({},url.state||{},url.query||{}); // TODO:query state where is it used
      url = url.pathname||'/';
    }

    window.location.href = this.formatUrl(url,params);
  };
  /**
   * 浏览器替换当前地址到指定地址，无法再返回当前地址
   * 参数同push
   * @method
   */
  replace(url,params){
    if(typeof(url)==='object'){
      params = Object.assign({},url.state||{},url.query||{});
      url.pathname = url.pathname||'/';
    }
    
    url = this.formatUrl(url,params);
    window.location.replace(url);
  };
  /**
   * 返回指定到之前数量的之前地址
   * @method
   * @param {number} step=1 - 返回级数
   */
  back(step=1){
    window.history.go(-step);
  };
  /**
   * 重新加载当前页面
   * @param {number} delay - 延时的毫秒数
   */
  reload(delay) {
    window.location.reload();
  }

  //jsload
  //------------------------------
  /**
   * 异步加载js，返回promise
   * @method
   * @param {string} filename - js的文件地址
   * @param {boolean} nocache - 通过添加version，防止缓存
   * @return {Promise} - 异步加载结果
   */
  loadjs(filename, nocache){
    return new Promise((resolve,reject)=>{
      if(!filename){
        reject("js filename error");
      }
      let version = nocache===false?'':(nocache||Math.ceil((new Date()).getTime()/(1000*60)))

      var fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", `${filename}${filename.indexOf('?')?'?':'&'}version=${version}`)
      fileref.onload = ()=>{resolve()};
      fileref.onerror = (error)=>{reject(error)};
      document.getElementsByTagName("head")[0].appendChild(fileref);  
    });
  }
}

/**
 * **plugin** name: browser dependence: none
 * 浏览器相关操作插件
 * @class browserPlugin
 * @property {class} app.Browser - Browser 类
 * @property {Browser} app.browser - Browser 类实例
 */
export default {
  name: 'browser',

  init(app) {
    app.Browser = Browser;
    app.browser = new Browser(app);
  }
}
