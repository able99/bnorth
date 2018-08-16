import React from 'react';


export default class View extends React.Component {
  render() {
    let { app, name, children, ...props } = this.props;
    app.log.info('view render', name);
    
    return <div data-view={name} {...props}>{children}</div>;
  }
}