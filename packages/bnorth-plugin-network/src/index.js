import axios from 'axios';


function getOption(value, defaultValue, ...args) {
  let ret = typeof(value)==='function'?value(...args):value;
  return ret||defaultValue;
}


export default class Network {
  // plugin 
  // --------------------------------
  static pluginName = 'network';
  static pluginDependence = [];
  static onPluginMount(app) {
    app.Network = Network;
    app.network = new Network(app);
  }
  static onPluginUnmount(app) {
    delete app.Network;
    delete app.network;
  }
  

  // main
  // --------------------------------
  constructor(app) {
    this.app = app;
    this.baseUrl = window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/";
    this.apiUrl = '';
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
  _handleStatusError(error,isFetch,options) {
    switch(error&&error.response&&error.response.status){
      case 401:
        this.app.user&&this.app.user.toLogin(null, true);
        return Promise.reject();
      default:
        return Promise.reject(error);
    }
  }

  /**
   * 处理请求异常
   * @method
   * @param {string|Error} error - 异常信息
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @param {NetworkOptions} options - 请求参数
   * @param {object} config - axios 本次请求的实例 
   */
  _handleError(error, isFetch, options) {
    return Promise.reject(error);
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
    return this.contentType;
  }

  /**
   * 返回请求方法
   * @method 
   * @param {NetworkOptions} options - 请求参数
   * @param {boolean} isFetch - 是获取请求还是操作请求
   * @return {string} - 请求方法
   */
  _getRequestMethod(options, isFetch) {
    return options.method||(isFetch?'GET':'POST');
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
  fetch(options={}, isFetch=true, cancelTokenCB){
    return axios({
      url: options.apiUrl||this.apiUrl + getOption(options.url, '', options, isFetch),
      baseURL: options.baseUrl||this.baseUrl,
      method: this._getRequestMethod(options,isFetch),
      headers: {
        ...this._getRequestHeaders(options, isFetch),
        ...getOption(options.headers, {}, options, isFetch),
        "Content-Type":this._getRequestContentType(options, isFetch),
      },
      params: { 
        ...this._getRequestParams(options, isFetch),
        ...getOption(options.params, {}, options, isFetch)
      },
      timeout: options.timeout||this.app.config.timeout,
      responseType: options.responseType||this.app.config.responseType,
      data: this._getRequestData(options, isFetch),
      cancelToken: cancelTokenCB?new CancelToken(cancel=>cancelTokenCB(cancel)):undefined,
      ...getOption(options.options, {}, options, isFetch)
    })
    .then(result=>{
      let ret = this._getResultData(result, isFetch, options, result);
      ret = this._handleResult(ret, isFetch, options, result);
      return ret;
    },error=>{
      if(error.response){
        return this._handleStatusError(error, isFetch, options);
      }else {
        return this._handleError(error, isFetch, options);
      }
    })
  }
}

