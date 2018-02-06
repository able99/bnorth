/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React from 'react';


/*!
 * app 的根页面Page
 * 保留了，页面在bnroth 层处理页面的能力，目前实现了对html 中waitting 的管理
 */
export class AppComponentPage extends React.Component{
  render() {
    return <div />;
  }
}


/*!
 * app 的根页面Container craetor
 * 保留了，页面在bnroth 层处理页面的能力，目前实现了页面生命周期映射到 app event 中
 */
export let appComponentContainerCreator = function(app, props, container) {
  container.states._page = app.actionStates.data({initData:{
    layers: [],
    ready: app.options.ready,
  }}), 
  

  container.handlers.onWillStart = ()=>{
    app.trigger('onAppWillStart');
  };
  container.handlers.onStart = ()=>{
    app.trigger('onAppStart');
  };
  container.handlers.onStop = ()=>{
    app.trigger('onAppStop');
  };
  container.handlers.onResume = ()=>{
    app.trigger('onAppResume');
  };
  container.handlers.onPause = ()=>{
    app.trigger('onAppPause');
  };
}
