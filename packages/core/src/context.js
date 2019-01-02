/**
 * @module
 */
import React, { createContext } from "react";


class ContextComponent extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {};
    this.app.context.provider = this;
  }

  update(data, cb) {
    return this.setState({...this.state, ...data}, cb);
  }

  data(name) {
    let data = this.state;
    return name?data[name]:data;
  }

  render() {
    return <this.app.context.Provider value={{...this.state}}>{this.props.children}</this.app.context.Provider> ;
  }
}

/**
 * App 数据管理模块，提供数据仓库功能，实现数据管理
 * @exportdefault
 */
class Context {
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
    this._id = app._id+'.context';
    this.app.event.on(this.app._id, 'onAppStartContext', ()=>{this._createStore()});
  }

  _createStore() {
    let { Provider, Consumer } = createContext();
    this.Provider = Provider;
    this.Consumer = Consumer;

    this.consumerHoc = (
      Component=>{
        return props => (
          <this.Consumer>
            {context=><Component context={context} {...props} />}
          </this.Consumer>
        )
      }
    )

    this.app.render.component = (
      <ContextComponent app={this.app}>
        {this.app.render.component}
      </ContextComponent>
    )
    this.app.Page = this.consumerHoc(this.app.Page);
  }

  /**
   * 清除指定 id 的数据块
   * @param {string} - 数据块 id
   * @param {function} - 完成时的回调函数 
   * @returns {promise} react state 操作 promise
   */
  clear(_id, cb) {
    let state = this.provider.data();
    delete state[_id];
    return this.provider.update(state, cb);
  }

  /**
   * 更新指定 id 的数据块，使用 `app.utils.objectUpdate` 更新策略
   * @param {string} - 数据块 id
   * @param {*} - 要更新的数据
   * @param {function} - 完成时的回调函数 
   * @returns {promise} react state 操作 promise
   */
  update(_id, data, cb) {
    let state = this.provider.data();
    state[_id] = this.app.utils.objectUpdate(state[_id], data);
    return this.provider.update(state, cb);
  }

  /**
   * 设置指定 id 的数据块
   * @param {string} - 数据块 id
   * @param {*} - 要设置的数据
   * @param {function} - 完成时的回调函数 
   * @returns {promise} react state 操作 promise
   */
  set(_id, data, cb) {
    let state = this.provider.data();
    state[_id] = data;
    return this.provider.update(state, cb);
  }

  /**
   * 设置指定 id 的数据块，使用 `app.utils.objectDelete`
   * @param {string} - 数据块 id
   * @param {*} - 删除标识
   * @returns {promise} react state 操作 promise
   */
  delete(_id, _did, cb) {
    let state = this.provider.data();
    state[_id] = this.app.utils.objectDelete(state[_id], _did);
    return this.provider.update(state, cb);
  }

  /**
   * 读取指定 id 的数据块
   * @param {string} - 数据块 id
   * @param {*} - 读取失败时的默认值 
   * @param {boolean} - 读取时是否深度复制，使用 `app.utils.objectCopy` 策略
   */
  data(_id, defualtValue, deep) {
    let data = this.provider.data(_id);
    return this.app.utils.objectCopy(data===undefined?defualtValue:data, deep);
  }
}


export default Context;