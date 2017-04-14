// import { WebDavUrl } from '../app/config';
// var createClient = require("webdav");
// import { actionsUser,actionUserAddListener } from './user';
// import { actionsNotice } from './notice';
// import { actionsNavigate } from './navigate';


// let WebFileClient = null;
// actionUserAddListener(function(user){
//   WebFileClient = createClient(WebDavUrl,user.token);
// });





// export const WebdavListFetching = 'WebdavListFetching';
// export const WebdavListInvalid = 'WebdavListInvalid';
// export const WebdavListFetchSuccess = 'WebdavListFetchSuccess';
// export const WebdavListFetchFail = 'WebdavListFetchFail';
// export function actionWebdavList(uuid,resource){
//   return (dispatch)=>{
//     if(!WebFileClient){
//       return;
//     }

//     actionsNotice(dispatch).noticeLoading();
//     dispatch(actionWebdavListing(uuid,resource));

//     WebFileClient.getDirectoryContents(resource).then(function(data) {
//       actionsNotice(dispatch).noticeLoadingFinish();
//       dispatch(actionWebdavListSuccess(uuid,resource,data));
//     }).catch(function(error) {
//       if(error.message.indexOf("401 Unauthorized")===0){
//         actionsNavigate(dispatch).naviGoto("/login");
//       }
//       actionsNotice(dispatch).noticeLoadingFinish();
//       actionsNotice(dispatch).notice(error);
//       dispatch(actionWebdavListFail(uuid,resource,error));
//     });
//   }
// }
// export function actionWebdavListing(uuid,resource){
//   return {
//     type: WebdavListFetching,
//     uuid,
//     resource,
//   };
// }
// export function actionWebdavListInvalid(uuid,resource){
//   return {
//     type: WebdavListInvalid,
//     uuid,
//     resource,
//   };
// }
// export function actionWebdavListSuccess(uuid,resource,result){
//   return {
//     type: WebdavListFetchSuccess,
//     uuid,
//     resource,
//     result,
//   };
// }
// export function actionWebdavListFail(uuid,resource,error){
//   return {
//     type: WebdavListFetchFail,
//     uuid,
//     resource,
//     error,
//   };
// }

// export function actionsWebdavList(dispatch){
//   return {
//     actionWebdavList: (...args) => dispatch(actionWebdavList(...args)),
//   }
// }
// export function actionsWebdavListWrap(dispatch,resource,uuid=""){
//   return {
//     state(){
//       let reduxer = window.store.getState().ReduxerWebdavList;
//       return reduxer.uuid===uuid&&reduxer.resource===resource?{ReduxerWebdavList:reduxer}:{}; 
//     },
//     update: ()=>{
//       actionsWebdavList(dispatch).actionWebdavList(uuid, resource);
//     },
//     get: ()=>{
//       let reduxer = window.store.getState().ReduxerWebdavList;
//       //let resource = resource;
//       return (reduxer && reduxer.fetchResult && reduxer.fetchResult[resource] && reduxer.fetchResult[resource].result) || [];
//     },
//     remove: ()=>{

//     },
//     gopath: ()=>{

//     },
//   }
// }

// let StateWebdavList = {
//   uuid: null,
//   resource: null,
//   fetchResult:{},
// };
// export function ReduxerWebdavList(state = StateWebdavList, action) {
//   switch (action.type) {
//   case WebdavListFetching:
//     return Object.assign({}, state, {
//       uuid: action.uuid,
//       resource: action.resource,
//       fetchResult: Object.assign({}, state.fetchResult, {
//         [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
//           fetching: true,
//         }),
//       }),
//     });
//   case WebdavListInvalid:
//     return Object.assign({}, state, {
//       uuid: action.uuid,
//       resource: action.resource,
//       fetchResult: Object.assign({}, state.fetchResult, {
//         [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
//           invalid: true,
//         }),
//       }),
//     });
//   case WebdavListFetchSuccess:
//     return Object.assign({}, state, {
//       uuid: action.uuid,
//       resource: action.resource,
//       fetchResult: Object.assign({}, state.fetchResult, {
//         [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
//           invalid: false,
//           fetching: false,
//           result: action.result,
//         }),
//       }),
//     });
//   case WebdavListFetchFail:
//     return Object.assign({}, state, {
//       uuid: action.uuid,
//       resource: action.resource,
//       fetchResult: Object.assign({}, state.fetchResult, {
//         [action.uuid+action.resource]:Object.assign({}, state.fetchResult[action.uuid+action.resource], {
//           fetching: false,
//           error: action.error,
//         }),
//       }),
//     });

//   default:
//     return state;
//   }
// }





// export function actionWebdavRemove(resource,cb,notice=true,block=false){
//   return (dispatch)=>{
//     if(!WebFileClient){
//       return;
//     }

//     if(block)actionsNotice(dispatch).noticeLoading();
//     WebFileClient.deleteFile(resource).then(function(data) {
//       if(block)actionsNotice(dispatch).noticeLoadingFinish();
//       if(cb)cb(data);
//     }).catch(function(error) {
//       if(error.message.indexOf("401 Unauthorized")===0){
//         actionsNavigate(dispatch).naviGoto("/login");
//       }

//       if(notice)actionsNotice(dispatch).notice(error);
//       if(block)actionsNotice(dispatch).noticeLoadingFinish();
//       if(cb)cb(null,error);
//     });
//   }
// }

// export function actionsWebdavOperation(dispatch){
//   return {
//     actionWebdavRemove: (...args) => dispatch(actionWebdavRemove(...args)),
//   }
// }