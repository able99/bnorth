import { combineReducers } from 'redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import { connect,Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext } from 'react-router';

// action-----------
import { actionsNotice,ReduxerNotice } from './actions/notice';
import { actionsData, ReduxerData, actionsDataWrap } from './actions/data';
import { actionsHttpifFetch, actionsHttpifOperate, ReduxerHttpifFetch, actionsHttpifFetchWrap } from './actions/httpif';

// util---------------
import Format from './utils/format';
import Util from './utils/util';
import Webview from './utils/webview';
import Style from './utils/style';

// api----------------
import User from './apis/user';
import Netif from './apis/netif'; 
import Navigate from './apis/navigate'; 
import Storage from './apis/storage'; 
import Log from './apis/log'; 

// components----------
import Accordion from './components/Accordion';
import Container from './components/Container';
import Grid from './components/Grid';
import Col from './components/Col';
import Group from './components/Group';
import Badge from './components/Badge';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Card from './components/Card';
import Icon from './components/Icon';
import List from './components/List';
import Loader from './components/Loader';
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import TabBar from './components/TabBar';
import Tabs from './components/Tabs';
import View from './components/View';
import Field from './components/Field';
// import OffCanvas from './components/OffCanvas';
// import OffCanvasTrigger from './components/OffCanvasTrigger';
import Pager from './components/Pager';
import ProgressBar from './components/ProgressBar';
import Popover from './components/Popover';
import PopoverTrigger from './components/PopoverTrigger';
import Carousel from './components/Carousel';
import Switch from './components/Switch';
import CheckRadio from './components/CheckRadio';
import Panel from './components/Panel';
import EmbedHtml from './components/EmbedHtml';
import Fab from './components/Fab';
import ComponentConfig from './components/config';
import CSSCore from './components/utils/CSSCore';

//==============================
// config
//==============================
let Config = {};

Config.Url = {};
Config.Url.base = window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/";
Config.Url.api = "rapi/";
Config.Url.auth = "auth/";

Config.Path = {};
Config.Path.Home = "/";
Config.Path.Login = "/login";
Config.Path.Resister = "/resister";
Config.Path.ForgetPassword = "/forget-password";
Config.Path.ChangePassword = "/change-password";

Config.NetCache = false;
Config.Version = "0.1.0";
Config.Debug = false;
Config.OnBrowserDebug = true;
Config.OnBrowser = Boolean(!window.cordova);
Config.OnApp = Config.OnBrowserDebug||Boolean(window.cordova);

Config.Str = {};
Config.Str.netCommonError = "网络连接错误";

Config.Images = {};

Config.Keys = {};
Config.Keys.user = 'BNorthStorageUserKey';

//==============================
// utils
//==============================
let Utils = {
  Format,
  Util,
  Webview,
  Style,
  CSSCore,
}

//==============================
// apis
//==============================
let Apis = {
  User,
  Netif,
  Navigate,
  Storage,
  Log,
}

//==============================
// actions
//==============================
let Actions = {};
let ActionWraps = {};
let ActionStore = null;

function createAppStore(areduxers=null){
  const reduxers = {
    ReduxerHttpifFetch,
    ReduxerData,
    ReduxerNotice,
  };
  const Reduxer = combineReducers(Object.assign(reduxers,areduxers));
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    //createLogger(),
  )(createStore);

  ActionStore = createStoreWithMiddleware(Reduxer);
  Actions = Object.assign(
    actionsHttpifFetch(),
    actionsHttpifOperate(),
    actionsNotice(),
    actionsData(),
  );
  ActionWraps = {
    actionsDataWrap,
    actionsHttpifFetchWrap,
  };
}

//==============
// app data
//==============
const AppData = {
  didBackKey: null,
  routerStatus: null,
  loginBackLoction: null,
}


