/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';


let Icon = aprops=>{
  let {
    name, src, imageProps,
    component:Component='span', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);
  
  let classStr = 'icon- font-smoothing-antialiased- text-decoration-none line-height-1 display-inline-block overflow-hidden';
  
  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  // if(cStyle==='hollow'){
  //   classSet['padding-xxs'] = !hascx(className, 'padding');
  //   classSet['bg-color-white'] = true;
    
  //   if(cTheme){
  //     classSet['border-set-'+cTheme] = true;
  //     classSet['text-color-'+cTheme] = true;
  //   }else{
  //     classSet['border-set-border'] = true;
  //   }
  // }else if(cStyle==='solid'){
  //   classSet['padding-xxs'] = !hascx(className, 'padding');

  //   if(cTheme){
  //     classSet['bg-color-'+cTheme] = true;
  //     classSet['border-set-'+cTheme] = true;
  //     classSet['text-color-white'] = !hascx(className, 'text-color');
  //   }else{
  //     classSet['bg-color-component'] = true;
  //     classSet['border-set-component'] = true;
  //   }
  // }else{
  //   classSet['text-color-'+cTheme] = cTheme;
  // }

  if(name) props['data-icon-name'] = Icon.getCode(name);

  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>
      {src?(<Icon._Image src={src} {...imageProps}/>):null}
      {children}
    </Component>
  );
}

Icon._Image = aprops=>{
  let {
    src,
    component:Component='img', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'width-auto height-em min-height-em display-block';

  return <Component alt="" src={src} className={cx(classStr, className)} {...props}/>
}


Icon.names = {};
Icon.codes = {};
Icon.getName = function(name, defval) {
  return Icon.names[name]||defval;
}
Icon.getCode = function(name) {
  return Icon.codes[name]||name;
}


export default Icon;
