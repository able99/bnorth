import axios from 'axios';


class Network {
  constructor(app, options={}) {
    this.app = app;
    this.options = {...Network.Options, ...options};
  }

  fetch(options={}, isFetch=true, cancelTokenCB){
    app = this.app;
    options = this.app.utils.getOptions(this.options, options);

    return axios({
      url: options.apiUrl + options.url,
      baseURL: options.baseUrl,
      method: options.getRequestMethod(app, isFetch),
      headers: { ...options.getRequestHeaders(app, isFetch), "Content-Type":options.getRequestContentType(app, isFetch) },
      params: options.getRequestParams(app, isFetch),
      timeout: options.timeout,
      responseType: options.responseType,
      data: options.getRequestData(app, isFetch),
      cancelToken: cancelTokenCB?new CancelToken(cancel=>cancelTokenCB(cancel)):undefined,
      ...(options.options||{})
    })
    .then(result=>{
      result = options.getResponseData(app, isFetch, result);
      return options.handleResponse(app, isFetch, result);
    },error=>{
      return error.response?options.handleStatusError(app, isFetch, error):options.handleError(app, isFetch, error);
    })
  }
}


Network.Options = {
  baseUrl: window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/",
  apiUrl: '',
  url: '',
  // timeout: 1000*60,
  // responseType: '',


  handleStatusError(app, isFetch, data) {
    switch(data&&data.response&&data.response.status){
      case 401:
        this.app.user&&this.app.user.toLogin(null, true);
        return Promise.reject();
      default:
        return Promise.reject(data);
    }
  },

  handleError(app, isFetch, data) {
    return Promise.reject(data);
  },

  handleResponse(app, isFetch, data) {
    return data;
  },

  
  getRequestHeaders(app, isFetch, data) {
    return this.headers||{};
  },

  getRequestParams(app, isFetch, data) {
    return this.params||{};
  },

  getRequestContentType(app, isFetch, data){
    return this.contentType;
  },

  getRequestMethod(app, isFetch, data) {
    return this.method||(isFetch?'GET':'POST');
  },

  getRequestData(app, isFetch, data) {
    return (typeof this.data==='function'?this.data():this.data)||{};
  },

  
  getResponseData(app, isFetch, data){
    return data;
  },
}


export default {
  _id: 'network',

  onPluginMount: (app,plugin,options)=>{
    app.Network = Network;
    app.network = new Network(app, options);
  },

  onPluginUnmount: app=>{
    delete app.Network;
    delete app.network;
  },
}