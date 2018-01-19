/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React,{cloneElement}  from 'react';
import { render } from 'react-dom';
import { bindActionCreators,combineReducers,createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext } from 'react-router';
import containerHoc from './containerHoc';
import pageHoc from './pageHoc';
import { AppComponentPage, appComponentContainer } from './appComponent';


/**
 * 应用的基本插件，该插件是第一个添加到应用的插件，实现了应用运行的基本功能
 * **插件** 该类为插件类扩展了App 的能力
 * app.actions.xxx: 若干方法
 * @class pluginApp
 */

// app action
//-----------------------------------------
const ActionAppReady = 'ActionAppReady';
/**
 * 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
 * @method appReady
 * @param {boolean} ready 
 * @example
 * ```js
 * app.actions.appReady(true)
 * ```
 */
let appReady = (ready)=>(app)=>{
  app.getPage(0).props.states._page.setValue('ready',ready);
}

/**
 * 显示通知内容
 * @method
 * @param {element|string} message - 消息框内容
 * @param {object} options - 参数对象，具体由实现onNoticeMessage 事件的插件所决定
 * @example
 * ```js
 * app.actions.noticeMessage(message);
 * ```
 */
let noticeMessage = (...args)=>(app)=>{
  app.trigger('onNoticeMessage', ...args);
}
/**
 * 显示页面加载进度
 * @method
 * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} options - 参数对象，具体由实现onNoticeLoading 事件的插件所决定
 * @example
 * ```js
 * app.actions.noticeLoading(true);
 */
let noticeLoading = (...args)=>(app)=>{
  app.trigger('onNoticeLoading', ...args);
}
/**
 * 显示阻塞操作的加载页面
 * @method 
 * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} options Loader 属性,具体参见 [Loader 组件](../components/Loader.md)
 * * @example
 * ```js
 * app.actions.noticeBlocking(true);
 */
let noticeBlocking = (...args)=>(app)=>{
  app.trigger('onNoticeBlocking', ...args);
}



// funtions
//-----------------------------------------
/**
 * 组合页面组件与页面容器，返回raect router使用的组件
 * @function
 * @param {App} app - App实例
 * @param {page} page - 页面组件
 * @param {container} container - 页面容器
 * @return {element} - 返回经过页面组件与页面容器高阶化后的组件
 * @example
 * ```js
 * createRouteComponent(app, page, container);
 * ```
 */
function createRouteComponent (app, page, container) {
  if(!page) return null;
  page = pageHoc(app, page);
  container = containerHoc(app, container);
  
  return container?container(page):page;
}

/*!
 * @function
 */
function routeProps(route, config, app) {
  if(!route||!route.props) return route;
  if(route.props.onInit) route.props.onInit(app);

  return (function props(route){
    return cloneElement(route,{children:React.Children.map(route.props.children,(v,i)=>{
      let { key } = v;
      let { path, pathname, container, component, components, children, checkLogin, restartOnParamChange, restartOnQueryChange, onEnter, purpose } = v.props;

      // path and path param
      if(path||!key){ path = path===true||!key?'':path; }else{ path = key; }
      let paths = path.split('/');
      let params = paths.filter((v)=>{return v.indexOf(':')===0}).map((v)=>{return v.slice(1)});
      pathname = (pathname||paths[0]||paths[1]||'');

      // navi path
      let pathItem = {path:pathname, params};
      config.paths[pathname.replace(/-/g,'_')] = pathItem;
      if(purpose)config.paths[purpose[0].toUpperCase()+purpose.slice(1)] = pathItem;

      // check login
      if(checkLogin){
        let originOnEnter = onEnter;
        onEnter = function(nextState, replace) {
          if(originOnEnter&&originOnEnter(nextState, replace)) return;

          if(app.user&&app.navigator&&!app.user.isLogin()){
            app.trigger('onNavigatePrevent', nextState);
            replace(typeof(app.config.paths.Login)==='string'?app.config.paths.Login:app.config.paths.Login.path);
          }
        }
      }

      // component
      component = createRouteComponent(app, component, container);

      // components
      if(components){
        Object.keys(components).forEach((v)=>{
          let component = components[v];
          if(component&&typeof(component)==='object'){
            components[v] = createRouteComponent(app, component.component,component.container);
          }
        });
      }

      // restart
      if(restartOnParamChange||restartOnQueryChange){
        const KeysComponent = component;
        component = function (props) {
          let KeysComponentkey = '/'+path;
          if(restartOnParamChange)KeysComponentkey += Object.keys(props.params).filter((v)=>{return params.indexOf(v)>=0}).map((v)=>{return props.params[v]}).join(':')
          if(restartOnQueryChange)KeysComponentkey += JSON.stringify(props.location.query);
          return (<KeysComponent {...props} key={KeysComponentkey} />);
        }
      }

      route = cloneElement(v,{path,onEnter,component,components});
      if(children){ return props(route); }else{ return cloneElement(route); }
    })});
  })(route);
}


