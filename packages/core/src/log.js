export default class Log {
  constructor(app) {
    this.app = app;
    this.level = 'debug';
  }

  _white(type, ...args) {
    let log = console&&(console[type]||console['log']);
    log&&log.apply(console, args);
  }

  _log(type, ...args) {
    type>=Log.levels[this.level] && console.log(...args);
  }

  verbose(...args) { return this._log(1, ...args) }
  info(...args) { return this._log(2, ...args) }
  debug(...args) { return this._log(3, ...args) }
  warning(...args) { return this._log(4, ...args) }
  error(...args) { return this._log(5, ...args) }
  log(...args) { return this._log(Number.MAX_VALUE, ...args) }
}

Log.levels = {
  'verbose': 1,
  'info': 2, 
  'debug': 3, 
  'warning': 4, 
  'error': 5,
}