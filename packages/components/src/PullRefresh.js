/**
 * @module
 */
import React from 'react';
import BaseComponent, { domIsMouse, domFindNode } from './BaseComponent';
import Panel from './Panel';
import Touchable from './Touchable';
import { PanelLoader } from './Loader';


/**
 * 支持滚动与下拉刷新的小面板
 * @component
 * @exportdefault
 * @augments BaseComponent
 */
class PullRefresh extends React.Component {
  componentDidMount() {
    domIsMouse && domFindNode(this).addEventListener("click", event=>{
      if(this.mark) { event.stopPropagation(); this.mark = false }
    },true)
  }

  render() {
    let {
      isLoading, onLoad, triggerOffset, loaderProps, 
      children, ...props
    } = BaseComponent(this.props, PullRefresh);
    let { offset=0 } = this.state||{};

    let classNamePre = 'scrollable-y-';
    let classNamePreLoader = 'overflow-a-hidden transition-property-height';
    let stylePreLoader = { height: 0 };
    if(offset>0) stylePreLoader.height = offset;
    if(isLoading) stylePreLoader.height = triggerOffset;

    return (
      <Panel 
        componentTransform={Touchable} recognizers={{pan: {enable: true}}} direction="vertical" options={{touchAction:'pan-y'}} 
        onPan={(event, element)=>{
          if(element.scrollTop>0) return;
          this.setState({offset: Math.max(event.deltaY, 0)});
          !this.props.isLoading&&this.state.offset&&event.preventDefault();
        }} 
        onPanEnd={()=>{
          if(offset){ 
            this.setState({offset: 0}, ()=>offset>=triggerOffset&&onLoad&&onLoad()); 
            this.mark = true 
          }
        }}
        onPanCancel={()=>{
          if(offset){ 
            this.setState({offset: 0}, ()=>offset>=triggerOffset&&onLoad&&onLoad()); 
            this.mark = true 
          }
        }}
        classNamePre={classNamePre} {...props}>
        <Panel 
          componentTransform={PanelLoader} position="top" isProgress={!isLoading} progress={offset*100/triggerOffset} 
          classNamePre={classNamePreLoader} stylePre={stylePreLoader} {...loaderProps} />
        {children}
      </Panel>
    )
  }
}

PullRefresh.defaultProps = {};
/**
 * 下拉触发刷新的长度
 * @type {number}
 */
PullRefresh.defaultProps.triggerOffset = 60;
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.isLoading
 * @type {boolean}
 */
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.onLoad
 * @type {function}
 */
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.loaderProps
 * @type {object}
 */


Object.defineProperty(PullRefresh,"PullRefresh",{ get:function(){ return PullRefresh }, set:function(val){ PullRefresh = val }})
export default PullRefresh;

