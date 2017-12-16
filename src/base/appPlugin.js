import React,{cloneElement}  from 'react';
import { render } from 'react-dom';
import { bindActionCreators,combineReducers,createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext } from 'react-router';
import containerHoc from './containerHoc';
import pageHoc from './pageHoc';
import { AppComponentPage, appComponentContainer } from './appComponent';


// app action
//-----------------------------------------
const ActionAppReady = 'ActionAppReady';
function appReady(ready) {
  return {
    type: ActionAppReady,
    ready,
  };
}

const ActionAppLayerAdd = 'ActionAppLayerAdd';
function appLayerAdd(layer, cb) {
  cb&&cb(layer);
  return {
    type: ActionAppLayerAdd,
    layer,
  };
}
const ActionAppLayerRemove = 'ActionAppLayerRemove';
function appLayerRemove(layer) {
  return {
    type: ActionAppLayerRemove,
    layer,
  };
}
const ActionAppLayerUpdate = 'ActionAppLayerUpdate';
function appLayerUpdate(layer, props, cb) {
  let newer = cloneElement(layer, {...layer.props,...props});
  cb&&cb(newer);
  return {
    type: ActionAppLayerUpdate,
    layer,
    newer,
  };
}

let noticeMessage = (...args)=>(app)=>{
  app.trigger('onNoticeMessage', ...args);
}
let noticeLoading = (...args)=>(app)=>{
  app.trigger('onNoticeLoading', ...args);
}
let noticeBlocking = (...args)=>(app)=>{
  app.trigger('onNoticeBlocking', ...args);
}

export function reducerApp(
  state = {
    ready: true,
    layers: [],
  }, 
  action
) {
  switch (action.type) {
    // ready
    case ActionAppReady:
      return Object.assign({}, state, {ready: action.ready});

    // layers
    case ActionAppLayerAdd: {
      return Object.assign({}, state, {layers: [...state.layers, action.layer]});
    }
    case ActionAppLayerRemove: {
      return Object.assign({}, state, {layers: state.layers.filter((v)=>{
        return v!==action.layer;
      })});
    }
    case ActionAppLayerUpdate: {
      return Object.assign({}, state, {layers: state.layers.map((v)=>{
        return v!==action.layer?v:action.newer;
      })});
    }

    //default
    default:
      return state;
  }
}


// funtions
//-----------------------------------------
function createRouteComponent (app, page, container) {
  if(!page) return null;
  page = pageHoc(app, page);
  container = containerHoc(app, container);
  
  return container?container(page):page;
}

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

export let appPluginAfter = {
  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      appReady,
      appLayerAdd,
      appLayerRemove,
      appLayerUpdate,
      noticeMessage,
      noticeLoading,
      noticeBlocking,
    });

    app.reducers.app = reducerApp;
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
}