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
    this.level = process.env.NODE_ENV==='development'?'warn':'error';
    this.console = false;
    this.consoles = [];

    window.addEventListener('error', event=>{
      this.console&&this.consoles.push(['common error', event.message, event.error.stack]);
    });
    ['log', 'info', 'debug'].forEach(v=>{
      this['__'+v] = window.console[v];
      window.console[v] = (...args)=>this._log(v, ...args);
    });

    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this.console&&this.consoleOn()});
  }

  _initConsoleFab() {
    let fab = document.createElement('button');
    fab.addEventListener('click', ()=>this._initConsolePanel(true))
    fab.setAttribute('style', 'padding: 4px; margin: 4px; position: absolute; right: 0; bottom: 0;');
    fab.innerHTML = "console";
    document.body.appendChild(fab);
    this._consoleFab = fab;
  }

  _initConsolePanel(show) {
    if(!show) {
      this.consoles = [];
      this._consolePanel&&this._consolePanel.remove();
      this._consolePanel = null;
      return;
    }

    let panel = document.createElement('div');
    panel.setAttribute('style', 'background: white; padding: 4px; position: absolute; left: 0, top: 0; right: 0; bottom: 0; width: 100%; height: 100%;');
    let header = document.createElement('div');
    header.addEventListener('click', ()=>this._initConsolePanel(false))
    header.setAttribute('style', 'padding: 4px; border-bottom: 1px solid #e2e2e2;');
    header.innerText='console(点击关闭)';
    panel.appendChild(header);
    let body = document.createElement('div');
    body.setAttribute('style', 'padding: 4px; width: 100%; height: 100%; overflow-y: auto;');
    body.innerHTML = '';
    this.consoles.forEach(v=>{
      v.forEach(vv=>{ body.innerHTML += JSON.stringify(vv)+'<br />'; })
      body.innerHTML += '<br />';
    })
    panel.appendChild(body);
    document.body.appendChild(panel);
    this._consolePanel = panel;
  }

  _white(type, ...args) {
    let log = console&&(console[type]||console['log']);
    log&&log.apply(console, args);
  }

  _log(type, ...args) {
    if(!console||type<Log.levels[this.level]) return;
    for(let arg in args) args[arg]===this.app&&(args[arg]='[app]');
    this.console&&this.consoles.push(args);
    return this['__'+type]?this['__'+type](...args):this['__log'](...args);
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

  consoleOn() {
    this.console = true;
    this._initConsoleFab();
  }

  consoleOff() {
    this.console = false;
    this.consoles = [];
    this._consoleFab&&this._consoleFab.remove();
    this._consoleFab = null;
  }
}

Log.levels = {
  'debug': 1, 
  'info': 2, 
  'warn': 3, 
  'error': 4,
}

export default Log;