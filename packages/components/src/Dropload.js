/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import ScrollSpy from './ScrollSpy';
import { PanelLoader } from './Loader';


/**
 * 无限加载组价，滑动到底部时触发加载
 * 
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
class Dropload extends React.Component{
  render() {
    let { disabled, isLoading, onLoad, offset, ...props } = BaseComponent(this.props, Dropload);
    if(disabled) return null;
  
    let classNamePre = 'padding-a-';
    
    return (
      <React.Fragment>
        <ScrollSpy onPosChange={(event, target)=>{
          if(isLoading||!onLoad) return;
          let distance = Math.abs(target.scrollTop+target.clientHeight-target.scrollHeight);
          if(distance<offset){ !this.trigger&&onLoad(); this.trigger = true }else { this.trigger = false }
        }} />
        <Panel componentTransform={PanelLoader} position='top' isProgress={false} bc-visibility-hide={!isLoading} classNamePre={classNamePre} {...props} />
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


Object.defineProperty(Dropload,"Dropload",{ get:function(){ return Dropload }, set:function(val){ Dropload = val }})
export default Dropload;


