import React from 'react';


export class AppComponentPage extends React.Component{
  componentWillUpdate(nextProps, nextState) {
    //if(!this.props.state_app.ready && nextProps.state_app.ready){
      this.app.removeWaiting();
    //}
  }

  render() {
    return this.props.state_app.ready? (
      <div>
        {this.props.children}
        {this.props.state_app.layers}
      </div>
    ):null;
  }
}

export let appComponentContainer = function(app, props, container) {
  container.reducers.app = true;

  container.handlers.onWillStart = ()=>{
    app.trigger('onAppWillStart');
  };
  container.handlers.onStart = ()=>{
    app.trigger('onAppStart');
  };
  container.handlers.onStop = ()=>{
    app.trigger('onAppStop');
  };
  container.handlers.onResume = ()=>{
    app.trigger('onAppResume');
  };
  container.handlers.onPause = ()=>{
    app.trigger('onAppPause');
  };
}
