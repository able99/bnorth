/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import axios from 'axios';


function getOption(value, defaultValue, ...args) {
  let ret = typeof(value)==='function'?value(...args):value;
  return ret||defaultValue;
}


/**
 * 网络请求参数
 * @class NetworkOptions
 * @property {string|function} [resource=''] - url 地址
 * @property {string} [baseUrl=app.config.network.baseUrl] - url 地址
 * @property {string} [apiUrl=app.config.network.apiUrl] - url 地址
 * @property {object|function} [params] - 请求url 的查询字符串对象
 * @property {object|function} [header] - 请求头
 * @property {string} [contentType='application/json'] - content type
 * @property {string} [method=isFetch?'get':'post'] - http 方法
 * @property {number} [timeout=app.config.networkTimeout] - 请求超时时间
 * @property {boolean} [noAuth=false] - 指示该请求无需登录信息，一般用户登录操作本身
 * @property {string} [responseType='json'] - 设定请求结果解析类型(arraybuffer,blob,document,json,text,stream)
 * @property {function|string|object|ArrayBuffer|FormData|File|Bold} [data] - 请求数据
 * @property {object} [options] - 直接传递给[axios](https://www.npmjs.com/package/axios) 的参数，比如withCredentials，auth，onDownloadProgress，onUploadProgress 等
 */


/**
 * 网络请求
 * @class
 */
class Network {
  constructor(app) {
    this.app = app;
  }

  // event
  // ---------------------------
  /**
   * 处理网络请求状态的错误
   * @method
   * @param {number} status - 网络请求状态码
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   */
  _handleStatusError(status,isFetch,options) {
    switch(status){
      case 401:
      this.app.user&&this.app.user.toLogin(null, true);
        return true;
      default:
        return false;
    }
  }

  /**
   * 处理返回结果
   * 1. 对结果进行编辑，并返回新的结果
   * 1. 抛出异常
   * 1. 跳转后，并返回true，将不再继续处理数据
   * @method
   * @param {*} result - 请求结果
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   */
  _handleResult(result,isFetch,options) {
    return result;
  }

  /**
   * 处理请求异常
   * @method
   * @param {string|Error} error - 异常信息
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   * @param {object} config - axios 本次请求的实例 
   */
  _handleError(error, isFetch, options, config) {

  }

  // format
  // ---------------------------
  /**
   * 返回请求头部对象
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {object} - 请求头部
   */
  _getRequestHeaders(options, isFetch) {
    return {};
  }

  /**
   * 返回请求查询字符串对象
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {object} - 查询字符串对象
   */
  _getRequestParams(options, isFetch) {
    return {};
  }

  /**
   * 返回请求content type
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {string} - content type
   */
  _getRequestContentType(options, isFetch){
    return this.app.config.network.contentType;
  }

  /**
   * 返回请求方法
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {string} - 请求方法
   */
  _getRequestMethod(options, isFetch) {
    return isFetch?'GET':'POST';
  }

  /**
   * 返回请求数据
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {string|object|ArrayBuffer|FormData|File|Bold} - 请求数据
   */
  _getRequestData(options, isFetch) {
    return getOption(options.data, {}, options, isFetch);
  }
  
  /**
   * 格式化请求返回的数据
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {string|object|blob|Arraybuffer} - 返回的数据
   */
  _getResultData(result, isFetch){
    return result;
  }
  

  // fetch
  // ---------------------------
  /**
   * 获取网络数据
   * @method
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {Promise} - 请求返回promise-resolve(返回的数据)-reject(错误信息)
   */
  fetch(options={}, isFetch=true){
    return axios({
      url: options.apiUrl||this.app.config.network.apiUrl + getOption(options.resource, '', options, isFetch),
      baseURL: options.baseUrl||this.app.config.network.baseUrl,
      method: this._getRequestMethod(options,isFetch),
      headers: {
        ...this._getRequestHeaders(options, isFetch),
        ...getOption(options.headers, {}, options, isFetch),
        "Content-Type":this._getRequestContentType(options, isFetch),
      },
      params: Object.assign({}, 
        ...this._getRequestParams(options, isFetch),
        ...getOption(options.params, {}, options, isFetch)
      ),
      timeout: options.timeout||this.app.config.timeout,
      responseType: options.responseType||this.app.config.responseType,
      data: this._getRequestData(options, isFetch),
      ...getOption(options.options, {}, options, isFetch)
    })
    .then(result=>{
      result = this._getResultData(result, isFetch);
      result = this._handleResult(result, isFetch, options);
      return result;
    },error=>{
      if(error.response){
        error = this._handleStatusError(error.response.status, isFetch, error.response, options, error.config);
      }else {
        error = this._handleError(error, isFetch, options, error.config);
      }
      if(error) throw error;
    })
    .then(result=>{
      return result;
    },error=>{
      throw error;
    });
  }
}


/**
 * **plugin** name: network dependence: none
 * 提供网络访问的能力扩展
 * @class networkPlugin
 * @property {class} app.Network - Network 类
 * @property {Network} app.network - Network 类实例
 */
export default {
  name: 'network',

  init(app) {
    app.Network = Network;
    app.network = new Network(app);
  }
}

