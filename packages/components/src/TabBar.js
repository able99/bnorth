/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import { PanelIcon } from './Icon';


/**
 * 标签页组件
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer 
 * @exportdefault
 */
class TabBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedIndex: props.selectedIndexDefault||0};
  }

  render() {
    let aprops = BaseComponent(this.props);
    let {
      selectedIndex=this.state.selectedIndex, selectedIndexDefault, onWillChange, onAction, 
      navProps, containerProps, 
      children, ...props
    } = aprops;
    children = React.Children.toArray(children).filter(v=>v);

    return (
      <PanelContainer panelContainerProps={aprops} ctype="primary" direction="v" align="stretch" {...props}>
        <PanelContainer panelContainerProps={navProps} ctype="justify" selectedIndex={selectedIndex} {...navProps}>
          {children.map((v,i)=>{
            let {event, onClick, children, ...props} = v.props;
            return <Panel 
              key={v.key||i} componentTransform={PanelIcon} selected={selectedIndex===i} bp-panelTheme-sensitiveSelect
              onClick={e=>{
                if(onWillChange&&onWillChange(i, v.props, event)===false) return;
                this.setState({selectedIndex: i}, ()=>{ if(onAction) onAction(i, v.props, event); if(onClick) onClick(e) })
              }}
              {...props} />
          })}
        </PanelContainer>
        <PanelContainer 
          panelContainerProps={containerProps}
          panelItemSelected ctype="scroll" selectedIndex={selectedIndex} 
          onSelectedChange={i=>{
            let props = children[i].props;
            if(onWillChange&&onWillChange(i, props, props&&props.event)===false) return;
            this.setState({selectedIndex: i}, ()=>{ if(onAction) onAction(i, props, props&&props.event)})
          }}
          {...containerProps}>
          {children.map(v=><Panel key={v.key} children={v.props.children} />)}
        </PanelContainer>
      </PanelContainer>
    );
  }
}

TabBar.defaultProps = {}
/**
 * @callback TabBarActionCallback
 * @param {number} i - 标签的索引
 * @param {*} event - 标签的事件名称
 * @param {object} props - 标签的属性
 * @returns {boolean} 返回为真，将阻止导航条组件的点击事件
 */
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:TabBar.TabBar.onAction
 * @type {module:TabBar~TabBarActionCallback}
 */
/**
 * 设置标签页当前选中索引
 * @attribute module:TabBar.TabBar.selectedIndex
 * @type {number}
 */
/**
 * 设置标签页默认的选中索引
 * @attribute module:TabBar.TabBar.selectedIndexDefault
 * @type {number}
 */
/**
 * 设置标签页的标签导航组件的属性
 * @attribute module:TabBar.TabBar.navProps
 * @type {object}
 */
/**
 * 设置标签页的标签内容容器组件的属性
 * @attribute module:TabBar.TabBar.containerProps
 * @type {object}
 */

Object.defineProperty(TabBar,"TabBar",{ get:function(){ return TabBar }, set:function(val){ TabBar = val }})
export default TabBar;



Object.defineProperty(TabBar,"Item",{ get:function(){ return Panel }, set:function(val){ Panel = val }})