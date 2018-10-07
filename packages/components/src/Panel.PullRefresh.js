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
import Loader from './Loader';


Panel.PullRefresh = class PullRefresh extends React.Component {
  static defaultProps = {
    triggerOffset: 60,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMove(target,event) {
    if(target.scrollTop>0) return;
    this.setState({offset: Math.max(event.deltaY, 0)});
    !this.props.isLoading&&this.state.offset&&event.preventDefault();
  }

  handleEnd(target,event) {
    let { triggerOffset, onLoad } = this.props;
    let offset = this.state.offset;
    this.setState({offset: 0});
    if(offset>=triggerOffset&&onLoad) onLoad();
  }

  render() {
    let {
      isLoading, onLoad, triggerOffset, refreshProps, loaderProps, 
      children, ...props
    } = parseProps(this.props);

    return (
      <Panel.Touchable 
        direction="vertical"
        onPan={this.handleMove.bind(this)} onPanCancel={(el,e)=>this.handleEnd(el,e)} onPanEnd={(el,e)=>this.handleEnd(el,e)} 
        {...props}>
        <PullRefresh._Loader 
          isLoading={isLoading} offset={this.state.offset} triggerOffset={triggerOffset} 
          loaderProps={loaderProps} {...refreshProps} />
        {children}
      </Panel.Touchable>
    )
  }
}

Panel.PullRefresh._Loader = aprops=>{
  let {
    isLoading, offset, triggerOffset, title, loader, loaderProps={},
    component:Component=Panel, className, style, children, ...props
  } = parseProps(aprops);

  let classStr = 'overflow-a-hidden transition-property-height flex-display-block flex-direction-v flex-justify-center flex-align-center';

  let styleSet = {height: 0};
  if(offset>0) styleSet.height = offset;
  if(isLoading) styleSet.height = triggerOffset;

  return (
    <Component className={classes(classStr, className)} style={{...styleSet, ...style}} {...props}>
      {!children&&loader?loader:null}
      {!children&&!loader?<Loader isProgress={!isLoading} progress={offset*100/triggerOffset} {...loaderProps}/>:null}
      {!children&&title?title:null}
      {children}
    </Component>
  )
}


export default Panel;

// : TODO
// pc pull trigger onClick
