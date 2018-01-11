/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


function getContainerKey(app, props) {
  let key = 'ck';
  for(let route of props.routes){
    if(route.path) {
      key+='-'+route.path
    }
    if(route===props.route) {
      break;
    }
  }
  return key;
}

function getContainer(app, props, acontainer, cb) {
  if(!acontainer) return;
  let key = getContainerKey(app, props); 
  let container = acontainer[key];

  if(!container){
    container = {
      states:app.actionStates.data?{data: app.actionStates.data()}:{},
      reducers: {},
      actions:{},
      handlers: {},
    }

    if(acontainer!==true) {
      try{
        acontainer(app, props, container);
      }catch(e){
        app.error(e);
        app.errorRender(e,'container error');
      }
      acontainer[key] = container;
    }
    cb&&cb(container);
  }

  return container;
}

function statesHandler(states, event) {
  Object.entries(states||{})
  .forEach(([key,val])=>{
    if(!key||key[0]==='_') return;
    let func = val&&val[event];
    if(func)func.apply(val);
  })
}


export default function(app, acontainer) {
  if(Array.isArray(acontainer)) return connect(...acontainer);

  let mapState = (state, props)=>{
    let container = getContainer(app, props, acontainer, (container)=>{
      container.actions = bindActionCreators(container.actions, app.actionStore.dispatch);
    });

    let ret = {};
    if(!container) return ret;
    Object.entries(container.reducers||{}).forEach(([key,v])=>{
      if(v===true)ret["state_"+key] = state[v===true?key:v];
    });
    Object.entries(container.states||{}).forEach(([key,v])=>{
      ret["state_"+key] = v.state;
      for(let [skey, val] of Object.entries(v.states||{})){
        ret[`state_${key}_${skey}`] = val;
      }
    });
    return ret;
  }

  let mapDispatch = (dispatch, props)=>{
    let container = getContainer(app, props, acontainer);
    if(!container) return {app};

    return {
      app,
      container,
      states: container.states,

      onWillStart(page) {
        if(container.handlers.onWillStart)container.handlers.onWillStart(app,page,container);
      },
      onStart(page) {
        if(container.handlers.onStart)container.handlers.onStart(app,page,container);
        statesHandler(container.states, 'onStart');
      },
      onPause(page) {
        if(container.handlers.onPause)container.handlers.onPause(app,page,container);
        statesHandler(container.states, 'onPause');
      },
      onResume(page) {
        if(container.handlers.onResume)container.handlers.onResume(app,page,container);
        statesHandler(container.states, 'onResume');
      },
      onStop(page) {
        delete acontainer[getContainerKey(app, props)];
        if(container.handlers.onStop)container.handlers.onStop(app,page,container);
        statesHandler(container.states, 'onStop');
      }
    }
  }

  return connect(mapState, mapDispatch);
}

/**
 * container函数是页面组件的逻辑控制函数，为页面组件提供数据和actions 供页面组件调用
 * bnorth 会自动通过高阶函数containerHoc 进行连接
 * @function
 * @param {App} app - App 的实例
 * @param {object} props - 组件的属性
 * @param {object} container - container模板，在此函数中，扩展该属性
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 * }
 * ```
 */

/**
 * container 类，容器组件的类，用以实现逻辑
 * 通过在container 函数中，扩展container类实例的方式实现
 * @class container
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 *   container.actions.test = ()=>()=>{};
 *   container.handler.onStart = ()=>{};
 * }
 * ```
 */

/**
 * 
 * @property {state[]} states
 */

/**
 * 
 * @property {string[]} reduxers
 */

/**
 * 
 * @property {action[]} actions
 */

/**
 * 
 * @property {function[]} handler
 */