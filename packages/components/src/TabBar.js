/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import './Panel.Icon';


// TabBar
// -----------------------

/**
 * 标签页导航条组件
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @exportdefault
 */
let TabBar = aprops=>{
  let {
    type="justify", itemProps, itemGetClassName=TabBar.itemGetClassName, itemGetStyle=TabBar.itemGetStyle, itemGetProps=TabBar.itemGetProps,
    component:Component=Panel.Container, componentPanel, className, ...props
  } = parseProps(aprops, TabBar.props);

  let classStr = 'width-full border-set-top-border';

  return (
    <Component 
      component={componentPanel}
      type={type} containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName}  itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props} />
  );
}

TabBar.defaultProps = {};
/*
 * 组件的排列类型
 */
TabBar.defaultProps.type = 'justify';
/*
 * 设置映射组件
 */
TabBar.defaultProps.component = Panel.Container;

export default TabBar;


// TabBar Item
// -----------------------

/**
 * 标签页导航条组件的项目子组件
 * @component 
 * @augments BaseComponent
 * @mount TabBar.Item
 */
let Item = aprops=>{
  let {
    component:Component=Panel.Icon, className, ...props
  } = parseProps(aprops, Item.props);

  let classStr = 'padding-top-sm padding-bottom-xs cursor-pointer status- transition-set-';

  return <Component position="top" hasSelection className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(TabBar,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 设置映射组件
 */
Item.defaultProps.component = Panel.Icon;