//=====================
// page container hoc
//=====================
//=====================
// hoc page
const PageHoc = (Wrapper) => class PageHoc extends Wrapper {
  constructor(props) {
    super(props);
    this._focus = false;
  }

  componentWillMount() {
    Actions.actionNoticeDialogClose();

    if(this.props.onWillStart) this.props.onWillStart(this);
    return super.componentWillMount && super.componentWillMount();
  }

  componentDidMount() {
    if(this.props.onStart) this.props.onStart(this);
    if(this.isFocus())this.componentDidResume();
    return super.componentDidMount && super.componentDidMount();
  }

  componentDidUpdate(prevProps) {
    if(this.checkFocusChange()){
      this.isFocus()?this.componentDidResume():this.componentDidPause();
    }

    return super.componentDidUpdate && super.componentDidUpdate();
  }

  componentWillUnmount() {
    this.componentDidPause();

    if(this.props.onStop) this.props.onStop(this);
    return super.componentWillMount && super.componentWillMount();
  }

  componentDidPause() {
    if(this.props.onPause) this.props.onPause(this);
    return super.componentDidPause && super.componentDidPause();
  }

  componentDidResume() {
    AppData.didBackKey = this.componentDidBackKey;

    if(this.props.onResume) this.props.onResume(this);
    return super.componentDidResume && super.componentDidResume();
  }

  componentDidBackKey() {
    if(this.props.onBackKey) this.props.onBackKey();
    return super.componentDidBackKey && super.componentDidBackKey();
  }

  render(){
    let ret;
    try{
      ret = super.render();
    }catch(e){
      Apis.Log.err('page render error:',e);
      return <div>page render error!</div>
    }

    ret = React.cloneElement(
      ret,
      Object.assign(
        {
          'data-title': Wrapper.name, //for debug
          isBlur: !this.isFocus(),
        }, 
        ret.props
      )
    );
    
    if(this.isContainer() && this.props.route.container.indexOf(this.getPageChildPath())>=0){
      return (<div>{ret}{this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children}</div>);
    }else{
      return (<div>{ret}{this.isSubPage()?null:this.props.children}</div>);
    }
  }

  checkFocusChange() {
    let oldFocus = this._focus;
    this._focus = this.isFocus();
    return this._focus !== oldFocus;
  }

  isFocus() {
    if(this.isContainer() && this.props.route.container.indexOf(this.getPageChildPath())>=0){
      return !Boolean(this.props[this.getPageChildPath()] && this.props[this.getPageChildPath()].props.children);
    }else{
      return !Boolean(this.props.children);
    }
  }

  isContainer() {
    return Boolean(this.props.route.container);
  }

  isSubPage() {
    return Boolean(this.props.route.components);
  }

  getPageFullPath() {
    let routes = [];
    for(let route of this.props.routes){
      if(!route.path) continue;
      routes.push(route.path==="/"?"":route.path);
      if(route===this.props.route) break;
    }
    let pathname = routes.join("/");
    for (let key in this.props.router.params) {
      let re = new RegExp(":"+key,"g"); 
      pathname = pathname.replace(re,this.props.router.params[key]);
    }
    return pathname;
  }

  getPageChildPath() {
    let ret = null;
    for(let i=0; i<this.props.routes.length; i++){
      let route = this.props.routes[i];
      if(!route.path) continue;
      if(route===this.props.route) {
        ret = this.props.routes[i+1];
        break;
      }
    }
    return ret?ret.path:null;
  }

  getPageParentPath() {
    let ret = null;
    for(let i=0; i<this.props.routes.length; i++){
      let route = this.props.routes[i];
      if(!route.path) continue;
      if(route===this.props.route) break;
      ret = route.path;
    }
    return ret
  }
}

//=====================
// hoc container
class StateHocBasetateHocContainer {
  constructor(ownProps) {
    this.ownProps = ownProps;
    this.Config = Config;
    this.Utils = Utils;
    this.Apis = Apis;
    this.Actions = Actions;
    this.ActionWraps = ActionWraps;

    this.Wraps = {};
    this.Reduxers = [];
  }
}

