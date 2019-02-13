/**
 * 标题栏组件
 * @module 
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import { PanelIcon } from './Icon';


// NarBar
// --------------------------

/**
 * 标题栏组件
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
let NavBar = aprops=>{
  let {
    statusbarOverlay, hidden, 
    component:Component, componentPanel, className, style, ...props
  } = BaseComponent(aprops, NavBar);
  
  if(hidden) return null;

  let classStr = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  let styleSet = {};
  if(statusbarOverlay) styleSet.paddingTop = statusbarOverlay===true?20:statusbarOverlay;

  return <Component component={componentPanel} className={classes(classStr, className)} style={{...styleSet, ...style}} {...props} />;
}

NavBar.defaultProps = {}
/**
 * 设置标题栏顶部覆盖状态栏的高度，当值为 true 时，取 20 作为默认值
 * @attribute module:NavBar.NavBar.statusbarOverlay
 * @type {boolean|number}
 */
/**
 * 设置隐藏组件
 * @attribute module:NavBar.NavBar.hidden
 * @type {boolean}
 */
/**
 * 设置映射组件
 */
NavBar.defaultProps.component = Panel;
/**
 * 设置映射组件的映射组件，
 */
NavBar.defaultProps.componentPanel = 'nav';

export default NavBar;


// NavBar Title
// ---------------------

/**
 * 标题栏组件的标题子组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Title
 */
let Title = aprops=>{
  let {
    isFullOrCenter,
    component:Component=Panel, componentPanel, className, children, ...props
  } = BaseComponent(aprops, Title);

  let classStr = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';

  return isFullOrCenter?(
    <Component component={componentPanel} inline className={classes(classStr, className)} {...props}>{children}</Component>
  ):(
    <React.Fragment>
      <Component component={componentPanel} inline className={classes(classStr, className, 'position-absolute')} {...props}>{children}</Component>
      <Component component={componentPanel} inline className={classes(classStr, className, 'visibility-hide')} {...props}>0</Component>
    </React.Fragment>
  )
}

Object.defineProperty(NavBar,"Title",{ get:function(){ return Title }, set:function(val){ Title = val }})

Title.defaultProps = {};
/**
 * 设置标题组件铺满小组件之外空间，或者按需设置宽度并居中
 * @attribute module:NavBar~Title.isFullOrCenter
 * @type {boolean}
 */
/**
 * 设置映射组件
 */
Title.defaultProps.component = Panel;

// NavBar Item
// ---------------------

/**
 * 标题栏组件的上的小组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Item
 */
let Item = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = BaseComponent(aprops, Item);

  let classStr = 'padding-h-sm flex-sub-flex-none cursor-pointer status-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(NavBar,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 设置映射组件
 */
Item.defaultProps.component = PanelIcon;
