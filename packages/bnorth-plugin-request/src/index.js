class Request extends app.State {
  constructor(app, options={}) {
    super(app, options);
    this.fetched = false;
    
    app.event.on(this._id, 'onStateStart', (page)=>{this.options.fetchOnStart&&this.fetch()}, this._id);
    app.event.on(this._id, 'onStateActive', (page, onStart)=>{this.options.fetchOnActive&&(!onStart)&&this.fetch()}, this._id);
  }

  _requestFetching(fetching, {loading, mask, noNotice, noLoadingMask}, isFetch) {
    loading && this.app.render.loading(fetching);
    mask && this.app.render.mask(fetching);
    (!loading&&!mask) && !noLoadingMask && (isFetch?this.app.render.loading(fetching):this.app.render.mask(fetching));

    isFetch&&super.update({ 
      fetching: fetching 
    },{
      append: true,
    }, this.dataExt(true));
  }

  _requestSuccess(result, options, isFetch){
    this.fetched = true;
    isFetch&&super.update({ 
      fetching: false,
      ...result,
    }, {
      append: typeof(options.append)==='string'?(`.data[${options.append}]`):(options.append?'.data':options.append),
    }, this.dataExt(true));
  };

  _requestError(error, options, isFetch) {
    isFetch&&super.update({ 
      fetching: false,
      error,
    });

    this.app.render.error(error);
  }

  _request(options={}, isFetch=true) {
    if(options.once&&this.fetched) { this.app.log.info('plugin once'); return}
    if(!this.app.network||!this.app.network.fetch) throw new Error('plugin error: no dependence network');

    this._requestFetching(true, options, isFetch);

    return this.app.network.fetch(options, isFetch)
      .then(result=>{
        this._requestFetching(false, options, isFetch);
        if(!result) return;

        if(options.onSuccess&&options.onSuccess(result.data, result, options, isFetch)) return;
        let ret = this.app.event.emitSync(this, 'onStateWillUpdate', result.data, result, options, isFetch);
        // if(ret) result = ret;
        // if(ret===false) return;
  
        this._requestSuccess(result, options, isFetch);
        this.app.event.emitSync(this, 'onStateDidUpdate', result.data, result, options, isFetch);
        return result;
      })
      .catch(error=>{
        this._requestFetching(false, options, isFetch);
        if(error===null) return;

        if(options.onError&&options.onError(error, options)) return;
        this._requestError(error, options, isFetch);
        this.app.event.emit(this, 'onStateError', error, options, isFetch);
      });    
  }

  fetch(options) {
    return this._request(this.app.utils.getOptions(this.options, options));
  }

  update(data, onlyData=true) {
    return super.update(onlyData?{data}:data);
  }

  data() {
    let data = super.data();
    return (!data.error && data.data)?data.data:(this.options.initialization||{});
  }

  dataExt(force) {
    if(force||this.options.trackState) return super.data();
  }
}


export default app=>{
  return {
    _id: 'request',
    _dependencies: ['network'],

    onPluginMount(app, plugin) {
      app.Request = Request;
      app.request = plugin;
    },

    onPluginUnmount(app, plugin) {
      delete app.Request;
      delete app.request;
    },

    stateRequest: { state: Request },
    request: options=>app.request.stateRequest._request(options, false),
  }
}

