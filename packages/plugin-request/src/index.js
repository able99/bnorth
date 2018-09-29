let getClass = (app, aoptions={})=>class Request extends app.State {
  constructor(app, options={}) {
    super(app, options);
    options._initialization = options.initialization;
    options.initialization = {};
    this.fetched = false;
    
    app.event.on(this._id, 'onStateStart', (page)=>{this.options.fetchOnStart&&this.fetch()}, this._id);
    app.event.on(this._id, 'onStateActive', (page, onStart)=>{this.options.fetchOnActive&&(!onStart)&&this.fetch()}, this._id);
  }

  _requestFetching(fetching, {loading, mask, noNotice, noLoadingMask, isSubmit}) {
    loading && this.app.render.loading(fetching);
    mask && this.app.render.mask(fetching);
    (!loading&&!mask) && !noLoadingMask && (!isSubmit?this.app.render.loading(fetching):this.app.render.mask(fetching));

    if(isSubmit) return;
    // console.log(1111, this.dataExt(true))
    // super.update({fetching: fetching}, {append: true},true);
    // console.log(2222, this.dataExt(true))
    let a = this.dataExt(true);
    console.log(11111111,a);
    a.fetching=fetching;
    this.app.context.set(this._id, a);
    a = this.dataExt(true);
    console.log(2222222,a);
  }

  _requestSuccess(result, {append, isSubmit}){
    this.fetched = true;

    if(isSubmit) return;
    super.update(
      { fetching: false, ...result, }, 
      { append: typeof(append)==='string'?(`.data[${append}]`):(append?'.data':append), }, 
      this.dataExt(true),
    );
  };

  _requestError(error, {isSubmit}) {
    this.app.render.error(error);
    if(isSubmit) return;
    super.update({fetching: false, error});
  }

  _requestWork(options={}) {
    if(options.once&&this.fetched) { this.app.log.info('plugin once'); return }
    let fetch = options.request||aoptions.request;
    if(!fetch) throw new Error('plugin request error: no request');

    this._requestFetching(true, options);

    return fetch(options, this)
      .then(result=>{
        this._requestFetching(false, options);
        if(!result) return;

        if(options.onSuccess&&options.onSuccess(result.data, result, options)) return;
        /*let ret =*/ this.app.event.emitSync(this, 'onStateWillUpdate', result.data, result, options);
        // if(ret) result = ret;
        // if(ret===false) return;
  
        this._requestSuccess(result, options);
        this.app.event.emitSync(this, 'onStateDidUpdate', result.data, result, options);
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

  update(data, onlyData=true) {
    return super.update(onlyData?{data}:data);
  }

  data() {
    let data = super.data();
    return (!data.error && data.data)?data.data:(this.options._initialization!==undefined?this.options._initialization:{});
  }

  dataExt(force) {
    if(force||this.options.trackState) return super.data();
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

