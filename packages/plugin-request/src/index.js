let getClass = (app, aoptions={})=>class Request extends app.State {
  constructor(app, options={}) {
    super(app, options);
    this.fetched = false;
    
    app.event.on(this._id, 'onStateStart', (page)=>{this.options.fetchOnStart&&this.fetch()}, this._id);
    app.event.on(this._id, 'onStateActive', (page, onStart)=>{this.options.fetchOnActive&&(!onStart)&&this.fetch()}, this._id);
  }

  _requestFetching(fetching, {loading, mask, noNotice, noLoadingMask, isSubmit}) {
    loading && this.app.render.loading(fetching);
    mask && this.app.render.mask(fetching);
    (!loading&&!mask) && !noLoadingMask && (!isSubmit?this.app.render.loading(fetching):this.app.render.mask(fetching));

    if(isSubmit||!fetching) return;
    this.stateUpdate({fetching});
  }

  _requestSuccess(result, {append, isSubmit}){
    this.fetched = true;

    if(isSubmit) return;
    let data = result.data;
    delete result.data;
    result.fetching = false;
    this.stateUpdate(result);
    this.update(data, {append});
  };

  _requestError(error, {isSubmit}) {
    this.app.render.error(error);

    if(isSubmit) return;
    this.stateUpdate({fetching: false, error});
  }

  _requestWork(options={}) {
    if(options.once&&this.fetched) { this.app.log.info('plugin once'); return }
    let fetch = options.request||aoptions.request;
    if(!fetch) throw new Error('plugin request error: no request');
    this._requestFetching(true, options);

    return fetch(options, this)
      .then((result={})=>{
        this._requestFetching(false, options);
        if(options.onSuccess&&options.onSuccess(result.data, result, options)) return;
        this._requestSuccess(result, options);
        return result;
      })
      .catch(error=>{
        this._requestFetching(false, options);
        if(error===null) return;

        if(options.onError&&options.onError(error, options)) return;
        this._requestError(error, options);
        this.app.event.emit(this, 'onStateError', error, options);
      });    
  }

  fetch(options) {
    return this._requestWork(this.app.utils.getOptions(this.options, options));
  }

  submit(options) {
    return this._requestWork(this.app.utils.getOptions(this.options, options, {isSubmit: true}));
  }

  data() {
    let data = super.stateData();
    return (!data.error && data.data)?data.data:(this.options.initialization||{});
  }

  extData() {
    if(this.options.trackState) return super.stateData();
  }
}


export default (app, options)=>{
  let Request = getClass(app, options);

  return {
    _id: 'request',

    onPluginMount(app, plugin) {
      app.Request = Request;
      app.request = plugin;
    },

    onPluginUnmount(app) {
      delete app.Request;
      delete app.request;
    },

    stateRequest: { state: Request },
    request: options=>app.request.stateRequest._request(options, false),
  }
}

