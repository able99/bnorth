import { combineReducers } from 'redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';

import { actionsNavigate,ReduxerNavigate } from './navigate';
import { actionsNotice,ReduxerNotice } from './notice';
import { actionsData, ReduxerData, actionsDataWrap } from './data';
import { actionsHttpifFetch, actionsHttpifOperation, ReduxerHttpifFetch, actionsHttpifFetchWrap } from '../actions/httpif';


//==============================
// app reduxer
//==============================
const reduxers = {
  ReduxerHttpifFetch,
  ReduxerData,
  ReduxerNavigate,
  ReduxerNotice,
};
const Reduxer = combineReducers(Object.assign(reduxers));
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  //createLogger(),
)(createStore);
window.store = createStoreWithMiddleware(Reduxer);


export default {
  actions: Object.assign(
    actionsHttpifFetch(),
    actionsHttpifOperation(),
    actionsNavigate(),
    actionsNotice(),
    actionsData(),
  ),
  wraps: {
    actionsDataWrap,
    actionsHttpifFetchWrap,
  },
  store: window.store,
}
