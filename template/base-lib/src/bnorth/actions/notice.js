import { bindActionCreators } from 'redux';

import { ActionStore } from '../';

//==================
// message
export const APP_NOTICE = 'APP_NOTICE';
let gActionAppNoticeTimerId = null;
let gActionAppNoticeTimerCount = 0;
export function actionNoticeMessage(notice="") {
  notice = notice.message && (typeof notice.message === 'object')?notice.message:notice;
  notice = notice.reason ||  notice.message || notice.error || notice;
  return (dispatch)=>{
    if(gActionAppNoticeTimerId){
      gActionAppNoticeTimerCount = 3;
    }else{
      gActionAppNoticeTimerCount = 3;
      gActionAppNoticeTimerId = setInterval(()=>{
        if(gActionAppNoticeTimerCount<=0){
          dispatch(actionAppNoticeDo(""));
          clearInterval(gActionAppNoticeTimerId);
          gActionAppNoticeTimerId = null;
        }
        gActionAppNoticeTimerCount -= 1;
      },1000);
    }
    dispatch(actionAppNoticeDo(notice));
  };
}
export function actionAppNoticeDo(notice) {
  return {
    type: APP_NOTICE,
    notice,
  };
}

//==================
// loading
export const APP_LOADING = 'APP_LOADING';
export const APP_NO_LOADING = 'APP_NO_LOADING';
export function actionNoticeLoading() {
  return {
    type: APP_LOADING,
  };
}
export function actionNoticeLoadingFinish() {
  return {
    type: APP_NO_LOADING,
  };
}

//==================
// block
export const APP_BLOCKING = 'APP_BLOCKING';
export const APP_NO_BLOCKING = 'APP_NO_BLOCKING';
export function actionNoticeBlock() {
  return {
    type: APP_BLOCKING,
  };
}
export function actionNoticeBlockFinish() {
  return {
    type: APP_NO_BLOCKING,
  };
}

//==================
// net
export const APP_NET_STATUS = 'APP_NET_STATUS';
export function actionNoticeNet(status) {
  return {
    type: APP_NET_STATUS,
    data:status,
  };
}

//==================
// menu
export const AppMenuToggle = 'AppMenuToggle';
export function actionNoticeMenu() {
  return {
    type: AppMenuToggle,
  };
}

//==================
// dialog
export const AppDialogShow = 'AppDialogShow';
export const AppDialogClose = 'AppDialogClose';
export function actionNoticeDialogShow(dialog) {
  return {
    type: AppDialogShow,
    dialog,
  };
}
export function actionNoticeDialogClose(dialog) {
  return {
    type: AppDialogClose,
    dialog,
  };
}

//==================
// nav
export const APP_NAV = 'APP_NAV';
export const APP_NAV_FINISH = 'APP_NAV_FINISH';
export function actionAppNav(transition,enter) {
  return {
    type: APP_NAV,
    transition:transition,
    enter:enter,
  };
}
export function actionAppNavFinish() {
  return {
    type: APP_NAV_FINISH,
  };
}


let actionsNoticeObj = null;
export function actionsNotice(){
  if(actionsNoticeObj)return actionsNoticeObj;

  actionsNoticeObj = bindActionCreators({
    //msg
    actionNoticeMessage,
    //loading
    actionNoticeLoading,
    actionNoticeLoadingFinish,
    //block
    actionNoticeBlock,
    actionNoticeBlockFinish,
    //net
    actionNoticeNet,
    //menu
    actionNoticeMenu,
    //dialog
    actionNoticeDialogShow,
    actionNoticeDialogClose,
  },ActionStore.dispatch);
  return actionsNoticeObj;
}



let StateApp = {
  //msg
  noticeMsg:"",
  //loading
  loading:false,
  //block
  blocking: false,
  //net
  netConn:false,
  netRetry:0,
  netStatus: "",
  //menu
  menu: false,
  //dialog
  dialogs: [],
  //nav
  transitionGo: "",
  transitionBack: "",
  navigating: false,
};
export function ReduxerNotice(state = StateApp, action) {
  switch (action.type) {
  //msg
  case APP_NOTICE:
    return Object.assign({}, state, {noticeMsg:action.notice});
  //loading
  case APP_LOADING:
    return Object.assign({}, state, {loading:true});
  case APP_NO_LOADING:
    return Object.assign({}, state, {loading:false});
  //block
  case APP_BLOCKING:
    return Object.assign({}, state, {blocking:true});
  case APP_NO_BLOCKING:
    return Object.assign({}, state, {blocking:false});
  //net
  case APP_NET_STATUS:
    return Object.assign({}, state, action.data);
  //menu
  case AppMenuToggle:
    return Object.assign({}, state, {menu: !state.menu});
  //dialog
  case AppDialogShow:{
    let dialogs = Array.from(state.dialogs);
    dialogs.push(action.dialog)
    return Object.assign({}, state, {dialogs:dialogs, });
  }
  case AppDialogClose:{
    let dialogs = [];
    if(action.dialog === "all"){
      dialogs = [];
    }else if(typeof(action.dialog)==='object'){
      dialogs = state.dialogs.filter((v)=>{
        return v.title !== action.dialog.title || v.content !== v.content;
      });
    }else if(typeof(action.dialog)==='number'){
      
    }else{
      dialogs = state.dialogs.slice(0,-1);
    }
    
    return Object.assign({}, state, {dialogs});
  }
  //nav
  case APP_NAV:
    if(action.enter)
      return Object.assign({}, state, {transitionGo:action.transition, navigating:true});
    else
      return Object.assign({}, state, {transitionBack:action.transition, navigating:true});
  case APP_NAV_FINISH:
    return Object.assign({}, state, {navigating:false});

  default:
    return state;
  }
}