/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import Icon from './Icon';


export default Panel;

const positionToDirection = { left: 'h', right: 'hv', top: 'v', bottom: 'vv' }


// Panel Icon
// ---------------------

/**
 * 图标小面板组件，扩展小面板组件，提供图标组件与面板内容混排的能力
 * @component
 * @mount Panel.Icon
 * @augments BaseComponent
 */
let PanelIcon = aprops=>{
  let {
    position, selected, 
    icon, src, char, shape, selectedIcon,
    iconProps, contentProps, 
    component:Component, children, ...props
  } = parseProps(aprops, PanelIcon.props);


  return (
    <Component type="flex" direction={positionToDirection[position]} justify="center" align="center" selected={selected} {...props}>
      {position?(
        <Icon 
          name={icon&&(selected&&selectedIcon?selectedIcon:icon)}
          src={src&&(selected&&selectedIcon?selectedIcon:src)}
          char={char&&(selected&&selectedIcon?selectedIcon:char)}
          shape={shape&&(selected&&selectedIcon?selectedIcon:shape)}
          {...iconProps} />
      ):null}
      {children?<Content position={position} {...contentProps}>{children}</Content>:null}
    </Component>
  );
}

Object.defineProperty(Panel,"Icon",{ get:function(){ return PanelIcon }, set:function(val){ PanelIcon = val }})

PanelIcon.defaultProps = {};
/**
 * 设置图标相对于内容的位置，包括 left，right，top，bottom 4 个位置
 * @type {string}
 */
PanelIcon.defaultProps.position = 'left'; 
/**
 * 参见 Panel
 * @attribute Panel.module:Icon~PanelIcon.selected
 */
/**
 * 参见 Icon 的 name 属性
 * @attribute Panel.module:Icon~PanelIcon.icon
 */
/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.src
 */
/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.char
 */
/**
 * 参见 Icon
 * @attribute Panel.module:Icon~PanelIcon.shape
 */
/**
 * 设置 icon，src，char 或 shape 在选中时的对应属性，不设置则选中不选中没有区别
 * @attribute Panel.module:Icon~PanelIcon.selectedIcon
 * @type {*}
 */
/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Icon~PanelIcon.iconProps
 * @type {object}
 */
/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Icon~PanelIcon.contentProps
 * @type {object}
 */
/**
 * 参见 BaseComponent
 */
PanelIcon.defaultProps.component = Panel.Container; 


// Panel Icon Icon
// ------------------

/**
 * 图标小面板组件的内部图标组件
 * @component
 * @name Panel.module:Icon~Icon
 * @mount Panel.Icon.Icon
 * @private 
 * @augments BaseComponent
 * @see module:Icon.Icon
 */
Object.defineProperty(Panel.Icon,"Icon",{ get:function(){ return Icon }, set:function(val){ Icon = val }})



// Panel Icon Content
// ------------------

/**
 * 图标小面板组件的内部内容组件
 * @component
 * @mount Panel.Icon.Content
 * @private 
 * @augments BaseComponent
 */
let Content = aprops=>{
  let {
    position,
    component:Component, className, ...props
  } = parseProps(aprops, Content.porps);

  let classStr = 'text-truncate-1- position-relative';

  return <Component className={classes(classStr, className)} {...props} />
}

Object.defineProperty(Panel.Icon,"Content",{ get:function(){ return Content }, set:function(val){ Content = val }})

Content.defaultProps = {};
/**
 * 参见 Panel.Icon
 * @attribute Panel.module:Icon~Content.position
 */
/**
 * 参见 BaseComponent
 */
Content.defaultProps.component = Panel;
