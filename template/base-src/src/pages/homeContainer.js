import { connect } from 'react-redux'

import Actions from '../bnorth/actions/';

export default connect(
  (state,ownProps)=>{
    return {};
  },
  (dispatch,ownProps)=>{
  	let funcs = {

  	};
    return Object.assign(
    	Actions.actions,
    	{funcs},
    	{wrapFetch: Actions.wraps.actionsHttpifFetchWrap("http://www.weather.com.cn/data/sk/101010100.html")},
    	{wrapData: Actions.wraps.actionsDataWrap(__filename,{})},
    );
  },
);
