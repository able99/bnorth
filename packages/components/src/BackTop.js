/**
 * @module
 */
import React from 'react';
import { domOffset, chainedFuncs } from './utils/dom';
import parseProps from './utils/props';
import Panel from './Panel.Icon';
import ScrollSpy from './ScrollSpy';
import Fab from './Fab';


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
      content:Content, contentIcon, contentIconDefault,  contentProps,
      scrollSpyProps,
      component:Component, children, ...props
    } = parseProps(this.props, BackTop.props);

    return (
      <React.Fragment>
        <ScrollSpy onPosChange={this._handlePosChange.bind(this)} {...scrollSpyProps} />
        {this.isShow()?(
          <Component container={undefined} onClick={chainedFuncs(()=>this.scrollToTop(), onClick)} {...props} >
            <Content icon={contentIcon} iconDefault={contentIconDefault} {...contentProps}>{children}</Content>
          </Component>
        ):null}
      </React.Fragment>
    )
  }
}

BackTop.defaultProps = {};
/**
 * 设置图标子组件的属性
 * @attribute module:BackTop.calc
 * @type {function}
 * @default module:BackTop.calc
 */
/**
 * @type {number|string}
 */
BackTop.defaultProps.param="100%";
BackTop.defaultProps.content=Panel.Icon;
BackTop.defaultProps.contentIcon="backTop";
BackTop.defaultProps.contentIconDefault="^";
/**
 * 设置图标子组件的属性
 * @attribute module:BackTop.contentProps
 * @type {function}
 * @default module:BackTop.calc
 */
/**
 * 设置图标子组件的属性
 * @attribute module:BackTop.scrollSpyProps
 * @type {function}
 * @default module:BackTop.calc
 */
/**
 * 参见 BaseComponent
 */
BackTop.defaultProps.component=Fab;


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