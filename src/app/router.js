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
 * react组件，继承于[react-router 3](https://github.com/ReactTraining/react-router/tree/v3/docs)，并扩展了若干属性
 * @class Route
 * @example
 * ```js
 * <Route key="order" />
 * ```
 */

/**
 * @property {!string} key - react key参数
 */
/**
 * @property {string} [path=null] - [react router 3属性](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#route)， 路由的匹配路径，如果设置为空将从key 属性智能获取
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
 * @property {element} component - react component, 会自动进行pageHoc 高阶函数转换
 */
/**
 * @property {container} [container=null] contianer，会自动进行containerHoc 高阶函数转换
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