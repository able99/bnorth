/**
 * @module
 */


/**
 * 键盘按下
 * @event module:keyboard.Keyboard#keydown
 * @property {event} - 键盘事件
 */

/**
 * 键盘产生可见字符
 * @event module:keyboard.Keyboard#keypress
 * @property {event} - 键盘事件
 */

/**
 * 键盘抬起
 * @event module:keyboard.Keyboard#keyup
 * @property {event} - 键盘事件
 */


/**
 * App 键盘事件管理模块，统一管理键盘事件
 * @exportdefault
 */
class Keyboard {
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
    this._id = app._id+'.keyboard';
    this._listeners = [];

    this._handleKeyEventWork = e=>this._handleKeyEvent(e);
    document.addEventListener('keydown', this._handleKeyEventWork);
    document.addEventListener('keypress', this._handleKeyEventWork);
    document.addEventListener('keyup', this._handleKeyEventWork);
  }

  _handleKeyEvent(e) {
    this.app.event.emit(this.app._id, 'onKeyEvent', e);
    let poplayerInfos = this.app.router.getPoplayerInfos();

    for(let poplayerInfo of [...poplayerInfos.filter(v=>v.options.isModal&&!v.options._idPage)].reverse()) {
      let poplayer = this.app.Poplayer.getPoplayer(poplayerInfo._id); if(!poplayer) continue;
      if(poplayer._onKeyEvent&&poplayer._onKeyEvent(e)) { e.preventDefault();e.stopPropagation();return }
    }

    let page = this.app.Page.getPage();
    for(let poplayerInfo of [...poplayerInfos.filter(v=>v.options.isModal&&v.options._idPage===page._id)].reverse()) {
      let poplayer = this.app.Poplayer.getPoplayer(poplayerInfo.options._id); if(!poplayer) continue;
      if(poplayer._onKeyEvent&&poplayer._onKeyEvent(e)) { e.preventDefault();e.stopPropagation();return }
    }
    if(page._onKeyEvent&&page._onKeyEvent(e)) { e.preventDefault();e.stopPropagation();return }
  }
}


export default Keyboard;