function stateHoc(creator){ return connect(
  (state,ownProps)=>{
    creator = creator||StateHocBasetateHocContainer;
    let key = '';for(let route of ownProps.routes){if(route.path){key+='/'+route.path}if(route===ownProps.route){break;}};
    
    if(!creator[key]){
      let extend = new creator(ownProps);
      if(!extend) return {};
      if(!extend.Wraps.data)extend.Wraps.data = ActionWraps.actionsDataWrap({});
      creator[key] = extend;
    }

    let extend = creator[key];
    if(!extend) return {};
    extend.ownProps = ownProps;
    
    let ret = {};
    (extend.Reduxers||[]).forEach((v)=>{
      ret[v] = state[v];
    });
    Object.entries(extend.Wraps).forEach(([key,v])=>{
      if(v.data) ret["wrap_"+key] = v.data(v.initData);
      if(v.state) ret["wrap_state_"+key] = v.state(v.initData);
    });
    return ret;
  },
  (dispatch,ownProps)=>{
    creator = creator||StateHocBasetateHocContainer;
    let key = '';for(let route of ownProps.routes){if(route.path){key+='/'+route.path}if(route===ownProps.route){break;}};

    let extend = creator[key];
    if(!extend) return {};

    return {
      Config: extend.Config,
      Utils: extend.Utils,
      Apis: extend.Apis,
      Wraps: extend.Wraps,
      ex: extend,

      onWillStart() {
        if(extend.onWillStart)extend.onWillStart();
      },
      onStart() {
        if(extend.onStart)extend.onStart();
        Object.values(extend.Wraps).forEach((v)=>{
          if(v.updateOnStart)v.update();
        });
      },
      onPause() {
        if(extend.onPause)extend.onPause();
      },
      onResume() {
        if(extend.onResume)extend.onResume();
        Object.values(extend.Wraps).forEach((v)=>{
          if(v.updateOnResume)v.update();
        });
      },
      onStop() {
        if(extend.onStop)extend.onStop();
        Object.values(extend.Wraps).forEach((v)=>{
          if(v.clearOnStop)v.clear();
        });
        creator[key] = null;
      },
      onBackKey() {
        if(extend.onBackKey)extend.onBackKey();
      },
    }
  }
);}


//==============================
// app component
//==============================
const AppLifeCycle = {
  // onInit(){},
  // onWillStart(){},
  // onStart(){},
  // onStop(){},
  // onResume(){},
  // onPause(){},
  doInit(){
    NavBar.navItemBack={
      icon: ComponentConfig.icons.left,
      component: "a",
      onClick:()=>{Apis.Navigate.back()},
    }

    if(AppLifeCycle.onInit)AppLifeCycle.onInit();
  }
};

//================
// app page
class AppPage extends React.Component{
  //================
  // app event
  appEventBind(){
    document.addEventListener("deviceready", ()=>{
      document.addEventListener("backbutton", ()=>{
        if(!this.componentDidBackKey()){
          Apis.Navigate.back();
        }
      }, false);

      document.addEventListener("pause", ()=>{
        this.componentDidPause();
      }, false);

      document.addEventListener("resume", ()=>{
        this.componentDidResume();
      }, false);
    }, false);
    if(Config.OnBrowser && Config.OnBrowserDebug){
      document.addEventListener("keydown", (keyevent)=>{
        if(keyevent.keyCode===192){
          if(!this.componentDidBackKey()){
            Apis.Navigate.back();
          }
        }
      }, false);
    }
  }
  
  //--------------------
  // app life 
  componentWillMount(){
    this.appEventBind();
    AppLifeCycle.doInit && AppLifeCycle.doInit();
    if(AppLifeCycle.onWillStart && AppLifeCycle.onWillStart.apply(this)) return;
  }

  componentDidMount(){
    this.appEventBind();

    if(AppLifeCycle.onStart && AppLifeCycle.onStart.apply(this)) return;
    //this.props.actionUserUpdate(); //todo
  }

