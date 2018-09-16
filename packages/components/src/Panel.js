/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import touchable from './hocs/touchable';
import { genCommonProps, cxm } from './utils/props';


let Panel = aprops=>{
  let {
    main, inline,
    aspect, aspectProps,
    component:Component='div', className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative';

  let classSet = {
    'scrollable': main,
    'flex-sub-flex-extend': main,
    'display-block-inline': inline,
    ['text-size-'+(bSize===true?'':bSize)]: bSize,
    ['text-color'+(bTheme===true?'':bTheme)]: bTheme,
  }
  
  
  let styleSet = {
    paddingBottom: `${aspect*100}%`,
  }

  return (
    <Component style={{...styleSet, ...style}} className={cxm(classStr, classSet, className)} {...props} >
      {aspect&&children?(
        <Panel.Aspect {...aspectProps}>{children}</Panel.Aspect>
      ):children}
    </Component>
  );
}

Panel.Aspect = aprops=>{
  let {
    main, 
    aspect, aspectProps,
    component:Component='div', className, style, 'b-theme':bTheme='view', 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-absolute offset-left-start offset-top-start square-full';

  return <Component style={style} className={cxm(classStr, className)} {...props}>{children}</Component>;
}

Panel.Touchable = touchable(Panel);


export default Panel;
