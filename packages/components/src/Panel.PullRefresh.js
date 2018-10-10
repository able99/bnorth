/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Touchable';
import './Panel.Loader';


Panel.PullRefresh = class PullRefresh extends React.Component {
  static defaultProps = {
    triggerOffset: 60,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMove(event, target) {
    if(target.scrollTop>0) return;
    this.setState({offset: Math.max(event.deltaY, 0)});
    !this.props.isLoading&&this.state.offset&&event.preventDefault();
  }

  handleEnd(event, target) {
    let { triggerOffset, onLoad } = this.props;
    let offset = this.state.offset;
    this.setState({offset: 0});
    if(offset>=triggerOffset&&onLoad) onLoad();
  }

  render() {
    let {
      isLoading, onLoad, triggerOffset, 
      loaderProps, titleLoading, 
      children, ...props
    } = parseProps(this.props, Panel.PullRefresh.porps);

    return (
      <Panel.Touchable 
        direction="vertical" onPan={this.handleMove.bind(this)} onPanCancel={(el,e)=>this.handleEnd(el,e)} onPanEnd={(el,e)=>this.handleEnd(el,e)} 
        {...props}>
        <PullRefresh._Loader 
          isLoading={isLoading} offset={this.state.offset} triggerOffset={triggerOffset} 
          {...loaderProps}>
          {titleLoading}
        </PullRefresh._Loader>
        {children}
      </Panel.Touchable>
    )
  }
}

Panel.PullRefresh._Loader = aprops=>{
  let {
    isLoading, offset, triggerOffset, 
    component:Component=Panel.Loader, componentPanel, className, style, ...props
  } = parseProps(aprops, Panel.PullRefresh._Loader.props);

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


export default Panel;