  componentWillUnmount(){
    if(AppLifeCycle.onStop && AppLifeCycle.onStop.apply(this)) return;
  }

  componentDidResume(){
    if(AppLifeCycle.onResume && AppLifeCycle.onResume.apply(this)) return;
  }
  componentDidPause(){
    if(AppLifeCycle.onPause && AppLifeCycle.onPause.apply(this)) return;
  }
  componentDidBackKey(){
    if(AppLifeCycle.onBackKey && AppLifeCycle.onBackKey.apply(this)) return;

    if(AppData.didBackKey && AppData.didBackKey()){
      return true;
    }else{
      return false;
    }
  }

  //-------------------
  // render
  render() {
    return !this.props.wrap_data.ready
    ?(
      <View>
        logding
      </View>
    )
    :(
      <View>
        {this.props.children}
        
        {this.props.ReduxerNotice.dialogs.map((v,i)=>{
          let {
            onDismiss,
            content,
            ...props,
          } = v;
          return (
            <Modal 
              key={"dialog"+i}
              {...props} 
              isOpen
              onDismiss={()=>{Actions.actionNoticeDialogClose(v);if(onDismiss)onDismiss()}}>
              {content}
            </Modal>
          );
        })}

        {this.props.ReduxerNotice.blocking?(<View className="bg-color-mask layout-v-center-center layout-zindex-overlay"><Loader  /></View>):null}

        <ProgressBar percent={0} spinner={false} intervalTime={200} autoIncrement={this.props.ReduxerNotice.loading} />

        <Notification
          amStyle={this.props.ReduxerNotice.noticeStyle||"error"}
          visible={Boolean(this.props.ReduxerNotice.noticeMsg)}
          static
          closeBtn={true}
          onDismiss={()=>{Actions.actionNoticeMessage()}}
          animated>
          {this.props.ReduxerNotice.noticeMsg}
        </Notification>
      </View>
    );
  }
}

class AppContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);
    this.Wraps.data = this.ActionWraps.actionsDataWrap({
      initData: {ready: !(AppLifeCycle.onWillStart||AppLifeCycle.onStart)},
    });

    this.Reduxers.push('ReduxerNotice');
  }
}
const AppState = stateHoc(AppContainer);

//==============================
// route util
//==============================
const HookRouteCheckLogin = function(nextState, replace){
  if(!User.isLogin()){
    // AppData.loginBackLoction = nextState.location;
    // AppData.loginBackLoction.isReplace = true;

    replace(typeof(Config.PathLogin)==='string'?Config.PathLogin:Config.PathLogin.path);
  }
}

