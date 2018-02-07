/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * router 模块完全来至于[react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)，并扩展了route 组件的属性
 * Router,Route,hashHistory,RouterContext,etc...
 * @module router
 */

/**
 * @class location
 * @property {string} action - 当前地址进入方式，POP|PUSH
 * @property {string} pathname - 当前地址的路径名
 * @property {object} query - 当前地址对应的query 对象
 * @property {string} hash - 当前地址的hash 字符串
 * @property {string} search - 当前地址的search 字符串
 * @property {string} key - 当前地址state 信息的key 值
 * @property {object} state - 当前地址的state 对象
 */

/**
 * react router
 * @class router
 */

/**
 * 配置路由信息组件
 * @class Route
 * @example
 * ```js
 * <Route 
 *   key="order" 
 *   page={require('pages/order')}
 *   container={require('pages/_order')} />
 * ```
 */

/**
 * @property {!string} key - 组件主键
 */

/**
 * @property {string} [path=null] - 路由的匹配路径，如果设置为空将从key 属性智能获取
 * ```js
 * AAA - 匹配路径AAA
 * AAA/:id - 匹配路径AAA/xxx，匹配带xxx参数的AAA
 * ````
 */

/**
 * @property {string} [pathname=null] - 设置到config.paths 中的名称，如果不指定则从path或者key中智能获取，比如key='order/:id',则pathname 为order
 * @default null
 */

/**
 * @property {element} component - component参数会自动进行pageHoc 高阶函数转换
 */

/**
 * @property {containerCreator} [container=null] contianer参数会自动进行containerHoc 高阶函数转换
 */

/**
 * 动态加载页面组件时的回调函数
 * @callback getComponent
 * @param {object} nextState - 页面属性
 * @param {function} callback - 页面加载完成后，通过函数返回
 * @example
 * ```js
 * <Route path="xxx" getComponent={(nextState, cb) => {
 *   require.ensure([], function() {
 *     let page = require(xxx);
 *     let container = require(xxx);
 *     cb(null, createRouteComponent(page, container))
 *   })
 * }} />
 * ```
 */

/**
 * @property {object} components 组件组，具体参见react router
 * ```js
 * <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
 * ```
 */

/**
 * 动态加载组件组，具体参见react router
 * @callback getComponents
 */

/**
 * 根路由被加载时，被调用
 * @callback onInit
 */

/**
 * @property {boolean} [checkLogin=false] - 设置后，进入页面时，如果没登录，将会跳转到登录页面
 */
/**
 * @property {boolean} [restartOnParamChange=false] 设置后，param 改变将引起container 重置
 */
/**
 * @property {boolean} [restartOnQueryChange=false] 设置后，query 改变将引起container 重置
 */
/**
 * @property {string} [purpose=null] 设置后，将除pathname 外，还将设置config.paths[purpose]的路径
 */


export * from 'react-router';