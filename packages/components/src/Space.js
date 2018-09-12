/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx } from './utils/props';


let Spacing = (aprops)=>{
  let {
    count = 1, stacked,
    component: Component = 'pre', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);

  let classSet = {
    'display-inline-block': !stacked,
    ['text-size-'+cSize]: cSize,
  };

  if(cStyle==='hollow'){
    classSet['bg-color-white'] = true;
    classSet['border-set-'+(cTheme||'component')] = true;
  }else if(cStyle==='solid'){
    classSet['bg-color-'+(cTheme||'component')] = true;
    classSet['border-set-'+(cTheme||'component')] = true;
  }else{
    classSet['bg-color-'+cTheme] = cTheme;
  }


  return (
    <Component className={cx(classSet, className)} {...props}>
      {Array(count).fill(stacked?'\n':' ')}
      {children}
    </Component>
  );
}


export default Spacing;