/**
 * 按钮和按钮组
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes';
import parseProps from './utils/props';
import Panel from './Panel.Container';


/**
 * 按钮组件
 * @component
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

Button.defaultProps = {
  /**
   * 渲染为该组件
   * @type {component|element}
   * @default Panel
   */
  component: Panel, 
  /**
   * Panel 的渲染组件，仅当 component 设置为 Panel 时有效
   * @type {component|element}
   * @default 'button'
   */
  panelComponent: 'button',
}

/**
 * 按钮组组件
 * @component
 */
Button.Group = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps,
    itemProps, itemGetClassName, itemGetStyle, itemGetProps,
    component:Component, panelComponent, children, ...props
  } = parseProps(aprops, Button.Group.props);

  children = React.Children.toArray(children)
    .filter(v=>v)
    .reduce((v1,v2,i,a)=>{
      if(!separator||stacked) return a;
      if(i>0)v1.push(<Button.Group._Separator key={'sep'+i} notItem {...separatorProps} />)
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

Button.Group.defaultProps = {
  /**
   * 是否堆叠方式摆放按钮
   * @type {boolean}
   */
  stacked: false, 
  /**
   * 是否平分展开按钮
   * @type {boolean}
   */
  justify: false, 
  /**
   * 按钮之间是否有分隔条
   * @type {boolean}
   */
  separator: false, 
  /**
   * 分隔条属性
   * @type {object}
   */
  separatorProps: {},
  /**
   * 设置包含所有按钮的属性
   * @type {object}
   */
  itemProps: undefined, 
  /**
   * 设置包含所有按钮的 class name 生成函数
   * @type {function}
   */
  itemGetClassName: Button.Group._itemGetClassName, 
  /**
   * 设置包含所有按钮的样式生成函数
   * @type {function}
   * @default Button.Group._itemGetStyle
   */
  itemGetStyle: Button.Group._itemGetStyle, 
  /**
   * 设置包含所有按钮的属性生成函数
   * @type {function}
   * @default Button.Group._itemGetProps
   */
  itemGetProps: Button.Group._itemGetProps,
  /**
   * 渲染为该组件
   * @type {component|element}
   * @default Panel.Container
   */
  component: Panel.Container, 
  /**
   * Panel 的渲染组件，仅当 component 设置为 Panel 时有效
   * @type {component|element}
   */
  panelComponent: undefined,
}

/**
 * 按钮组默认的设置包含所有按钮的 class name 生成函数，该函数处理了边框和对堆叠，平分的属性的处理
 * @component
 * @private
 */
Button.Group._itemGetClassName=(i, length, {separator, stacked, justify}={})=>{
  return {
    'border-none-right-': stacked||(i>=length-1),
    'border-none-bottom-': !stacked||(i>=length-1),
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-top-': true,
    'border-none-left-': true,
    'bg-none-': separator,
  };
}

/**
 * 按钮组的分隔条组件
 * @component
 * @private
 */
Button.Group._Separator = aprops=>{
  let { 
    component:Component=Panel, panelComponent, notItem, className, ...props
  } = parseProps(aprops, Button.Group._Separator.props);

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

/**
 * 按钮组的条目
 * @component
 * @see module:Button.Button
 */
Button.Group.Item = Button;


export default Button;
