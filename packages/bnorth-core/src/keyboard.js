export default class Keyboard {
  constructor(app) {
    this.app = app;
    this.name = 'app.keyborad';
    this._listeners = [];

    this._handleKeyEvent = e=>this.handleKeyEvent(e);
    document.addEventListener('keydown', this._handleKeyEvent);
    document.addEventListener('keypress', this._handleKeyEvent);
    document.addEventListener('keyup', this._handleKeyEvent);
  }

  handleKeyEvent(e) {
    this.app.log.info('keyboard trigger', e);
    let { viewName:topViewName, pageName:topPageName } = this.app.router.focusRef||{};
    let listener = this._listeners.reverse().find(({event, callback, pageName, viewName})=>(
      (callback && e.type===event) &&
        (!viewName && !topViewName && topPageName===pageName ||
        viewName && viewName===topViewName && pageName===topPageName) 
    ))

    if(listener) listener.callback(e);
  }

  on(event, callback, {pageName, viewName}) {
    if(!event||!callback) return;
    if(this._listeners.find(({aevent, acallback})=>aevent===event&&acallback===calllback)) return;
    this._listeners.push({event, callback, pageName, viewName});
    return ()=>this.off(callback);
  }

  off(acallback) {
    let index = acallback && this._listeners.findIndex(({callback})=>acallback===callback);
    if(index>=0) this._listeners.splice(index,1);
  }

  emit(event) {
    this.handleKeyEvent(event);
  }
}