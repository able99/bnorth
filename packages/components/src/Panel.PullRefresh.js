/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel,{Hammer} from './Panel.Touchable';
import Loader from './Loader';


class PullRefresh extends React.Component {
  static defaultProps = {
    triggerOffset: 60,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMove(el,e) {
    console.log(el, e);
    if(el.scrollTop>0) return;
    this.setState({offset: Math.max(e.deltaY, 0)});
    // let scrollTop = this.el?this.el.scrollTop:0;
    // let offset = to.y-from.y;
    // // console.log(11111,Math.max(offset-scrollTop, 0), offset, scrollTop);
    // this.setState({offset: Math.max(offset-scrollTop, 0)});
    !this.props.isLoading&&this.state.offset&&e.preventDefault();
    // e.srcEvent.preventDefault();
    //  e.srcEvent.stopPropagation();
  }

  handleEnd(el,e) {
    let offset = this.state.offset;
    this.setState({offset: 0});
    if(offset>=this.props.triggerOffset&&this.props.onRefresh) this.props.onRefresh();
    // e.preventDefault();
    // e.srcEvent.preventDefault();
    // e.srcEvent.stopPropagation()
  }

  render() {
    let {
      isLoading, triggerOffset, refreshProps, loaderProps, 
      children, ...props
    } = genCommonProps(this.props);

    return (
      <Panel.Touchable 
        options={{recognizers: {pan:{threshold: 3, direction: Hammer.DIRECTION_VERTICAL}}}}
        onPan={(el,e)=>this.handleMove(el,e)} onPanCancel={(el,e)=>this.handleEnd(el,e)} onPanEnd={(el,e)=>this.handleEnd(el,e)} 
        {...props}>
        <PullRefresh._Loader 
          isLoading={isLoading} offset={this.state.offset} triggerOffset={triggerOffset} 
          loaderProps={loaderProps} {...refreshProps} />
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
      {!children&&!loader?<Loader isProgress={!isLoading} progress={offset*100/triggerOffset} {...loaderProps}/>:null}
      {!children&&title?title:null}
      {children}
    </Component>
  )
}

Panel.PullRefresh = PullRefresh;


export default Panel;
