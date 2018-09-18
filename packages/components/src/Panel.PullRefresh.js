/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel.Touchable';
import Loader from './Loader';


class PullRefresh extends React.Component {
  static defaultProps = {
    triggerOffset: 70,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMove(from, to) {
    this.setState({offset: to.y-from.y});
  }

  handleEndMove(e) {
    let offset = this.state.offset;
    this.setState({offset: 0});
    console.log(offset,this.props.triggerOffset,this.props.onRefresh);
    if(offset>=this.props.triggerOffset&&this.props.onRefresh) this.props.onRefresh();
  }

  render() {
    let {
      isLoading, triggerOffset, refreshProps, loaderProps, 
      children, ...props
    } = genCommonProps(this.props);

    return (
      <Panel.Touchable onMove={(from, to)=>this.handleMove(from, to)} onMoveEnd={e=>this.handleEndMove(e)} {...props}>
        <PullRefresh._Loader isLoading={isLoading} offset={this.state.offset} triggerOffset={triggerOffset} loaderProps={loaderProps} {...refreshProps} />
        {children}
      </Panel.Touchable>
    )
  }
}

PullRefresh._Loader = aprops=>{
  let {
    isLoading, offset, triggerOffset, title, loader, loaderProps={},
    component:Component=Panel, className, style, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'overflow-hidden transition-property-height flex-display-block flex-direction-v flex-justify-center flex-align-center';

  let styleSet = {height: 0};
  if(offset>0) styleSet.height = offset;
  if(isLoading) styleSet.height = triggerOffset;

  return (
    <Component className={cxm(classStr, className)} style={{...styleSet, ...style}} {...props}>
      {!children&&loader?loader:null}
      {!children&&!loader?<Loader b-size="2x" isProgress={!isLoading} progress={offset*100/triggerOffset} {...loaderProps}/>:null}
      {!children&&title?title:null}
      {children}
    </Component>
  )
}

Panel.PullRefresh = PullRefresh;


export default Panel;
