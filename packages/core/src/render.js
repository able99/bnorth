/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * App render 模块，负责 react 根组件描绘和 dom 控制，以及提供通用的描绘工具函数
 * @exportdefault
 */
class Render {
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
    this._id = app._id+'.render';
    /**
     * react 根组件
     * @type {component|element}
     */
    this.component = null;
    /**
     * 用于等待中显示的 dom 元素，用户可设置，默认使用 react 根元素渲染前的根元素上的元素，如果没有则建立一个默认的元素
     * @type {element}
     */
    this.domWaiting = null;
    /**
     * 设置因错误关闭 react 绘制的标志位
     * @type {boolean}
     */
    this.stopForRenderError = false;
    this._elementIdRandom = 0;

    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this._renderRootComponent()});
  }

  /**
     * react 渲染到的根元素，通过 app.options.rootId 配置，默认使用 '#root' 获取根元素
     * @type {component|element}
     */
  get domRoot() {
    return  document.querySelector(this.app.options.rootId||'#root');
  }

  // private work
  // -------------------
  _renderRootComponent() {
    if(this.stopForRenderError) return;

    this.domWaiting = this.domRoot.querySelector('*');
    if(!this.domWaiting) {
      this.domWaiting = document.createElement('div');
      this.domWaiting.setAttribute('style', 'text-align: center: margin-top: 48px;');
      this.domWaiting.innerText = '...';
    }
    ReactDOM.render(
      <this.app.context.Component app={this.app}>
        <this.app.router.Component app={this.app} />
      </this.app.context.Component>, 
      this.domRoot
    );
  }


  // interface
  // -------------------
  /**
   * 错误处理，严重级别，将停止 react 对跟元素的绘制，并将错误信息显示在跟元素上
   * @param {error|string|object} - 错误信息 
   * @param {object} options - 参数信息，包括错误的标题 title
   */
  critical(message, {title}={}) {
    this.app.log.error(message, title);
    if(this.stopForRenderError) return; this.stopForRenderError = true;
    ReactDOM.render(<div><h3>{title?this.app.utils.message2String(title):'error'}</h3><pre>{this.app.utils.message2String(message)}</pre></div>, this.domRoot);
  }

  /**
   * 错误处理，普通级别，将跳转到路由模块的错误页面，可返回或者刷新
   * @param {error|string|object} - 错误信息 
   * @param {object} options - 参数信息，包括错误的标题 title，页面 id 
   */
  panic(message, {title, _id}={}, ) {
    this.app.log.error(message, title);
    this.app.router.error(message, title, _id);
  }

  /**
   * 显示错误信息，未实现功能，由插件负责功能完善
   * @param {number|string|component|element} - 提示的内容 
   * @param {object} - 参数，与实现者具体定义 
   */
  error(message, props, options) { this.modalShow(this.app.utils.message2String(message)); }

  /**
   * 显示提示信息，未实现功能，由插件负责功能完善
   * @param {number|string|component|element} - 提示的内容 
   * @param {object} - 参数，与实现者具体定义 
   */
  notice(content, props, options) { this.modalShow(this.app.utils.message2String(content)); }

  /**
   * 显示阻塞式遮罩，未实现功能，由插件负责功能完善
   * @param {boolean} - 开启或者关闭
   * @param {object} - 参数，与实现者具体定义 
   */
  mask(show, props, options) {}

  /**
   * 显示进度条，未实现功能，由插件负责功能完善
   * @param {boolean} - 开启或者关闭
   * @param {object} - 参数，与实现者具体定义 
   */
  loader(show, props, options) {}

  /**
   * 显示模态对话框
   * @param {boolean} - 开启或者关闭
   * @param {object} - 参数，与实现者具体定义 
   * @returns {string} id
   */
  modalShow(content, props, options) { alert(content) }

  /**
   * 关闭模态对话框
   * @param {string} - id
   */
  modalClose(_id) {}

  /**
   * 限制 render 宽度
   * @param {string|number} 限制的宽度，为空或者0，取消限制 
   */
  limitWidth(width) {
    this.domRoot.style.maxWidth = width?`${width}px`:'initial';
    this.domRoot.style.marginLeft = width?'auto':'unset';
    this.domRoot.style.marginRight = width?'auto':'unset';
  }

  addElement(tag="div", attrs={}) {
    let id = this._elementIdRandom++;
    let element = document.createElement(tag);
    attrs['data-popelement'] = id;
    Object.entries(attrs).map(([k,v])=>element.setAttribute(k,v));
    return id;
  }

  getElement(_id) {
    return document.querySelector('[data-popelement="'+_id+'"]');
  }

  removeElement(_id) {
    let element = this.getElement(_id);
    element&&element.remove();
  }
}


export default Render;