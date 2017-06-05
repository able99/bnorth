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

//==============================
// config
//==============================
let Config = {};

Config.NetCache = false;
Config.BaseUrl = window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/";
Config.ApiUrl = "rapi/";
Config.AuthUrl = "auth/";

Config.Version = "0.1.0";
Config.Debug = false;
Config.OnBrowserDebug = true;
Config.OnBrowser = Boolean(!window.cordova);
Config.OnApp = Config.OnBrowserDebug||Boolean(window.cordova);

Config.PathHome = "/";
Config.PathLogin = "/login";

Config.StrNetCommonError = "网络连接错误";

//==============================
// utils
//==============================
let Utils = {
  Format,
  Util,
  Webview,
  Style,
}

//==============================
// apis
//==============================
let Apis = {
  User,
  Netif,
  Navigate,
  Storage,
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
// Page
//==============
const AppData = {
  didBackKey: null,
  routerStatus: null,
  loginBackLoction: null,
}


//==============
// Page
//==============
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
    let ret = super.render();
    ret = React.cloneElement(
      ret,
      Object.assign(
        {
          title: Wrapper.name,
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
}


//==============================
// app component
//==============================
const AppLifeCycle = {
  // onWillStart(){},
  // onStart(){},
  // onStop(){},
  // onResume(){},
  // onPause(){},
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
    return !this.props.wrap_app.ready
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
              onDismiss={()=>{this.props.Actions.actionNoticeDialogClose(v);if(onDismiss)onDismiss()}}>
              {content}
            </Modal>
          );
        })}

        {this.props.ReduxerNotice.blocking?(<View className="bg-color-mask layout-v-center-center layout-zindex-overlay"><Loader  /></View>):null}

        <ProgressBar percent={0} spinner={false} intervalTime={200} autoIncrement={this.props.ReduxerNotice.loading} />

        <Notification
          amStyle="alert"
          visible={Boolean(this.props.ReduxerNotice.noticeMsg)}
          static
          closeBtn={false}
          animated>
          {this.props.ReduxerNotice.noticeMsg}
        </Notification>
      </View>
    );
  }
}

const AppState = stateHoc(
  function(){
    let Wraps = [
      ActionWraps.actionsDataWrap('app',{
        initData: {ready: !(AppLifeCycle.onWillStart||AppLifeCycle.onStart)},
      }),
    ];

    return{
      Actions,
      Wraps,
      Reduxers: ['ReduxerNotice'],
    }
  }
);

//==============================
// route util
//==============================
const HookRouteCheckLogin = function(nextState, replace){
  if(!User.isLogin()){
    AppData.loginBackLoction = nextState.location;
    AppData.loginBackLoction.isReplace = true;

    replace(typeof(Config.PathLogin)==='string'?Config.PathLogin:Config.PathLogin.path);
  }
}

function stateHoc(creator){
  if(!creator) return connect(
    null,
    (dispatch,ownProps)=>{
      let ret = {};

      ret.Config = Config;
      ret.Utils = Utils;
      ret.Apis = Apis;
      ret.Actions = Actions;
      
      return ret;
    },
  );

  return connect(
    (state,ownProps)=>{
      let objs = creator.objs?creator.objs:(creator(ownProps)||{});creator.objs = objs;

      let ret = {};
      for(let obj of objs.Reduxers||[]){
        ret[obj] = state[obj];
      }
      for(let obj of objs.Wraps||[]){
        if(obj.data) ret["wrap_"+obj.uuid] = obj.data(obj.initData);
        if(obj.state) ret["wrap_state_"+obj.uuid] = obj.state(obj.initData);
      }

      return ret;
    },
    (dispatch,ownProps)=>{
      let objs = creator.objs?creator.objs:(creator(ownProps)||{});creator.objs = objs;

      let ret = {
        onWillStart(){
          if(objs.onWillStart)objs.onWillStart();
        },
        onStart(){
          if(objs.onStart)objs.onStart();
          for(let wrap of objs.Wraps||[]){
            if(wrap.updateOnStart)wrap.update();
          }
        },
        onResume(){
          if(objs.onResume)objs.onResume();
          for(let wrap of objs.Wraps||[]){
            if(wrap.updateOnResume)wrap.update();
          }
        },
        onPause(){
          if(objs.onPause)objs.onPause();
        },
        onStop(){
          creator.objs = null;
          if(objs.onStop)objs.onStop();
          for(let wrap of objs.Wraps||[]){
            if(wrap.clearOnStop)wrap.clear();
          }
        },
      }
      if(objs.onBackKey)ret.onBackKey=objs.onBackKey;

      ret.Wraps={};
      for(let obj of objs.Wraps||[]){
        ret.Wraps[obj.uuid] = obj;
      }
      ret.Config = Config;
      ret.Utils = Utils;
      ret.Apis = Apis;
      ret.Actions = Actions;

      ret.Vars = objs.Vars||{};
      ret.Checks = objs.Checks||{};
      ret.Methods = objs.Methods||{};
      
      return ret;
    },
  );
}

function createAppRouter(route,reduxers){
  createAppStore(reduxers);
  return (
    <Provider store={ActionStore}>
      <Router 
        history={hashHistory} 
        render={(props)=>{
          AppData.routerStatus = props;
          return <RouterContext {...props} />
        }}
        // onError={(a)=>{
        //   console.log(a)
        // }}
      >
        <Route path="/" component={AppState(AppPage)}>
          {route}
        </Route>  
      </Router>
    </Provider>
  )
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
  createAppRouter,
  HookRouteCheckLogin,

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
}
