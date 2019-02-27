/**
 * 标题栏组件
 * @module 
 */
import React from 'react';
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
  let { overlay, hidden, ...props } = BaseComponent(aprops, NavBar);
  if(hidden) return null;

  let classNamePre = 'flex-display-block flex-justify-around flex-align-center width-full padding-v-sm border-set-bottom-';
  let stylePre = {};
  if(overlay) stylePre.paddingTop = overlay===true?20:overlay;

  return <Panel component="nav" classNamePre={classNamePre} stylePre={stylePre} {...props} />;
}

NavBar.defaultProps = {}
/**
 * 设置标题栏顶部覆盖状态栏的高度，当值为 true 时，取 20 作为默认值
 * @attribute module:NavBar.NavBar.overlay
 * @type {boolean|number}
 */
/**
 * 设置隐藏组件
 * @attribute module:NavBar.NavBar.hidden
 * @type {boolean}
 */


Object.defineProperty(NavBar,"NavBar",{ get:function(){ return NavBar }, set:function(val){ NavBar = val }})
export default NavBar;



/**
 * 标题栏组件的标题子组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Title
 */
let Title = aprops=>{
  let { isFullOrCenter, ...props } = BaseComponent(aprops, Title);

  let classNamePre = 'text-align-center flex-sub-flex-extend text-weight-bold text-size-xl';

  return (
    <React.Fragment>
      <Panel inline classNamePre={classNamePre} bc-position-absolute={Boolean(!isFullOrCenter)} {...props} />
      {!isFullOrCenter?<Panel inline classNamePre={classNamePre} bc-visibility-hide {...props}>0</Panel>:null}
    </React.Fragment>
  )
}

Title.defaultProps = {};
/**
 * 设置标题组件铺满小组件之外空间，或者按需设置宽度并居中
 * @attribute module:NavBar~Title.isFullOrCenter
 * @type {boolean}
 */

Object.defineProperty(NavBar,"Title",{ get:function(){ return Title }, set:function(val){ Title = val }})





/**
 * 标题栏组件的上的小组件
 * @component
 * @augments BaseComponent
 * @mount NavBar.Item
 */
let Item = aprops=>{
  let props = BaseComponent(aprops, Item);

  let classNamePre = 'padding-h-sm flex-sub-flex-none cursor-pointer status-';

  return <Panel componentTransform={PanelIcon} classNamePre={classNamePre} {...props} />;
}

Item.defaultProps = {};

Object.defineProperty(NavBar,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})