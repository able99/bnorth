/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';

export default Panel;

// Panel Container
// -----------------------

/**
 * 扩展小面板组件，提供了可以设置纵横比的能力
 * @component
 * @mount Panel.AspectRatio
 * @augments BaseComponent
 */
let AspectRatio = aprops=>{
  let {
    ratio, innerProps,
    component:Component, style, children, ...props
  } = parseProps(aprops, AspectRatio.props);
  
  let styleSet = ratio?{paddingBottom: `${ratio*100}%`}:{};

  return (
    <Component style={{...styleSet, ...style}} {...props} >
      <Inner ratio={ratio} {...innerProps}>{children}</Inner>
    </Component>
  );
}

Object.defineProperty(Panel,"AspectRatio",{ get:function(){ return AspectRatio }, set:function(val){ AspectRatio = val }})

AspectRatio.defaultProps = {};
/**
 * 设置纵横比
 * @attribute Panel.module:AspectRatio~AspectRatio.ratio
 * @type {number|string}
 */
/**
 * 设置组件实际显示内容的内部组件的属性
 * @attribute Panel.module:AspectRatio~AspectRatio.innerProps
 * @type {object}
 */
/**
 * 参见 BaseComponent
 */
AspectRatio.defaultProps.component = Panel;

// Panel Container
// -----------------------

/**
 * 纵横比组件的内部内容组件，是实际显示内容的组件
 * @component
 * @mount Panel.AspectRatio.Inner
 * @private 
 * @augments BaseComponent
 */
let Inner = aprops=>{
  let {
    component:Component, className, ...props
  } = parseProps(aprops, Inner.props);

  let classStr = 'position-absolute offset-a-start square-full overflow-a-hidden';

  return <Component className={classes(classStr, className)} {...props} />
}

Object.defineProperty(Panel.AspectRatio,"Inner",{ get:function(){ return Inner }, set:function(val){ Inner = val }})

Inner.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Inner.defaultProps.component = Panel;
