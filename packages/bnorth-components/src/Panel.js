/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import touchable from './hocs/touchable';
import { genCommonProps, cx, hascx } from './utils/props';


let Panel = (aprops)=>{
  let {
    main, 
    aspect, aspectClassName, aspectStyle,
    component:Component='div', style, className, containerClassName, containerStyle, children, ...props
  } = genCommonProps(aprops);
  
  
  let classSet = {
    'position-relative': true,
    'scrollable': main&&!hascx(className, 'scrollable'),
    'flex-sub-flex-extend': main&&!hascx(className, 'flex-sub-flex'),
  };

  let styleSet = {
    paddingBottom: `${aspect*100}%`,
  }

  let classSetAspect = {
    'position-absolute': true,
    'offset-left': true,
    'offset-top': true,
    'square-full': true,
  };


  return (
    <Component style={{...styleSet, ...style}} className={cx(classSet, className)} {...props} >
      {aspect&&children?<div style={aspectStyle} className={cx(classSetAspect, aspectClassName)}>{children}</div>:children}
    </Component>
  );
}


Panel.Touchable = touchable(Panel);
export default Panel;
