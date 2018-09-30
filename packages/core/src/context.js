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


export default class Context {
  constructor(app) {
    this.app = app;
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

  clear(_id, cb) {
    let state = this.provider.data();
    delete state[_id];
    return this.provider.update(state, cb);
  }

  update(_id, data, cb) {
    let state = this.provider.data();
    state[_id] = this.app.utils.objectUpdate(state[_id], data);
    return this.provider.update(state, cb);
  }

  set(_id, data, cb) {
    let state = this.provider.data();
    state[_id] = data;
    return this.provider.update(state, cb);
  }

  delete(_id, _did, cb) {
    let state = this.provider.data();
    state[_id] = this.app.utils.objectDelete(state[_id], _did);
    return this.provider.update(state, cb);
  }

  data(_id, defualtValue, deep) {
    let data = this.provider.data(_id);
    return this.app.utils.objectCopy(data===undefined?defualtValue:data, deep);
  }
}