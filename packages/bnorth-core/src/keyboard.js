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
    let listener = this._listeners.reverse().find(({event, callback, name})=>(callback && e.type===event && this.app.router.focusName === name));
    if(listener) listener.callback(e);
  }

  on(name, event, callback) {
    if(!event||!callback||!name) return;
    if(this._listeners.find(listener=>listener.event===event&&listener.callback===callback&&listener.name===name)) return;
    this._listeners.push({event, callback, name});
    return ()=>this.off(callback);
  }

  off(item) {
    if(typeof item === 'string') {
      this._listeners.forEach((listener,i)=>{if(listener.name===item) this._listeners.splice(i,1)});
    }else if(typeof item === 'function') {
      let index = this._listeners.findIndex(listener=>listener.callback===item);
      if(index>=0) this._listeners.splice(index,1);
    }
  }

  emit(event) {
    this.handleKeyEvent(event);
  }
}