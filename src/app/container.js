/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import { connect } from 'react-redux'
import bindActionCreators from '../utils/bindActionCreators';
import getUuid from '../utils/uuid';
import getOptions from '../utils/getOptions';


// redux
// --------------------------------------------------------
/**
 * action 在bnorth 中分为数据型action 函数和动作型action 函数
 * 数据型action 函数需要返回一个对象，对象必须包含type 属性，作为reduxer 处理的分发标志
 * 动作型action 函数需要返回一个闭包函数，在分发时会直接运行
 * @function action
 * @example
 * **数据型action**
 * ```js
 * let action = ()=>{
 *   return {
 *     type: 'type',
 *     ......
 *   }
 * }
 * ```
 * **动作型action**
 * ```js
 * let action = (args)=>(app)=>{
 *   ......
 * }
 * ```
 */

/**
 * reduxer 是redux 数据仓库的处理器，处理数据型action 返回处理后的仓库数据，多个reduxer 可以将数据仓库分割管理
 * @function reduxer
 * @example
 * ```js
 * let redux = function( state, action ) {
 *   if(action.type==='type')
 *     ...... // 对state 数据进行操作
 *   return state;
 * }
 * ```
 */

/**
 * ActionState 是数据的管理器的基类，用来代替react state 和redux 的connect
 * 管理器的创建函数放在app.actionStates 中，比如页面数据管理器 data 等
 * 数据管理器被添加到container 的states 中，通过数据管理器操作数据，将引起container 对应的page 属性改变和页面刷新
 * 编写新的数据管理器
 * 1. 建立class
 * 1. 实现state 函数，该函数返回的数据将会被映射到props.state_{name}
 * 1. 实现states 函数，该返回对象，对象中的每个键值对的值将被逐一映射到 props.state_{name}_{key}
 * 1. 根据需要实现页面生命周期函数的回调函数
 * @class ActionState
 */
export class ActionState{
  static maps = {};

  static getClassName(claxx) {
    return claxx&&(claxx.stateName||claxx.name);
  }

  static getInstance(claxx,uuid) {
    let className = ActionState.getClassName(claxx);
    let maps = ActionState.maps[className];
    return maps && maps[uuid];
  }

  static deleteInstance(claxx, uuid) {
    let className = ActionState.getClassName(claxx);
    let maps = ActionState.maps[className];

    delete maps[uuid];
  }

  static instance(claxx,app,uuid,options) {
    uuid = uuid||getUuid();
    let className = ActionState.getClassName(claxx);

    if(!ActionState.maps[className]) ActionState.maps[className] = {};
    let instance = ActionState.maps[className][uuid] || new claxx(app, uuid, getOptions(options));
    instance.className = className;
    ActionState.maps[className][uuid] = instance;
    return instance;
  }

  constructor(app, uuid){
    this.name='';
    this.app = app;
    this.uuid = uuid;
  }

  get state() { 
    return null;
  }

  get states() { 
    return null;
  }

  trigger(event, ...args) {
    let handler = this[event];
    if(!handler) return;
    let title = `state event(${event}-${this.className}-${this.name}:`;
    try{
      this.app.verbose(title, ...args);
      return handler.apply(this, args);
    }catch(e){
      this.app.error('state handler', e); 
      this.app.errorNotice(e);
    }
  }
}


// container
// --------------------------------------------------------
/**
 * 页面container 的基类，即页面的容器类，负责页面的逻辑部分<br />
 * @class BaseContainer
 */
export class BaseContainer{
  static maps = {};

  /**
   * 建立或者获取container 的单实例
   * @method
   * @static
   * @param {App} app - instance of App class
   * @param {object} props - props for page component
   * @param {function} containerCreator - the container creator function
   * @param {string} name - container name
   * @callback cb
   */
  static instance(app, props, containerCreator, key, cb) {
    let container = BaseContainer.maps[key];
  
    if(!container){
      container = new BaseContainer(key);
      if(typeof containerCreator === 'function') {
        try{
          containerCreator(app, props, container);
          Object.entries(container.states||{}).forEach(([k,v])=>v&&(v.name=`${key}~${k}`))
        }catch(e){
          app.error(e);
          app.errorRender(e,'container error');
        }
        BaseContainer.maps[key] = container;
      }
      cb&&cb(container);
    }
  
    return container;
  }

