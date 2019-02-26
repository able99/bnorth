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
 * @augments BaseComponent
 * @augments module:Fab.Fab
 */
export default class BackTop extends React.Component {
  scrollToTop() { this.container&&this.container.scrollTop&&(this.container.scrollTop=0) }
  isShow() { return this.state&&this.state.isShow; }
  toggle() { this.isShow()?this.hide():this.show(); }
  show() { !this.isShow()&&this.setState({isShow: true}) }
  hide() { this.isShow()&&this.setState({isShow: false}) }

  _handlePosChange(event, el) {
    this.container = el;
    let { calc=BackTop.calc , param } = this.props;
    calc(param, this.container)?this.show():this.hide();
  }

  render() {
    let {
      onClick, calc, param, 
      scrollSpyProps,
      content:Content, contentProps,
      children, ...props
    } = BaseComponent(this.props, BackTop);

    return (
      <React.Fragment>
        <ScrollSpy onPosChange={this._handlePosChange.bind(this)} {...scrollSpyProps} />
        {this.isShow()?(
          <Panel onClick={chainedFuncs(()=>this.scrollToTop(), onClick)} {...props} >
            <Content name="backTop:^" {...contentProps}>{children}</Content>
          </Panel>
        ):null}
      </React.Fragment>
    )
  }
}

BackTop.defaultProps = {};
/**
 * 设置出现时机的计算函数
 * @attribute module:BackTop.calc
 * @type {function}
 * @default module:BackTop.calc
 */
/**
 * 设置出现时机的计算参数
 * @type {number|string}
 */
BackTop.defaultProps.param="100%";
/**
 * 设置滚动监控组件的属性
 * @attribute module:BackTop.scrollSpyProps
 * @type {object}
 */
/**
 * 设置内容的组件
 */
BackTop.defaultProps.content=PanelIcon;
/**
 * 设置图标子组件的属性
 * @attribute module:BackTop.contentProps
 * @type {function}
 */
BackTop.defaultProps.componentTransform=Fab;


/**
 * 默认的计算是否出现回到顶部按钮的函数
 * @member
 */
BackTop.calc = function(param, container) {
  if(!isNaN(param)){
    return container.scrollTop>=(param);
  }else if(typeof(param)==='string'&&/\d*%/.test(param)){
    return container.scrollTop>=(container?domOffset(container).height*Number(param.slice(0,-1))/100:0);
  }
}