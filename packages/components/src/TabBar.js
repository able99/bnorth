/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import './Panel.Icon';


let TabBar = aprops=>{
  let {
    colorUnselected, colorSelectedOnTheme, colorUnselectedOnTheme,
    type="justify", itemComponent=Panel.Icon, itemProps, itemGetClassName=TabBar._itemGetClassName, itemGetStyle=TabBar._itemGetStyle, itemGetProps=TabBar._itemGetProps,
    component:Component=Panel.Container, componentPanel, className, ...props
  } = parseProps(aprops, TabBar.props);

  let classStr = 'width-full padding-top-sm padding-bottom-xs border-set-top-border';

  return (
    <Component 
      component={componentPanel}
      type={type} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName}  itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props} />
  );
}

TabBar._itemGetProps = (i, length, containerProps, {selected}={})=>{
  let {'b-style':bStyle, 'b-theme':bTheme, colorUnselected='disable', colorSelectedOnTheme='white', colorUnselectedOnTheme='disable'} = {...TabBar.props,...containerProps};
  
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
    iconPosition: 'top',
    'bc-cursor-pointer': true,
    'bc-status-': true,
    'b-theme': theme,
  }
}


TabBar.Item = Panel.Container.Item;
export default TabBar;