/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import { PanelIcon } from './Icon';


// TabBar
// -------------------

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

  _handleAction = i=>{
    let { onAction, children } = this.props;
    this.setState({selectedIndex: i});
    if(onAction) {
      children = React.Children.toArray(children).filter(v=>v);
      let props = children[i]&&children[i].props;
      onAction(i, props, props&&props.event);
    }
  }

  render() {
    let {
      selectedIndex=this.state.selectedIndex, selectedIndexDefault, onAction, 
      navProps, containerProps, 
      component:Component, componentPanel, children, ...props
    } = BaseComponent(this.props, TabBar, {isContainer: true});

    children = React.Children.toArray(children).filter(v=>v);

    return (
      <Component component={componentPanel} type="primary" position="top" align="stretch" {...props}>
        <Panel.Container type="justify" selectedIndex={selectedIndex} {...navProps}>
          {children.map((v,i)=>{
            let {event, onClick, children, ...props} = v.props;
            return (
              <PanelIcon
                key={v.key||i} selected={selectedIndex===i} hasSelection
                onClick={e=>{this._handleAction(i);onClick&&onClick(e)}} {...props} />
            )
          })}
        </Panel.Container>
        <Panel.Container itemSelected selectedIndex={selectedIndex} onSelect={index=>this._handleAction(index)}  {...containerProps}>
          {children.map((v,i)=><Panel key={v.key||i}>{v.props.children}</Panel>)}
        </Panel.Container>
      </Component>
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
/**
 * 设置映射组件，采用 Panel.Container 类型为 primary
 */
TabBar.defaultProps.component = Panel.Container;

export default TabBar;
