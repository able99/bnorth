/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes';
import parseProps from './utils/props';
import Panel from './Panel.Container';


let Button = aprops=>{
  let {
    component:Component=Panel, panelComponent='button', className, ...props
  } = parseProps(aprops, Button.props);

  let classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  
  return (
    <Component 
      component={panelComponent} 
      b-style="solid" 
      className={classes(classStr, className)} {...props} />
  );
}


Button.Group = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps={},
    itemComponent=Button, itemProps, itemGetClassName=Button.Group._itemGetClassName, itemGetStyle=Button.Group._itemGetStyle, itemGetProps=Button.Group._itemGetProps,
    component:Component=Panel.Container, panelComponent, children, ...props
  } = parseProps(aprops, Button.Group.props);

  children = React.Children.toArray(children)
    .filter(v=>v)
    .map((v,i)=><Component.Item key={v.key||i} {...v.props} />)
    .reduce((v1,v2,i,a)=>{
      if(!separator||stacked) return a;
      if(i>0)v1.push(<Button.Group._Separator key={'sep'+i} notItem {...separatorProps} />)
      v1.push(v2);
      return v1;
    },[])

  return (
    <Component 
      component={panelComponent} type={justify?"justify":""} containerProps={aprops} 
      itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      {...props}>
      {children}
    </Component>
  )
}

Button.Group._itemGetClassName=(i, length, {separator, stacked, justify}={})=>{
  return {
    'border-none-right-': !stacked&&!(i>=length-1),
    'border-none-bottom-': stacked&&!(i>=length-1),
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
    'border-none-a-': separator,
    'bg-none-': separator,
  };
}

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


export default Button;
