import coordtransform from 'coordtransform'

let geolocation = {
  options: {
    timeout: 3000,
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
    
    return this.options.watchId = navigator.geolocation.watchPosition( 
      position=>{ let location = this._handlePostion(position); successcb&&successcb(location) }, 
      error=>{ error = this._handleError(error); errorcb&&errorcb(error) },
      options
    ); 
  },

  clearWatch(_id=this.options.watchId) {
    --this.options.watch;
    if(this.options.watch<0) this.options.watch = 0;
    navigator.geolocation.clearWatch(_id);
  },

  _handlePostion(position) {
    this.options = {...this.options, ...position.coords, error: false}
    return this.options;
  },

  _handleError(error) {
    this.options.error = error;
    this.options.accuracy = false;
    this.options.altitudeAccuracy = false;
    return this.options;
  },
};


export default (app, plugin, options={})=>({
  _id: 'geolocation',

  _onStart(app) {
    app.geolocation = geolocation;
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