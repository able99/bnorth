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
    type="justify", itemProps, itemGetClassName=TabBar._itemGetClassName, itemGetStyle=TabBar._itemGetStyle, itemGetProps=TabBar._itemGetProps,
    component:Component=Panel.Container, componentPanel, className, ...props
  } = parseProps(aprops, TabBar.props);

  let classStr = 'width-full border-set-top-border';

  return (
    <Component 
      component={componentPanel}
      type={type} containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName}  itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props} />
  );
}

TabBar.Item = aprops=>{
  let {
    component:Component=Panel.Icon, className, ...props
  } = parseProps(aprops, TabBar.Item.props);

  let classStr = 'padding-top-sm padding-bottom-xs cursor-pointer status- transition-set-';

  return <Component position="top" hasSelection className={classes(classStr, className)} {...props} />;
}

export default TabBar;