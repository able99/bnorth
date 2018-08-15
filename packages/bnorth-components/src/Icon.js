/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx, hascx } from './utils/props';


let Icon = (aprops)=>{
  let {
    name, src, imgProps:{className:imgClassName, ...imgProps}={},
    component: Component = 'span', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'font-smoothing-antialiased': true,
    'text-decoration-none': true,
    'line-height-1': true,
    'display-inline-block': !hascx(className, 'display')&&!hascx(className, 'flex-display'),
    'overflow-hidden': true, 
  };
  
  if(cStyle==='hollow'){
    classSet['padding-xxs'] = !hascx(className, 'padding');
    classSet['bg-color-white'] = true;
    
    if(cTheme){
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-'+cTheme] = true;
    }else{
      classSet['border-set-border'] = true;
    }
  }else if(cStyle==='solid'){
    classSet['padding-xxs'] = !hascx(className, 'padding');

    if(cTheme){
      classSet['bg-color-'+cTheme] = true;
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-white'] = !hascx(className, 'text-color');
    }else{
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
    }
  }else{
    classSet['text-color-'+cTheme] = cTheme;
  }

  classSet['text-size-'+cSize] = cSize;

  if(name) props['data-icon-name'] = Icon.getCode(name);

  let classSetImg = {
    'width-auto': true,
    'height-em': true,
    'min-height-em': true,
  };


  return (
    <Component className={cx('icon', classSet, className)} {...props}>
      {src?(<img alt="" src={src} className={cx(classSetImg, imgClassName)} {...imgProps}/>):null}
      {children}
    </Component>
  );
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
