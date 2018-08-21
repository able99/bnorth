import React from 'react';
import ReactDOM from 'react-dom';


export default class Render {
  constructor(app) {
    this.app = app;
    this.component = null;
    this.domWaiting = null;
    this.stopForRenderError = false;

    this.app.event.on(this.app, 'onAppStartRender', ()=>{this.renderApp()});
  }

  get domRoot() {
    return  document.querySelector(this.app.options.rootId||'#root');
  }


  critical(message, {title}={}) {
    app.log.error(message, title);
    if(this.stopForRenderError) return; this.stopForRenderError = true;
    ReactDOM.render(<div><h3>{title?app.utils.message2String(title):'error'}</h3><pre>{app.utils.message2String(message)}</pre></div>, this.domRoot);
  }
  panic(message, {title}={}) {
    app.log.error(message, title);
    app.router.pushError(message, title);
  }
  error(message, {title}={}) { alert(app.utils.message2String(message)); }
  notice(content, options) { alert(app.utils.message2String(content)); }
  mask(show, options) {}
  loading(show, options) {}

  renderApp() {
    if(this.stopForRenderError) return;

    this.domWaiting = this.domRoot.querySelector('*');
    if(!this.domWaiting) {
      this.domWaiting = document.createElement('div');
      this.domWaiting.setAttribute('style', 'text-align: center: margin-top: 48px;');
      this.domWaiting.innerText = '...';
    }
    ReactDOM.render(this.component, this.domRoot);
  }

  limitWidth(width) {
    this.domRoot.style.maxWidth = width?`${width}px`:'initial';
    this.domRoot.style.marginLeft = width?'auto':'unset';
    this.domRoot.style.marginRight = width?'auto':'unset';
  }
}