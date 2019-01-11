/**
 * 按钮和按钮组
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes';
import parseProps from './utils/props';
import Panel from './Panel.Container';


 // Button
 // ----------------------------

/**
 * 按钮组件
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
let Button = aprops=>{
  let {
    component:Component, panelComponent, className, ...props
  } = parseProps(aprops, Button.props);

  let classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  
  return (
    <Component 
      component={panelComponent} 
      b-style="solid" 
      className={classes(classStr, className)} {...props} />
  );
}
Button.defaultProps = {}
/**
 * 设置映射组件
 */
Button.defaultProps.component = Panel;
/**
 * 设置映射组件的映射组件
 */
Button.defaultProps.panelComponent = 'button';

export default Button;


// Button Group
// ---------------------------

/**
 * 按钮组组件
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Button.Group
 */
let Group = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps,
    itemProps, itemGetClassName=Group.itemGetClassName, itemGetStyle=Group.itemGetStyle, itemGetProps=Group.itemGetProps,
    component:Component, panelComponent, children, ...props
  } = parseProps(aprops, Group.props);

  children = React.Children.toArray(children)
    .filter(v=>v)
    .reduce((v1,v2,i,a)=>{
      if(!separator||stacked) return a;
      if(i>0)v1.push(<Separator key={'sep'+i} notItem {...separatorProps} />)
      v1.push(v2);
      return v1;
    },[])

  return (
    <Component 
      component={panelComponent} 
      type={justify?"justify":""} containerProps={aprops} 
      itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      {...props}>
      {children}
    </Component>
  )
}

Object.defineProperty(Button,"Group",{ get:function(){ return Group }, set:function(val){ Group = val }})

Group.defaultProps = {};
/**
 * 是否堆叠方式摆放按钮
 * @attribute module:Button~Group.stacked
 * @type {boolean}
 */
/**
 * 是否平分展开按钮
 * @attribute module:Button~Group.justify
 * @type {boolean}
 */
/**
 * 按钮之间是否有分隔条
 * @attribute module:Button~Group.separator
 * @type {boolean}
 */
/**
 * 分隔条属性
 * @attribute module:Button~Group.separatorProps
 * @type {object}
 */
/**
 * 设置映射组件
 */
Group.defaultProps.component = Panel.Container;

Group.itemGetClassName = (i, length, {separator, stacked, justify}={})=>{
  return {
    'border-none-right-': separator||stacked||(i>=length-1),
    'border-none-bottom-': separator||!stacked||(i>=length-1),
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-top-': true,
    'border-none-left-': true,
    'bg-none-': separator,
  };
}


// Button Group Separator
// -------------------------

/**
 * 按钮组的分隔条组件
 * @component
 * @augments BaseComponent
 * @mount Button.Group.Separator
 * @private
 */
let Separator = aprops=>{
  let { 
    component:Component, panelComponent, notItem, className, ...props
  } = parseProps(aprops, Separator.props);

  let classStr = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';

  return (
    <Component 
      component={panelComponent} 
      inline b-theme='border' b-size='lg'
      className={classes(classStr,className)} {...props}>
      <span>|</span>
    </Component>
  );
}

Object.defineProperty(Button.Group,"Separator",{ get:function(){ return Separator }, set:function(val){ Separator = val }})

Separator.defaultProps = {}
/**
 * 设置映射组件
 */
Separator.defaultProps.component = Panel;
