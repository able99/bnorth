let moment;

export function timeInit() {
  return new Promise((resolve, reject)=>{
    import(/* webpackChunkName: "moment" */ 'moment').then((result)=>{
      moment = result;
      resolve();
    });
  });
}

export function init(func, val, options) {
  timeInit().then(()=>{
    if(options&&options.cb)options.cb(func&&func(val, options));
  })
}

export function time(val, options){
  if(!moment) { init(time, val, options); return val; }
  return moment(val).format(options?options.format:undefined);
}

export function timeFrom(val, options){
  if(!moment) { init(timeFrom, val, options); return val; }
  return options&&options.fromTime?moment(val).from(options.fromTime):moment(val).fromNow();
}