function createRouteProps(
  path, 
  options={key:undefined,checkLogin:false,prefix:'',component:undefined,components:undefined,getComponent:undefined,demand:undefined,container:undefined,page:undefined,restartOnQueryChange:undefined},
) {
  if(!path)return options;let paths = path.split('/');
  options=options||{};
  let params = paths.filter((v)=>{return v.indexOf(':')===0}).map((v)=>{return v.slice(1)});
  let {
    checkLogin,
    prefix,
    component,
    components,
    getComponent,
    demand,
    container,
    page,
    subs,
    forLogin,
    forHome,
    forResister,
    forForgetPassword,
    forChangePassword,
    key,
    restartOnQueryChange,
    restartOnParamChange,
    ...props,
  } = options;
  key = key||paths[0]||paths[1];
  prefix=prefix||'';
  restartOnParamChange = restartOnParamChange===undefined||restartOnParamChange===null?true:restartOnParamChange;

  if(subs){
    props.container = Object.keys(subs);
  }

  if(component){
    props.component = component;
  }else if(components){
    props.components = components;
  }else if(getComponent){
    props.getComponent = getComponent;
  }else if(demand){
    props.getComponent = function(nextState, cb) {
      demand((dcontainer,dpage)=>{
        const KeysComponent = dpage?dcontainer(PageHoc(dpage)):dcontainer;
        const Component = function (props) {
          return (<KeysComponent {...props} key={'page'+JSON.stringify(props.params)+JSON.stringify(props.location.query)} />);
        }
        cb(null, Component);
      },key,nextState);
    } 
  }else{
    if(typeof(container)==='string'){
      container = require("../pages/"+prefix+"_"+container);
    }else if(container===undefined){
      container = require("../pages/"+prefix+"_"+key.replace(/-/g,'_')).default;
    }else if(container===true){
      container = stateHoc();
    }

    if(typeof(page)==='string'){
      page = require("../pages/"+prefix+page).default;
    }else if(page===undefined){
      page = require("../pages/"+prefix+key.replace(/-/g,'_')).default;
    }

    if(container&&page){
      const KeysComponent = container(PageHoc(page));
      props.component = function (props) {
        let KeysComponentkey = '/'+key;
        if(restartOnParamChange)KeysComponentkey += Object.keys(props.params).filter((v)=>{return params.indexOf(v)>=0}).map((v)=>{return props.params[v]}).join(':')
        if(restartOnQueryChange)KeysComponentkey += JSON.stringify(props.location.query);
        return (<KeysComponent {...props} key={KeysComponentkey} />);
      }
    }
  }

  Config.Path[key.replace(/-/g,'_')] = {path:key, params:params};
  if(forLogin)Config.Path.Login = key;
  if(forHome)Config.Path.Home = key;
  if(forResister)Config.Path.Login = key;
  if(forForgetPassword)Config.Path.Resister = key;
  if(forChangePassword)Config.Path.ChangePassword = key;

  return Object.assign({
    key,
    path,
    onEnter: checkLogin?HookRouteCheckLogin:null,
  },props);
}

function createAppRouter(route,reduxers){
  createAppStore(reduxers);
  return (
    <Provider store={ActionStore}>
      <Router 
        history={hashHistory} 
        render={(props)=>{
          if(props.location.pathname==='/login'){

            if(AppData.loginBackLoction&&AppData.routerStatus.location.pathname!==props.location.pathname)AppData.loginBackLoction.isReplace = props.location.action==='REPLACE';
          }else{
            AppData.loginBackLoction = props.location;
          }
          AppData.routerStatus=props;
          return <RouterContext {...props} />
        }}
        onError={(a)=>{
          console.log(a)
        }}
      >
        <Route path="/" component={AppState(AppPage)}>
          {route}
        </Route>  
        <Route path="*" onEnter= { (nextState, replace)=>{replace('/')} } />
      </Router>
    </Provider>
  )
}

function jsLoader(filename){
  return new Promise((resolve,reject)=>{
    if(!filename){
      reject("js filename error");
    }
    filename += "?version="+Math.ceil((new Date()).getTime()/(1000*3600));

    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    fileref.onload = ()=>{resolve()};
    fileref.onerror = (error)=>{reject(error)};
    document.getElementsByTagName("head")[0].appendChild(fileref);  
  });
} 

//==============================
// export
//==============================
export {
  AppLifeCycle,
  
  Config,
  Apis,
  Utils,
  Actions,
  ActionWraps,
  ActionStore,

  AppData,

  PageHoc,
  stateHoc,
  StateHocBasetateHocContainer,
  createAppRouter,
  createRouteProps,
  HookRouteCheckLogin,
  jsLoader,

  Loader,
  Accordion,
  Container,
  Col,
  Group,
  Button,
  ButtonGroup,
  Badge,
  NavBar,
  View,
  Grid,
  Icon,
  TabBar,
  List,
  Field,
  Tabs,
  Notification,
  // OffCanvas,
  // OffCanvasTrigger,
  Card,
  Modal,
  ProgressBar,
  Pager,
  PopoverTrigger,
  Popover,
  Carousel,
  Switch,
  CheckRadio,
  Panel,
  EmbedHtml,
  Fab,
  ComponentConfig,
}
