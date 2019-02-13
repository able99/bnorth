/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import ScrollSpy from './ScrollSpy';
import Panel from './Panel';
import './Loader';


/**
 * 无限加载组价，滑动到底部时触发加载
 * 
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
class Dropload extends React.Component{
  _handlePosChange(event, target) {
    let { isLoading, onLoad, offset=35 } = this.props;
    if(isLoading||!onLoad) return;

    let distance = Math.abs(target.scrollTop+target.clientHeight-target.scrollHeight);
    
    if(distance<offset){
      !this.trigger&&onLoad();
      this.trigger = true;
    }else {
      this.trigger = false;
    }
  }

  render() {
    let { 
      disabled, isLoading, onLoad, offset,
      component:Component=Panel.Loader, className, ...props 
    } = BaseComponent(this.props, Dropload);
    if(disabled) return null;
  
    let classStr = 'padding-a-';
    
    return (
      <React.Fragment>
        <ScrollSpy onPosChange={this._handlePosChange.bind(this)} />
        <Component 
          position='top' isProgress={false} bc-visibility-hide={!isLoading}
          className={classes(classStr, className)} {...props} />
      </React.Fragment>
    );
  }
}


Dropload.defaultProps = {};
/**
 * 设置是否为可用状态
 * @attribute module:Dropload.Dropload.disabled
 * @type {boolean}
 */
/**
 * 设置是否正在加载中
 * @attribute module:Dropload.Dropload.isLoading
 * @type {boolean}
 */
/**
 * 设置触发加载的回调函数
 * @attribute module:Dropload.Dropload.onLoad
 * @type {function}
 */
/**
 * 设置距离底部的距离，当即将滚动到底部，小于该距离时触发加载
 * @type {number|string}
 */
Dropload.defaultProps.offset = 35;
/**
 * 参见 BaseComponent
 */
Dropload.defaultProps.component = Panel.Loader;


export default Dropload;


