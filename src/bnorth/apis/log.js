let Log = {};

Log.log = function(...args){
  if(window.cordova){
    for(let i=0; i<args.length; i++){
      if(args[i] instanceof Object){
        args[i] = JSON.stringify(args[i]);
      }
    }
  }
  window.console.log(...args);
}
Log.err = function(...args){
  if(window.cordova){
    for(let i=0; i<args.length; i++){
      if(args[i] instanceof Object){
        args[i] = JSON.stringify(args[i]);
      }
    }
  }
  window.console.error(...args);
}

export default Log;
