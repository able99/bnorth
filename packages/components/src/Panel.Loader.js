/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import CLoader from './Loader';


export default Panel;

const positionToDirection = { left: 'h', right: 'hv', top: 'v', bottom: 'vv' }


// Panel Loader
// ---------------------

/**
 * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
 * @component
 * @mount Panel.Loader
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 */
let Loader = aprops=>{
  let {
    position, isProgress, progress, 
    loaderProps, contentProps, 
    component:Component, children, ...props
  } = parseProps(aprops, Panel.Loader.props);

  return (
    <Component type="flex" direction={positionToDirection[position]} justify="center" align="center" {...props}>
      {position?<Panel.Loader.Loader isProgress={isProgress} progress={progress} {...loaderProps} />:null}
      {children?<Panel.Loader.Content position={position} {...contentProps}>{children}</Panel.Loader.Content>:null}
    </Component>
  );
}

Object.defineProperty(Panel,"Loader",{ get:function(){ return Loader }, set:function(val){ Loader = val }})

Loader.defaultProps = {};
/**
 * 设置加载动画相对于内容的位置，包括 left，right，top，bottom 4 个位置
 * @type {string}
 */
Loader.defaultProps.position = 'left'; 
/**
 * 参见 Loader 组件的 isProgress 属性
 * @attribute Panel.module:Loader~Loader.isProgress
 */
/**
 * 参见 Loader 组件的 progress 属性
 * @attribute Panel.module:Loader~Loader.progress
 */
/**
 * 设置加载动画子组件的属性
 * @attribute Panel.module:Loader~Loader.loaderProps
 * @type {object}
 */
/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~Loader.contentProps
 * @type {object}
 */
/**
 * 参见 BaseComponent
 */
Loader.defaultProps.component = Panel.Container; 


// Panel Loader Loader
// ------------------
/**
 * 加载动画小面板组件的内部加载动画组件
 * @component
 * @name Panel.module:Loader~Icon
 * @mount Panel.Loader.Loader
 * @private 
 * @augments BaseComponent
 * @see module:Loader.Loader
 */
Object.defineProperty(Panel.Loader,"Loader",{ get:function(){ return CLoader }, set:function(val){ CLoader = val }})


// Panel Loader Content
// ------------------

/**
 * 加载动画小面板组件的内部内容组件
 * @component
 * @mount Panel.Loader.Content
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

Object.defineProperty(Panel.Loader,"Content",{ get:function(){ return Content }, set:function(val){ Content = val }})

Content.defaultProps = {};
/**
 * 参见 Panel.Loader
 * @attribute Panel.module:Loader~Content.position
 */
/**
 * 参见 BaseComponent
 */
Content.defaultProps.component = Panel;
