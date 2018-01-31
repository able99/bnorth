/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import { connect } from 'react-redux'
import bindActionCreators from '../utils/bindActionCreators';

/*!
 * get container unique key, diff key diff params or querys
 * @function
 * @param {App} app - instance of App class
 * @param {object} props - props for component
 */
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

/*!
 * creator or getter (if exist) of the container
 * @function
 * @param {App} app - instance of App class
 * @param {object} props - props for component
 * @param {function} container - the container function
 * @callback cb
 */
function getContainer(app, props, acontainer, cb) {
  if(!acontainer) return;
  let key = getContainerKey(app, props); 
  let container = acontainer[key];

  if(!container){
    container = {
      states:{
        data: app.actionStates.data&&app.actionStates.data({}),
        _page: app.actionStates.data({initData:{
          layers: [],
        }}), 
      },
      reducers: {},
      actions:{},
      handlers: {},
      trigger(event, ...args) {
        let handler = container&&container.handlers&&container.handlers[event];
        if(!handler) return false;
        let title = `container handler(${event}-${container.displayName||''}):`;
        try{
          app.verbose(title, ...args);
          handler(...args);
        }catch(e){
          this.error(title, e); 
          app.errorNotice(e);
        }
      }
    }

    if(acontainer!==true) {
      try{
        acontainer(app, props, container);
        Object.entries(container.states||{}).forEach(([k,v])=>v&&(v.name=k))
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


/*!
 * create container use container function
 * @function
 * @param {App} app - instance of App class
 * @param {function} container - container function
 */
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
        container.displayName = page.getDisplayName();
        container.trigger('onWillStart', page);
        Object.entries(container.states||{}).forEach(([k,v])=>v.displayName = page.getDisplayName());
      },
      onStart(page) {
        container.trigger('onStart', page);
        Object.entries(container.states||{}).forEach(([k,v])=>v.trigger('onStart'));
      },
      onResume(page) {
        container.trigger('onResume', page);
        Object.entries(container.states||{}).forEach(([k,v])=>v.trigger('onResume'));
      },
      onPause(page) {
        container.trigger('onPause', page);
        Object.entries(container.states||{}).forEach(([k,v])=>v.trigger('onPause'));
      },
      onStop(page) {
        delete acontainer[getContainerKey(app, props)];
        container.trigger('onStop', page);
        Object.entries(container.states||{}).forEach(([k,v])=>v.trigger('onStop'));
      }
    }
  }

  return connect(mapState, mapDispatch);
}


/**
 * bnorth 中页面container 组件，页面的容器类，负责页面的逻辑部分
 * 实现container 函数后，由containerHoc 进行转换
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
 * state 列表
 * @property {state[]} states
 */

/**
 * 数据仓库中数据映射列表，
 * 指定仓库中的reduxer名字的数据，会被映射到 页面Page props 中
 * @property {string[]} reduxers
 */

/**
 * action 函数列表
 * @property {action[]} actions
 */

/**
 * 事件处理函数列表
 * @property {function[]} handlers
 */


/**
 * container函数是页面组件的逻辑控制函数，为页面组件提供数据和actions 供页面组件调用
 * bnorth 会通过containerHoc 进行转换
 * **states**：
 * state 是bnroth 的概念，是数据的管理器，每个管理器有自己的名字。bnorth 提供了一些数据管理器，并将管理器的创建函数放在app.actionStates 中，比如页面数据管理器 data 等。
 * state 的建立，用数据管理器创建函数建立好，并添加到states中
 * ```js
 * container.states.data = app.actionStates.data({});
 * ```
 * state 的数据访问
 * ```js
 * this.props.state_data
 * ```
 * state 管理器的访问
 * ```js
 * this.props.states.data      // 在页面Page 中
 * container.props.states.data // 在页面container function 中
 * ```
 * 编写新的数据管理器
 * 1. 建立class
 * 1. 实现state 函数，该函数返回的数据将会被映射到props.state_{name}
 * 1. 实现states 函数，该返回对象，对象中的每个键值对的值将被逐一映射到 props.state_{name}_{key}
 * 1. 根据需要实现页面生命周期函数的回调函数
 * 
 * **reduxers**：
 * reduxer 映射列表，reduxer是redux 的概念，redux 通过多个reduxer 将仓库分为不同部分，每个reduxer 有自己的名字。映射列表中的字符串即为redxuer 的名字列表。
 * 设置后，数据仓库中对应的数据，将被映射到页面page 的props 中。
 * **actions**：
 * 供页面调用的action 函数添加到模板的actions 中，action 是redux 的概念，符合 redux-trunk 标准。
 * 定义
 * ```js
 * container.actions.test = (args)=>()=>{
 *   ...
 * };
 * ```
 * 页面Page 中使用
 * ```js
 * this.props.container.actions.test(args)
 * ```
 * **handlers**：
 * 与事件同名的处理函数添加到container 模板的handlers 中，事件触发时，该函数将会被调用。
 * 事件包括，app 触发的事件与组件的生命周期事件，包括：
 * onWillStart(page) - 页面将要启动时触发，参数page 为页面Page 实例
 * onStart(page) - 页面启动时触发，参数page 为页面Page 实例
 * onPause(page) - 页面失去焦点启动时触发，参数page 为页面Page 实例
 * onResume(page) - 页面获取焦点时触发，参数page 为页面Page 实例
 * onStop(page) - 页面关闭时触发，参数page 为页面Page 实例
 * @function contianerFunction
 * @param {App} app - App 的实例
 * @param {object} props - 页面的属性
 * @param {object} container - container模板，在此函数中，扩展该属性
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 * }
 * ```
 */