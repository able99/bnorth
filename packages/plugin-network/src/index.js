import axios from 'axios';


class Network {
  constructor(app, _id, options) {
    this.app = app;
    this._id = _id;
    this.options = {...Network.Options, ...options};
  }

  fetch(options, request){
    let app = this.app;
    options = app.utils.getOptions(this.options, options);

    return axios({
      url: options.apiUrl + options.url,
      baseURL: options.baseUrl,
      method: options.getRequestMethod(app),
      headers: { ...options.getRequestHeaders(app), "Content-Type":options.getRequestContentType(app) },
      params: options.getRequestParams(app),
      timeout: options.timeout,
      responseType: options.responseType,
      data: options.getRequestData(app),
      cancelToken: options.getCancelCB&&new axios.CancelToken(cancel=>options.getCancelCB(cancel)),
      ...(options.options||{})
    })
    .then(result=>{
      result = options.getResponseData(app, result);
      return options.handleResponse(app, result);
    },error=>{
      return error.response?options.handleStatusError(app, error):options.handleError(app, error);
    })
  }
}


Network.Options = {
  baseUrl: window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/",
  apiUrl: '',
  url: '',
  // timeout: 1000*60,
  // responseType: '',


  handleStatusError(app, data) {
    switch(data&&data.response&&data.response.status){
      case 401:
        this.app.user&&this.app.user.toLogin(null, true);
        return Promise.reject();
      default:
        return Promise.reject(data);
    }
  },

  handleError(app, data) {
    return Promise.reject(data);
  },

  handleResponse(app, data) {
    return data;
  },

  
  getRequestHeaders(app, data) {
    return this.headers||{};
  },

  getRequestParams(app, data) {
    return this.params||{};
  },

  getRequestContentType(app, data){
    return this.contentType;
  },

  getRequestMethod(app, data) {
    return this.method||(!this.isSubmit?'GET':'POST');
  },

  getRequestData(app, data) {
    return (typeof this.data==='function'?this.data():this.data)||{};
  },

  
  getResponseData(app, data){
    return data;
  },
}


export default (app, options)=>({
  _id: 'network',

  onPluginMount: (app,plugin)=>{
    app.Network = Network;
    app.network = new Network(app, plugin._id, options);
  },

  onPluginUnmount: app=>{
    delete app.Network;
    delete app.network;
  },
})