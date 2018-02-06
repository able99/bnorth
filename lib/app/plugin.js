/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * 插件实现回调函数，app 触发相应时间时被调用，完成对app 的初始化和配置及实现特定的功能
 * 回调函数可能是初始化函数，启动阶段的各个函数或者由app，页面或者其他插件trigger 的事件
 * @class plugin
 * @example
 * ```js
 * let plugin = {
 *   name: 'xxx',
 *   dependence: 'yyy',
 *   init(app) {
 *     ... 
 *   },
 *   onZZZ(app) {
 *     ... 
 *   }
 * }
 * ```
 */

/**
 * @property {string} name - 插件名称，同名称插件不能同时使用
 */

/**
 * @property {string|string[]} dependence - 该插件依赖的插件或插件列表
 */

/**
 * 当插件被安装到app 时触发，该阶段可以初始化插件和修改app 的内容
 * @callback init
 * @param {App} app - 应用程序App的实例
 */

/**
 * 当启动阶段中，进入配置过程前触发，该阶段可以从网络获取配置信息
 * @callback onConfigBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入配置过程时触发，该阶段可以增加和修改app 的默认配置
 * @callback onConfig
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入css 样式加载过程时触发，该阶段可以从网络引入css 样式文件
 * @callback onImportStyles
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成css 样式加载过程时触发，该阶段可以对加载后的css 样式进行覆盖修改和添加新的css 样式
 * @callback onImportStylesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入数据仓库建立阶段前触发，该阶段每个应用可以将action 或者 reduxer 添加进来，丰富app 的功能
 * @callback onCreateStoreBefore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入仓库建立阶段触发，app plugin 在该阶段完成数据仓库的建立，各个应用一般无需参与
 * @callback onCreateStore
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成仓库建立阶段后触发，
 * @callback onCreateStoreAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，进入路由配置阶段时触发，每个应用必须实现该回调函数，并设置app.routes 参数，app 才可以正常运行
 * @callback onImportRoutes
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段中，完成路由配置阶段时触发，该阶段可以修改由路由生成的app.config.paths 的路径信息
 * @callback onImportRoutesAfter
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当在启动过程进入hook 阶段时触发，该阶段可以修改app 的默认行为
 * @callback onHook
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束，开始react 渲染时触发，app plugin 将会负责渲染，各个应用一般无需参与
 * @callback onRender
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当启动阶段结束后，进入应用运行阶段，应用将要启动时触发
 * @callback onAppWillStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已完成启动时触发
 * @callback onAppStart
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用已停止时触发
 * @callback onAppStop
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用从后台返回时触发，仅混合开发时有效
 * @callback onAppResume
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当应用切换到后台时触发，仅混合开发时有效
 * @callback onAppPause
 * @param {App} app - 应用App 的实例
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当页面组件render错误时触发
 * @callback onErrorPageRender
 * @param {App} app - 应用App 的实例
 * @param {Error} error - 页面render 的异常信息对象
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当准备导航到新的页面时触发，返回path，将重定向到制定地址
 * @callback onNavigating
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {string} - 返回需要阻止，并替换当前导航的地址，同时将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航到新的页面时触发
 * @callback onNavigated
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当当前导航被阻止时触发
 * @callback onNavigatePrevent
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 router-render函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当导航出错时触发，比如无法匹配的导航路径等问题
 * @callback onErrorNavigator
 * @param {App} app - 应用App 的实例
 * @param {object} nextState - 页面路由信息，参见[react-router3 route-onEnter函数]()
 * @param {function} replace - 调用后可重定向路径的函数，参见[react-router3 route-onEnter函数]()
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要打印日志时触发
 * @callback onLog
 * @param {App} app - 应用App 的实例
 * @param {string} type - debug|error|verbose，表示日志的等级
 * @param {boolean} trace - 是否打印trace
 * @param {...*} args - 日志的列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以页面render方式显示信息时触发
 * @callback onRenderMessage
 * @param {App} app - 应用App 的实例
 * @param {string} title - 消息的标题
 * @param {...*} [args] - 消息列表
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */

/**
 * 当需要以notice方式显示信息时触发
 * @callback onNoticeMessage
 * @param {App} app - 应用App 的实例
 * @param {element|string} message - 显示的消息
 * @param {object} [props] - 消息显示的ui 属性
 * @param {object} [options] - 消息显示的配置属性
 * @return {boolean} - 返回true，将不会触发插件列表中位于其后的插件回调
 */
"use strict";