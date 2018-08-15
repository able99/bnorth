import React, { createContext } from "react";


class ContextComponent extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {};
    this.app.context.provider = this;
  }

  update(data) {
    this.setState({...this.state, ...data});
  }

  data(name) {
    let data = this.state;
    return name?data[name]:data;
  }

  render() {
    return (
      <this.app.context.Provider value={{...this.state}}>
        {this.props.children}
      </this.app.context.Provider>
    );
  }
}

export default class Context {
  constructor(app) {
    this.app = app;
    this.app.event.on(this.app, 'onAppStartContext', ()=>{this.createStore()});
  }

  createStore() {
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

  stateInit(name, data) {
    let adata = this.provider.data();
    adata[name] = data;
    return this.provider.update(adata);
  }

  stateUpdate(name, data) {
    let adata = this.provider.data();
    adata[name] = this.app.utils.objectUpdate(adata[name], data);
    return this.provider.update(adata);
  }

  stateClean(name) {
    let data = this.provider.data();
    delete data[name];
    return this.provider.update(data);
  }

  stateData(name, defualtValue) {
    return this.provider.data(name)||defualtValue;
  }
}