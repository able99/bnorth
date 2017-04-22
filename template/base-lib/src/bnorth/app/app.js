import React from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { Router,Route,hashHistory} from 'react-router';

import Config from './config';
import { View, Notification,Loader,Modal,ProgressBar } from '../components/';
import Actions from '../actions/';
import { ExtendAppLifeCircle } from '../../extend/extend';

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
// page mixin
let gOnBackKey = null;
function doFocusChange(){
  if(this.props.focus){
    // resume
    if(this.componentDidResume)this.componentDidResume();
    // nagigate //todo
    Actions.actions.actionNaviUpdate(this.props.location,this.props.router,this.props.routes);
    // close model
    Actions.actions.actionNoticeDialogClose();
    // back key event
    if(this.onBackKey) gOnBackKey = this.onBackKey.bind(this);
  }else{
    // pause
    if(this.componentDidPause)this.componentDidPause();
    // back key event
    if(this.onBackKey === gOnBackKey ) gOnBackKey = null;
  }
}
export const AppMixinPage = {
  componentDidMount: function() {
    doFocusChange.apply(this);
  },
  
  componentDidUpdate: function(prevProps) {
    if(prevProps.focus !== this.props.focus){
      doFocusChange.apply(this);
    }
  },

  getComponentPath: function() {
    let routes = [];
    for(let route of this.props.routes){
      routes.push(route.path==="/"?"":route.path);
      if(route===this.props.route) break;
    }
    return routes.join("/");
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
export const AppMixinAppPage = {
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

  getApp: function() {
    return AppData;
  },
};

//==============
// container mixin
export const AppMixinContainerPage = {
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

//==============
const App = React.createClass({
  mixins: [AppMixinAppPage],
  //================
  // app event
  appEventBind(){
    document.addEventListener("deviceready", ()=>{
      document.addEventListener("backbutton", ()=>{
        this.appHandleEventBackKey();
      }, false);

      document.addEventListener("pause", ()=>{
        this.appDidBackground();
      }, false);

      document.addEventListener("resume", ()=>{
        this.appDidForceground();
      }, false);
    }, false);
    if(Config.OnBrowser && Config.OnBrowserDebug){
      document.addEventListener("keydown", (keyevent)=>{
        if(keyevent.code==="Backspace"){
          this.appHandleEventBackKey();
        }
      }, false);
    }
  },
  appHandleEventBackKey(){
    if(!gOnBackKey || !gOnBackKey() || !ExtendAppLifeCircle || !ExtendAppLifeCircle.onBackKey()){
      Actions.actions.actionNaviBack();
    }
  },

  //================
  // app life 
  componentDidMount(){
    this.appEventBind();

    if(!ExtendAppLifeCircle||!ExtendAppLifeCircle.appDidMount.apply(this)){
      //this.props.actionUserUpdate();
    }
  },
  // componentDidUpdate(){
  //   console.log(this.props);
  // },
  componentWillUnmount(){
    if(!ExtendAppLifeCircle||!ExtendAppLifeCircle.appWillUnmount.apply(this)){

    }
  },

  appDidForceground(){
    if(!ExtendAppLifeCircle||!ExtendAppLifeCircle.appDidForceground.apply(this)){

    }
  },
  appDidBackground(){
    if(!ExtendAppLifeCircle||!ExtendAppLifeCircle.appDidBackground.apply(this)){

    }
  },

  //================
  // render
  render() {
    return !this.props.wrapData.data().ready?(
      <View>
        123
      </View>
    ):(
      <View>

        {this.renderPages()}
        

        {this.props.notice.dialogs.map((v,i)=>{
          let {
            onDismiss,
            ...props,
          } = v;
          return (
            <Modal {...props} isOpen
              onDismiss={()=>{this.props.actionNoticeDialogClose(v);if(onDismiss)onDismiss()}}>
              {v.content}
            </Modal>
          );
        })}


        {this.props.notice.blocking?(<View className="bg-mask layout-v-center-center text-primary layout-z-line"><Loader  /></View>):null}


        <ProgressBar percent={0} spinner={false} intervalTime={200} autoIncrement={this.props.notice.loading} />


        <Notification
          amStyle="alert"
          visible={Boolean(this.props.notice.noticeMsg)}
          static
          closeBtn={false}
          animated>
          {this.props.notice.noticeMsg}
        </Notification>
      </View>
    );
  }
});

let wrapData = Actions.wraps.actionsDataWrap("app",{
  ready: false,
});

const AppConnect = connect(
  (state)=>{
    let a = Actions.wraps.actionsDataWrap("app").state();
    console.log("data state:",a);
    let states =  Object.assign(
      a,
      {notice: state.ReduxerNotice},
    );
    console.log("states:",states);
    return states;
  },
  (dispatch,ownProps)=>{
    let funcs = {

    };
    return Object.assign(
      {funcs},
      Actions.actions,
      {wrapData},
    );
  },
)(App);


export const AppRouterDefaultConnect = connect(
  (state,ownProps)=>{
    return {};
  },
  (dispatch,ownProps)=>{
    let funcs = {
      
    };
    return Object.assign(
      Actions.actions,
      {funcs},
    );
  },
);

export const AppRouterCreator = function(routes=[]){
  return (
    <Provider store={Actions.store}>
      <Router history={hashHistory}>
      <Route path="/" component={AppConnect}>
        {routes}
      </Route>
    </Router>
    </Provider>
  )
}


