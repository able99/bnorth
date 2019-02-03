/**
 * @module
 */


/**
 * App 日志模块，提供日志功能
 * @exportdefault
 */
class Log {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  constructor(app) {
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = app._id+'.log';
    /**
     * 日志的等级
     * @type {string}
     */
    this.level = window._bnorhtEnv==='development'?'warn':'error';
  }

  _white(type, ...args) {
    let log = console&&(console[type]||console['log']);
    log&&log.apply(console, args);
  }

  _log(type, ...args) {
    if(!console||type<Log.levels[this.level]) return;
    return console[type]?console[type](...args):console.log(...args);
  }

  /**
   * 打印 debug 级别日志
   * @param  {...*} 日志 
   */
  debug(...args) { return this._log(1, ...args) }
  /**
   * 打印 info 级别日志
   * @param  {...*} 日志 
   */
  info(...args) { return this._log(2, ...args) }
  /**
   * 打印 warning 级别日志
   * @param  {...*} 日志 
   */
  warn(...args) { return this._log(3, ...args) }
  /**
   * 打印 error 级别日志
   * @param  {...*} 日志 
   */
  error(...args) { return this._log(4, ...args) }
  /**
   * 不受限制的打印日志
   * @param  {...*} 日志 
   */
  log(...args) { return this._log(Number.MAX_VALUE, ...args) }
}

Log.levels = {
  'debug': 1, 
  'info': 2, 
  'warn': 3, 
  'error': 4,
}

export default Log;