  /**
   * container 是工厂创建模式，不能直接实例化，而是设计containerCreator ，并设为route 的container 参数，之后app 会通过containerConnect，创建并连接到page
   * @constructor
   * ```js
   * export default function(app, props, container) {
   *   container.states.data = app.actionStates.data({});
   *   container.actions.test = ()=>()=>{};
   *   container.handler.onStart = ()=>{};
   * }
   * ```
   */
  constructor(key, name) {
    /**
     * @property {string} key - container unique key
     */
    this.key = key;

    /**
     * 
     * @property {actionState[]} states - state 列表<br />
     * state 的建立
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
     */
    this.states = {
      data: app.actionStates.data&&app.actionStates.data({}),
      _page: app.actionStates.data({initData:{
        layers: [],
      }}), 
    };

    /**
     * @property {string[]} reduxers - reduxer 映射列表，将redux 仓库中的对应名字的数据映射到页面props 中。
     */
    this.reducers = {};

    /**
     * @property {action[]} actions - action 函数列表<br />
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
     */
    this.actions = {};

    /**
     * @property {function[]} handlers - 事件处理函数列表，事件包括:<br />
     * app 事件 -  app 事件
     * 用户事件 - 通过app.trigger 函数发送的自定义事件
     * onWillStart(page) - 页面将要启动时触发，参数page 为页面Page 实例
     * onStart(page) - 页面启动时触发，参数page 为页面Page 实例
     * onPause(page) - 页面失去焦点启动时触发，参数page 为页面Page 实例
     * onResume(page) - 页面获取焦点时触发，参数page 为页面Page 实例
     * onStop(page) - 页面关闭时触发，参数page 为页面Page 实例
     */
    this.handlers = {};
  }
  
  /**
   * 触发container 事件处理
   * @method
   * @param {string} event  - 事件名称
   * @param {...*} [args] - 事件参数 
   */
  trigger(event, ...args) {
    let handler = this.handlers[event];
    if(!handler) return false;
    let title = `container handler(${event}-${this.key}):`;
    try{
      app.verbose(title, ...args);
      handler(...args);
    }catch(e){
      app.error(title, e); 
      app.errorNotice(e);
    }
  }

  /**
   * 清除container
   * @method
   */
  clear() {
    delete BaseContainer.maps[this.key];
  }
}


/**
 * container 生成函数，用户通过该函数，完成对container 的扩展与定制，实现业务逻辑
 * 
 * @function containerCreator
 * @param {App} app - instance of App class
 * @param {object} props - instance of App class
 * @param {BaseContainer} container - instance of App class
 * @example
 * ```js
 * export default function(app, props, container) {
 *   container.states.data = app.actionStates.data({});
 * }
 * ```
 */

/**
 * container 连接函数，负责通过container 生成器转换出高阶组件，实现页面的逻辑
 * @function containerConnect
 * @param {App} app - instance of App class
 * @param {function|array} containerCreator - container creator function<br />
 * **function**: 将函数视为container 生成函数
 * **array**: 如果参数为数组，数组中的元素会按顺序，作为[react-redux](https://github.com/reactjs/react-redux) 的connect 函数参数，使用redux 实现container
 * @param {string} name - container name, and for unity id
 * @return {BaseContainer} - container
 */
export function containerConnect(app, containerCreator, name) {
  if(Array.isArray(containerCreator)) return connect(...containerCreator);

  let mapState = (state, props)=>{
    let container = BaseContainer.instance(app, props, containerCreator, name, (container)=>{
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
    let container = BaseContainer.instance(app, props, containerCreator, name);
    if(!container) return {app};

    return {
      app,
      container,
      states: container.states,

      onWillStart(page) {
        container.trigger('onWillStart', page);
      },
      onStart(page) {
        container.trigger('onStart', page);
        Object.entries(container.states||{}).forEach(([k,v])=>k[0]!=='_'&&v.trigger('onStart'));
      },
      onResume(page) {
        container.trigger('onResume', page);
        Object.entries(container.states||{}).forEach(([k,v])=>k[0]!=='_'&&v.trigger('onResume'));
      },
      onPause(page) {
        container.trigger('onPause', page);
        Object.entries(container.states||{}).forEach(([k,v])=>k[0]!=='_'&&v.trigger('onPause'));
      },
      onStop(page) {
        container.clear(props, containerCreator);
        container.trigger('onStop', page);
        Object.entries(container.states||{}).forEach(([k,v])=>k[0]!=='_'&&v.trigger('onStop'));
      }
    }
  }

  return connect(mapState, mapDispatch);
}


