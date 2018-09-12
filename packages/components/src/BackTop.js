/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

 
import React from 'react';
import { domOffset } from './utils/dom';
import { genCommonProps } from './utils/props';
import ScrollSpy from './ScrollSpy';
import Fab from './Fab';
import Icon from './Icon';


export default class BackTop extends React.Component {
  static defaultProps = {
    triggerFunc: function(value, container) {
      if(!value){
        return container.scrollTop>=(container?domOffset(container).height:0);
      }else if(!isNaN(value)){
        return container.scrollTop>=(value);
      }else if(typeof(value)==='string'&&value.test(/\d*%/)){
        return container.scrollTop>=(container?domOffset(container).height*Number(value.slice(0,-1))/100:0);
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollToTop() { this.container && this.container.scrollTop && (this.container.scrollTop = 0); }
  isShow() { return this.state.isShow; }
  toggle() { this.isShow()?this.hide():this.show(); }
  show() { !this.state.isShow&&this.setState({isShow: true}) }
  hide() { this.state.isShow&&this.setState({isShow: false}) }

  _handleClick(...args) {
    let { onClick } = this.props;
    if(onClick&&onClick(...args)) return;

    return this.scrollToTop();
  }

  _handleScroll(container, event) {
    this.container = container;
    let { triggerFunc ,offset } = this.props;
    triggerFunc(offset, container)?this.show():this.hide();
  }

  render() {
    let {
      onClick, triggerFunc, offset,
      iconProps:{name=Icon.getName('backTop','^'), ...iconProps}={},
      scrollSpyProps,
      component:Component=Fab, children, ...props
    } = genCommonProps(this.props);


    return (
      <React.Fragment>
        <ScrollSpy onScrollPositionChange={this._handleScroll.bind(this)} {...scrollSpyProps} />
        {this.state.isShow?(
          <Component onClick={this._handleClick.bind(this)} {...props} >
            {children?children:<Icon {...iconProps} name={name} />}
          </Component>
        ):null}
      </React.Fragment>
    )
  }
}
