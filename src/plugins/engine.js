// appEventBind(){
    // document.addEventListener("deviceready", ()=>{
    //   document.addEventListener("backbutton", ()=>{
    //     if(!this.componentDidBackKey()){
    //       methods.navigator.back();
    //     }
    //   }, false);

    //   document.addEventListener("pause", ()=>{
    //     this.componentDidPause();
    //   }, false);

    //   document.addEventListener("resume", ()=>{
    //     this.componentDidResume();
    //   }, false);
    // }, false);
    // if(config.onBrowser && config.onBrowserSimulation){
    //   document.addEventListener("keydown", (keyevent)=>{
    //     if(keyevent.keyCode===192){
    //       if(!this.componentDidBackKey()){
    //         methods.navigator.back();
    //       }
    //     }
    //   }, false);
    // }
  // }


  // componentDidBackKey(){
  //   if(this.props.onBackKey && this.props.onBackKey(this)) return;

  //   if(AppComponentPage.didBackKey && AppComponentPage.didBackKey()){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }


  // class Log {
  //   log(...args){
  //     if(window.cordova){
  //       for(let i=0; i<args.length; i++){
  //         if(args[i] instanceof Object){
  //           args[i] = JSON.stringify(args[i]);
  //         }
  //       }
  //     }
  //     window.console.log(...args);
  //   }
  
  //   err(...args){
  //     if(window.cordova){
  //       for(let i=0; i<args.length; i++){
  //         if(args[i] instanceof Object){
  //           args[i] = JSON.stringify(args[i]);
  //         }
  //       }
  //     }
  //     window.console.error(...args);
  //   }
  // }
  
  // export default {
  //   init(app) {
  //     app.Log = Log;
  //     app.log = new Log(app);
  //   }
  // }