// app plugin
//-----------------------------------------
/*!
 * 最先加载的插件
 * @class
 */
export let appPluginBefore = {
  init(app) {
    app.bindActionCreators = function(actions) {
    }

    app.combineReducers = function(reducers) {

    }
    app.dispatch = function(action) {
      if(!action) return;
      app.actionStore.dispatch(action);
    }
    app.getState = function(name, defaultValue) {
      let state = this.actionStore.getState();
      return (name?state[name]:state)||defaultValue;
    }

    app.AppComponentPage = AppComponentPage;
    app.appComponentContainer = appComponentContainer;
    app.pageHoc = pageHoc;
    app.containerHoc = containerHoc
    app.ErrorComponent = function(props) {
      let { title, error } = props;
      return (
        <div className="margin">
          <h3>{title||'error'}</h3>
          <h5>{error instanceof Error?error.message:error}</h5>
        </div>
      );
    }
  }
}

/*!
 * 最加载的插件
 * @class
 */
export let appPluginAfter = {
  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      appReady,
      noticeMessage,
      noticeLoading,
      noticeBlocking,
    });
  },

  onCreateStore(app) {
    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
          return action(app, dispatch, getState, extraArgument);
        }
    
        return next(action);
      };
    }

    const createStoreWithMiddleware = applyMiddleware(createThunkMiddleware(), ...(app.options.middlewares||[]))(createStore);
    app.actionStore = createStoreWithMiddleware(combineReducers( app.reducers), app.options.states);
    app.actions = bindActionCreators(app.actions, app.actionStore.dispatch);
  },

  onRender(app) {
    app.routes = routeProps(app.routes, app.config, app);
    render((
      <Provider store={app.actionStore}>
        <Router 
          history={app.options.history||hashHistory} 
          render={(props)=>{
            app.trigger('onNavigated', props);
            return <RouterContext {...props} />
          }} >
          <Route 
            path="" 
            component={createRouteComponent(app, AppComponentPage, appComponentContainer)}>
            {app.routes}
          </Route>  
          <Route 
            path="*" 
            onEnter={(...args)=>{
              return app.trigger('onErrorNavigator', ...args);
            }}>
          </Route>  
        </Router>
      </Provider>
    ),app.domRoot);
  },

  onErrorNavigator(app, nextState, replace) {
    app.error('app-navigator error:', 'no route-',nextState.location.pathname);
    replace('/');
  },
  onErrorPageRender(app, error, title) {
    title = title||'page render error';
    app.error(error, title);
    setTimeout(()=>app.errorRender(error, title),0);
    return null;
  },
  onRenderMessage(app, error, title) {
    render(<app.ErrorComponent title={title} error={error} />, app.domRoot);
  },
  onLog(app, type, trace, ...args) {
    if(trace)console.trace();
    if(type==='error'){
      console.error(...args);
    }else if(type==='debug'){
      console.debug(...args);
    }else{
      console.log(...args);
    }
  },

  onNavigated(app, location) {
    app.pages.forEach(v=>v.props.container.handlers.onRoute&&v.props.container.handlers.onRoute(location))
  },
}

