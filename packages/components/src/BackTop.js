/**
 * @module
 */
import React from 'react';
import BaseComponent, { domOffset, chainedFuncs } from './BaseComponent';
import Panel from './Panel';
import ScrollSpy from './ScrollSpy';
import Fab from './Fab';
import { PanelIcon } from './Icon';


/**
 * 返回顶部的小组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Fab.Fab
 * @augments module:PanelIcon~PanelIcon
 */
class BackTop extends React.Component {
  scrollToTop() { if(this.dock)this.dock.scrollTop=0 }
  isShow() { return this.state&&this.state.isShow; }
  toggle() { this.isShow()?this.hide():this.show(); }
  show() { !this.isShow()&&this.setState({isShow: true}) }
  hide() { this.isShow()&&this.setState({isShow: false}) }

  render() {
    let {
      onClick, checkFunc, checkParam, scrollSpyProps, contentProps,
      children, ...props
    } = BaseComponent(this.props, BackTop);

    return (
      <React.Fragment>
        <ScrollSpy 
          onPosChange={(event, el)=>{
            this.dock = el;
            checkFunc(checkParam, this.dock)?this.show():this.hide();
          }} 
          {...scrollSpyProps} />
        {this.isShow()?(
          <Panel componentTransform={Fab} onClick={chainedFuncs(()=>this.scrollToTop(), onClick)} {...props} >
            <Panel componentTransform={PanelIcon} name="backTop:^" {...contentProps}>{children}</Panel>
          </Panel>
        ):null}
      </React.Fragment>
    )
  }
}

BackTop.defaultProps = {};
/**
 * 设置出现时机的计算函数
 * @type {function}
 */
BackTop.defaultProps.checkFunc = function(checkParam, dock) {
  if(!isNaN(checkParam)){
    return dock.scrollTop>=(checkParam);
  }else if(typeof(checkParam)==='string'&&/\d*%/.test(checkParam)){
    return dock.scrollTop>=(dock?domOffset(dock).height*Number(checkParam.slice(0,-1))/100:0);
  }
}
/**
 * 设置出现时机的计算参数
 * @type {number|string}
 */
BackTop.defaultProps.checkParam="100%";
/**
 * 设置滚动监控组件的属性
 * @attribute module:BackTop.scrollSpyProps
 * @type {object}
 */
/**
 * 设置内容的属性
 * @attribute module:BackTop.contentProps
 * @type {object}
 */



Object.defineProperty(BackTop,"BackTop",{ get:function(){ return BackTop }, set:function(val){ BackTop = val }})
export default BackTop;