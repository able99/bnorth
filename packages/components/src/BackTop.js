/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { domOffset, chainedFuncs } from './utils/dom';
import parseProps from './utils/props';
import ScrollSpy from './ScrollSpy';
import Fab from './Fab';
import Icon from './Icon';


export default class BackTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollToTop() { this.container&&this.container.scrollTop&&(this.container.scrollTop=0) }
  isShow() { return this.state.isShow; }
  toggle() { this.isShow()?this.hide():this.show(); }
  show() { !this.state.isShow&&this.setState({isShow: true}) }
  hide() { this.state.isShow&&this.setState({isShow: false}) }

  _handlePosChange(event, el) {
    this.container = el;
    let { trigger=BackTop._trigger ,offset } = this.props;
    trigger(offset, this.container)?this.show():this.hide();
  }

  render() {
    let {
      onClick, trigger, offset,
      iconProps={}, scrollSpyProps={},
      component:Component=Fab, children, ...props
    } = parseProps(this.props, BackTop.props);


    return (
      <React.Fragment>
        <ScrollSpy onPosChange={this._handlePosChange.bind(this)} {...scrollSpyProps} />
        {this.state.isShow?(
          <Component onClick={chainedFuncs(()=>this.scrollToTop(), onClick)} {...props} >
            {children?children:<Icon name="backTop" defaultName="^" {...iconProps} />}
          </Component>
        ):null}
      </React.Fragment>
    )
  }
}

BackTop._trigger = function(value, container) {
  if(!value){
    return container.scrollTop>=(container?domOffset(container).height:0);
  }else if(!isNaN(value)){
    return container.scrollTop>=(value);
  }else if(typeof(value)==='string'&&value.test(/\d*%/)){
    return container.scrollTop>=(container?domOffset(container).height*Number(value.slice(0,-1))/100:0);
  }
}