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
  } = parseProps(aprops);

  let classStr = 'outline-none- appearance-none- font-smoothing-antialiased- transition-set- vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-';
  
  return <Component b-style="solid" component={panelComponent} className={classes(classStr, className)} {...props} />;
}


Button.Group = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps={},
    itemComponent=Button, itemProps, itemGetClassName=Button.Group.itemGetClassName, itemGetStyle=Button.Group.itemGetStyle, itemGetProps=Button.Group.itemGetProps,
    component:Component=Panel.Container, children, ...props
  } = parseProps(aprops);

  children = React.Children.toArray(children)
    .filter(v=>v)
    .map((v,i)=><Component.Item key={v.key||i} {...v.props} />)
    .reduce((v1,v2,i,a)=>{
      if(!separator||stacked) return a;
      if(i>0)v1.push(<Button.Group.Separator key={'sep'+i} {...separatorProps} />)
      v1.push(v2);
      return v1;
    },[])

  return (
    <Component 
      type={justify?"justify":""} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      {...props}>
      {children}
    </Component>
  )
}

Button.Group.itemGetClassName=(i, length, {stacked, justify}={})=>{
  return {
    'border-none-right-': !stacked&&!i>=length-1,
    'border-none-bottom-': stacked&&!i>=length-1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
  };
}

Button.Group.Separator = aprops=>{
  let { 
    component:Component=Panel, className, style, ...props
  } = parseProps(aprops);

  let classStr = 'flex-sub-flex-none bg-color-border margin-v-xl';
  let styleSet = {};
  styleSet.width = 1;

  return <Component inline b-style='solid' b-theme='border' style={{...styleSet, ...style}} className={classes(classStr,className)} {...props}>&nbsp;</Component>;
}


export default Button;
