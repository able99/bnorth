/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cx, hascx } from './utils/props';


let Badge = (aprops)=>{
  let {
    paddingSquare=0.25,
    component: Component = 'span', className, style, containerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'text-family-monospace': true,
    'line-height-1': true,
    'white-space-nowrap': true,
    ['text-size'+cSize]: cSize,
    'display-inline-block': !hascx(className, 'display'),
  };

  if(cStyle==='hollow'){
    classSet['bg-none'] = true;
    if(cTheme){
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-'+cTheme] = true;
    }else{
      classSet['border-set-border'] = true;
    }
  }else{
    if(cTheme){
      classSet['bg-color-'+cTheme] = true;
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-white'] = true;
    }else{
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
    }
  }

  let styleSet = {
    'padding': `${paddingSquare}em ${(16-9.609)/32 + paddingSquare}em`,
  }

  return (
    <Component className={cx(classSet, className)} style={{...styleSet, ...style}} {...props}>
      {children}
    </Component>
  );
}


export default Badge;
