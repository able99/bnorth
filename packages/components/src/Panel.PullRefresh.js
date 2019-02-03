/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Touchable';
import './Panel.Loader';
import { domIsMouse, domFindNode } from './utils/dom';

export default Panel;


// PullRefresh
// ------------------------

/**
 * 支持滚动与下拉刷新的小面板
 * @component
 * @mount Panel.PullRefresh
 * @augments BaseComponent
 */
class PullRefresh extends React.Component {
  handleMove(event, element) {
    if(element.scrollTop>0) return;
    this.setState({offset: Math.max(event.deltaY, 0)});
    !this.props.isLoading&&this.state.offset&&event.preventDefault();
  }

  handleEnd(event, element) {
    let { triggerOffset, onLoad } = this.props;
    let offset = (this.state&&this.state.offset)||0;

    if(offset) {
      this.setState({offset: 0});
      if(offset>=triggerOffset&&onLoad) onLoad();
      this.mark = true;
    }
  }

  componentDidMount() {
    domIsMouse && domFindNode(this).addEventListener("click", event=>{
      if(this.mark) {
        event.stopPropagation();
        this.mark = false;
      }
    },true)
  }

  render() {
    let {
      isLoading, onLoad, triggerOffset, 
      loaderProps, titleLoading, 
      children, ...props
    } = parseProps(this.props, PullRefresh.porps);
    let offset = (this.state&&this.state.offset)||0;

    return (
      <Panel.Touchable 
        recognizers={{pan: {enable: true}}} direction="vertical" options={{touchAction:'pan-y'}} 
        onPan={this.handleMove.bind(this)} onPanCancel={(el,e)=>this.handleEnd(el,e)} onPanEnd={(el,e)=>this.handleEnd(el,e)}
        {...props}>
        <Refresh 
          isLoading={isLoading} offset={offset} triggerOffset={triggerOffset} 
          {...loaderProps}>
          {titleLoading}
        </Refresh>
        {children}
      </Panel.Touchable>
    )
  }
}

Object.defineProperty(Panel,"PullRefresh",{ get:function(){ return PullRefresh }, set:function(val){ PullRefresh = val }})

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
/**
 * 点击事件处理函数，对应手势 tap
 * @attribute Panel.module:PullRefresh~PullRefresh.titleLoading
 * @type {string|number|component|element}
 */


// Panel PushRefresh Refresh
// ------------------

/**
 * 支持滚动与下拉刷新的小面板的下拉进度组件
 * @component
 * @mount Panel.PushRefresh.Refresh
 * @private 
 * @augments BaseComponent
 */
let Refresh = aprops=>{
  let {
    isLoading, offset, triggerOffset, 
    component:Component, componentPanel, className, style, ...props
  } = parseProps(aprops, Refresh.props);

  let classStr = 'overflow-a-hidden transition-property-height';

  let styleSet = {height: 0};
  if(offset>0) styleSet.height = offset;
  if(isLoading) styleSet.height = triggerOffset;

  return (
    <Component 
      component={componentPanel}
      position="top" isProgress={!isLoading} progress={offset*100/triggerOffset} 
      className={classes(classStr, className)} style={{...styleSet, ...style}} {...props} />
  )
}

Object.defineProperty(Panel.PullRefresh,"Refresh",{ get:function(){ return Refresh }, set:function(val){ Refresh = val }})

Refresh.defaultProps = {};
Refresh.defaultProps.component = Panel.Loader;