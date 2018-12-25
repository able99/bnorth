

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import ScrollSpy from './ScrollSpy';
import Panel from './Panel.Loader';


class Dropload extends React.Component{
  _handlePosChange(event, target) {
    let { isLoading, onLoad } = this.props;
    if(isLoading||!onLoad) return;

    let distance = Math.abs(target.scrollTop+target.clientHeight-target.scrollHeight);
    
    if(distance<35){
      !this.trigger&&Promise.resolve().then(()=>onLoad());
      this.trigger = true;
    }else {
      this.trigger = false;
    }
  }

  render() {
    let { 
      disabled, isLoading, onLoad, 
      component:Component=Panel.Loader, componentPanel, className, ...props 
    } = parseProps(this.props, Dropload.props);
    if(disabled) return null;
  
    let classStr = 'padding-a-';
    
    return (
      <React.Fragment>
        <ScrollSpy onPosChange={this._handlePosChange.bind(this)} />
        <Component 
          component={componentPanel} 
          position='top' isProgress={!isLoading} 
          className={classes(classStr, className)} {...props} />
      </React.Fragment>
    );
  }
}


export default Dropload;


