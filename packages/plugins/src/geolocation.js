import coordtransform from 'coordtransform'

let geolocation = {
  options: {
    timeout: 10000,
    enableHighAccuracy: true, 
    maximumAge: 30000,        
    watch: 0,
    watchId: undefined,
    error: undefined,

    latitude: 39.92889, 
    longitude:116.38833, 
    accuracy: undefined,
    altitudeAccuracy: undefined,
    heading: undefined,
    speed: undefined,

    silent: false,
    onError: null,
  },

  get location() { return this.options },
  
  getLocation(options) {
    options = { ...this.options, ...options }

    return new Promise((resolve,reject)=>{
      let ready = false;
      setTimeout(()=>{ if(ready) return; reject(this._handleError()); ready = true; }, options.timeout+100)
      navigator.geolocation.getCurrentPosition( 
        position=>{ if(ready) return; resolve(this._handlePostion(position)); ready = true; }, 
        error=>{ if(ready) return; reject(this._handleError(error)); ready = true; },
        options
      ); 
    })
  },

  watchPosition(options, successcb, errorcb) {
    options = { ...this.options, ...options, watch: ++this.options.watch }
    
    return this.options.watchId>=0?this.options.watchId:(this.options.watchId = navigator.geolocation.watchPosition( 
      position=>{ let location = this._handlePostion(position, true); successcb&&successcb(location) }, 
      error=>{ error = this._handleError(error, true); errorcb&&errorcb(error) },
      options
    )); 
  },

  clearWatch(force) {
    --this.options.watch;
    if(this.options.watch<0) this.options.watch = 0;
    if(force||this.options.watch<=0) {
      navigator.geolocation.clearWatch(this.options.watchId);
      this.options.watchId = null;
    }
  },

  _handlePostion(position, isWatch) {
    this.options = {...this.options, ...position.coords, error: false}
    this.options.error = position.coords.false;
    this.options.accuracy = position.coords.accuracy;
    this.options.altitudeAccuracy = position.coords.altitudeAccuracy;
    this.options.heading = position.coords.heading;
    this.options.latitude = position.coords.latitude;
    this.options.longitude = position.coords.longitude;
    this.options.speed = position.coords.speed;
    this.app.event.emit(this._id, 'onPositionChange', this.options, isWatch);
    return this.options;
  },

  _handleError(error, isWatch) {
    this.options.error = error;
    this.options.accuracy = false;
    this.options.altitudeAccuracy = false;
    this.options.onError&&!this.options.silent&&this.options.onError(this.options);
    this.app.event.emit(this._id, 'onPositionError', this.options, isWatch);
    return this.options;
  },
};


export default (app, plugin, options={})=>({
  _id: 'geolocation',

  _onStart(app) {
    app.geolocation = geolocation;
    app.geolocation.app = app;
    app.geolocation._id = plugin._id;
    app.geolocation.options = {...app.geolocation.options, ...options}

    app.geolocation.wgs84togcj02 = coordtransform.wgs84togcj02;
    app.geolocation.gcj02tobd09 = coordtransform.gcj02tobd09;
    app.geolocation.wgs84tobd09 = (lng, lat)=>{
      [lng, lat] = app.geolocation.wgs84togcj02(lng, lat);
      return app.geolocation.gcj02tobd09(lng, lat);
    };
    app.geolocation.bd09togcj02 = coordtransform.bd09togcj02;
    app.geolocation.gcj02towgs84 = coordtransform.gcj02towgs84;
    app.geolocation.bd09towgs84 = (lng, lat)=>{
      [lng, lat] = app.geolocation.bd09togcj02(lng, lat);
      return app.geolocation.wgs84tgcj02towgs84ogcj02(lng, lat);
    };
  },

  _onStop(app) {
    delete app.geolocation;
  },
})