/**
 * 按钮和按钮组
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';


/**
 * 按钮组件
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments button
 * @exportdefault
 */
let Button = aprops=>{
  let props = BaseComponent(aprops, Button);

  let classNamePre = 'outline-none appearance-none font-smoothing-antialiased vertical-align-middle position-relative line-height-1 text-align-center padding-a-';
  
  return <Panel component="button" b-style="solid" classNamePre={classNamePre} {...props} />
}

Button.defaultProps = {}

Object.defineProperty(Button,"Button",{ get:function(){ return Button }, set:function(val){ Button = val }})
export default Button;
