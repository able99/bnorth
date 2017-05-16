import { combineReducers } from 'redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import React from 'react';
import { connect,Provider } from 'react-redux'
import { Router,Route,hashHistory,RouterContext} from 'react-router';

// action-----------
import { actionsNotice,ReduxerNotice } from './actions/notice';
import { actionsData, ReduxerData, actionsDataWrap } from './actions/data';
import { actionsHttpifFetch, actionsHttpifOperate, ReduxerHttpifFetch, actionsHttpifFetchWrap } from './actions/httpif';

// util---------------
import Format from './utils/format';
import Util from './utils/util';
import Webview from './utils/webview';

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
import Modal from './components/Modal/Modal';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import TabBar from './components/TabBar';
import Tabs from './components/Tabs';
import View from './components/View';
import Field from './components/Field';
import OffCanvas from './components/OffCanvas';
import OffCanvasTrigger from './components/OffCanvasTrigger';
import CheckRadio from './components/CheckRadio';
import Pager from './components/Pager';
import ProgressBar from './components/ProgressBar';

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

//==============================
// utils
//==============================
let Utils = {
  Format,
  Util,
  Webview,
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
// app data
let AppData = {};
AppData.setProps = function(key,val){
  this.key = val;
}
AppData.getProps = function(key){
  return this[key];
}


//==============
// app mixin
//==============

//==============
// page mixin
const MixinPage = {
  //--------------------
  // life cycle
  componentWillMount: function() {
    Actions.actionNoticeDialogClose();

    if(this.props.onWillStart){
      this.props.onWillStart(this);
    }
  },

  componentDidMount: function() {
    if(this.props.onStart){
      this.props.onStart(this);
    }

    this.componentDidResume();
  },

  componentDidUpdate: function(prevProps) {
    if(prevProps.focus !== this.props.focus){
      this.props.focus?this.componentDidResume():this.componentDidPause();
    }
  },

  componentWillUnmount: function() {
    this.componentDidPause();

    if(this.props.onStop){
      this.props.onStop(this);
    }
  },

  componentDidPause: function() {
    if(this.props.onPause){
      this.props.onPause(this);
    }
  },

  componentDidResume: function() {
    ComponentDidBackKey = this.componentDidBackKey;//this.componentDidBackKey.bind(this);

    if(this.props.onResume){
      this.props.onResume(this);
    }
  },

  componentDidBackKey: function() {
    if(this.props.onBackKey){
      this.props.onBackKey();
      return true;
    }else{
      return false;
    }
  },

  //--------------------
  // page util
  getComponentPath: function() {
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
  },

  getPageProps: function() {
    return {
      focus: this.props.focus,
      child: this.props.child,
    }
  },
  getApp: function() {
    return AppData;
  },
};

//==============
// app mixin
export const MixinApp = {
  //--------------------
  // multi child page
  renderPages: function(){
    let pages = [];
    let ite = this.props.children;
    let level = 0;
    let sub = false;

    while(ite && ite.props){
      let component = ite;
      let props = {
        key: `page-app-${++level}`,
        focus: false,
        child: false,
      };

      if(!sub)pages.push({component,props});sub=false;

      sub = ite.props.route.subs;
      ite = ite.props.children;
    } 

    pages.slice(-1).map((v)=>{return v.props.focus = true});
    return pages.map((v,i)=>{
      return React.cloneElement(v.component,v.props);
    });
  },

  //--------------------
  // page util
  getApp: function() {
    return AppData;
  },
};

//==============
// container mixin
const MixinContainerPage = {
  //--------------------
  // multi child page
  getSelectPath: function(){
    let path = null;
    for(let route of this.props.routes){
      if(path||route===this.props.route){
        if(path){
          path = route.path;
          break;
        }
        if(route.subs){
          path = route.path;
        }
      }
    }
    return path;
  },
  getPageView: function(name=null, props={}){
    let element = name?this.props.route.pageViews&&this.props.route.pageViews[name]:this.props.route.pageViews;
    return element?React.createElement(element,Object.assign({},this.props,{
      focus: true,
      child: true,
    },props)):null;
  },
  renderPages: function(names=null,focusAll){
    return (this.props.route.childRoutes||[])
    .filter((v)=>{
      return (
        (names&&Array.isArray(names))
        ?names.filter((vv)=>{
          return vv === v.path;
        }).length>0
        :true
      );
    })
    .map((v)=>{
      return (
        React.createElement(v.component,Object.assign({},{
          route: v,
          router: this.props.router,
          location: this.props.location,
          routes: this.props.routes,
          params: this.props.params,
          component: v.component,
          components: v.components,
          key: "multipage_"+v.path,
          focus: Boolean(focusAll || this.getSelectPath() === v),
          child: true,
          name: v.path,
        }))
      );
    });
  },
};



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
let ComponentDidBackKey = null;
const AppPage = React.createClass({
  mixins: [MixinApp],
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
  },
  
  //--------------------
  // app life 
  componentWillMount(){
    this.appEventBind();

    if(AppLifeCycle.onWillStart && AppLifeCycle.onWillStart.apply(this)) return;
  },

  componentDidMount(){
    this.appEventBind();

    if(AppLifeCycle.onStart && AppLifeCycle.onStart.apply(this)) return;
    //this.props.actionUserUpdate(); //todo
  },

  componentWillUnmount(){
    if(AppLifeCycle.onStop && AppLifeCycle.onStop.apply(this)) return;
  },

  componentDidResume(){
    if(AppLifeCycle.onResume && AppLifeCycle.onResume.apply(this)) return;
  },
  componentDidPause(){
    if(AppLifeCycle.onPause && AppLifeCycle.onPause.apply(this)) return;
  },
  componentDidBackKey(){
    if(AppLifeCycle.onBackKey && AppLifeCycle.onBackKey.apply(this)) return;

    if(ComponentDidBackKey && ComponentDidBackKey()){
      return true;
    }else{
      return false;
    }
  },

  //-------------------
  // render
  render() {
    return !this.props.wrap_app.ready
    ?(
      <View focus>
        logding
      </View>
    )
    :(
      <View focus>
        {this.renderPages()}
        
        {this.props.ReduxerNotice.dialogs.map((v,i)=>{
          let {
            onDismiss,
            ...props,
          } = v;
          return (
            <Modal 
              key={"dialog"+i}
              {...props} 
              isOpen
              onDismiss={()=>{this.props.Actions.actionNoticeDialogClose(v);if(onDismiss)onDismiss()}}>
              {v.content}
            </Modal>
          );
        })}

        {this.props.ReduxerNotice.blocking?(<View className="bg-mask layout-v-center-center text-primary layout-z-line"><Loader  /></View>):null}

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
});

//================
// app
const AppConnect = createDefaultConnect(
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
    replace({
      pathname: typeof(Config.PathLogin)==='string'?Config.PathLogin:Config.PathLogin.path,
      state: nextState.location,
    });
  }
}



function createDefaultConnect(creator){
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
      let ret = {};
      let objs = creator(ownProps)||{};
      for(let obj of objs.Reduxers||[]){
        ret[obj] = state[obj];
      }
      for(let obj of objs.Wraps||[]){
        ret["wrap_"+obj.uuid] = obj.data(obj.initData);
      }

      return ret;
    },
    (dispatch,ownProps)=>{
      let objs = creator(ownProps)||{};

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

let RouterStatus = null;
function createAppRouter(route,reduxers){
  createAppStore(reduxers);
  return (
    <Provider store={ActionStore}>
      <Router 
        history={hashHistory} 
        render={(props)=>{
          RouterStatus = props;
          return <RouterContext {...props} />
        }}
        // onError={(a)=>{
        //   console.log(a)
        // }}
      >
        <Route path="/" component={AppConnect(AppPage)}>
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

  MixinPage,
  MixinContainerPage,

  RouterStatus,

  createAppRouter,
  createDefaultConnect,
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
  OffCanvas,
  OffCanvasTrigger,
  Card,
  Modal,
  CheckRadio,
  ProgressBar,
  Pager,

}


