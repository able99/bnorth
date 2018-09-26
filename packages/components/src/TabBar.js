/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel.Container';
import './Panel.Icon';


let TabBar = aprops=>{
  let {
    colorUnselected, colorSelectedOnTheme, colorUnselectedOnTheme,
    type="justify", itemComponent=Panel.Icon, itemProps={}, itemGetClassName=TabBar.itemGetClassName, itemGetStyle=TabBar.itemGetStyle, itemGetProps=TabBar.itemGetProps,
    component:Component=Panel.Container, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'width-full padding-top-sm padding-bottom-xs border-set-top-border';

  itemProps.iconPosition = 'top';
  children = React.Children.toArray(children).filter(v=>v);

  return (
    <Component 
      type={type} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName}  itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={cxm(classStr, className)} {...props}>
      {children}
    </Component>
  );
}

TabBar.itemGetProps = (
  i, length, 
  {'b-style':bStyle, 'b-theme':bTheme, colorUnselected='disable', colorSelectedOnTheme='white', colorUnselectedOnTheme='disable'}={}, 
  {selected}={}
)=>{
  let theme;

  if(bStyle==='solid') {
    if(bTheme){
      if(selected&&colorSelectedOnTheme) theme = colorSelectedOnTheme;
      if(!selected&&colorUnselectedOnTheme) theme = colorUnselectedOnTheme;
    }else{
      if(!selected&&colorUnselected) theme = colorUnselected;
    }
  }else {
    if(bTheme){
      if(selected) theme = bTheme;
      if(!selected&&colorUnselectedOnTheme) theme = colorUnselectedOnTheme;
    }else{
      if(!selected) theme = colorUnselected;
    }
  }
  
  return {
    'bc-cursor-pointer': true,
    'b-theme': theme,
  }
}


TabBar.Item = Panel.Container.Item;
export default TabBar;