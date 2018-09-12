/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { shadow } from 'rich.css/lib/styles/shadow'; 
import { transiton } from 'rich.css/lib/styles/animation'; 
import { timable } from './hocs/timable';
import { genCommonProps, cx } from './utils/props';


let ProgressBar = (aprops)=>{
  let {
    sum, isOver, timeout, intervalTime, onStop,
    component:Component='div', className, cTheme='link', cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let percent = (isOver?100:sum * 100 / timeout) % 101;
  isOver&&onStop&&setTimeout(()=>onStop(),intervalTime);

  let classSet = {
    'position-fixed': true,
    'offset-left': true,
    'offset-right': true,
    'offset-top': true,
    'width-full': true,
  };
  
  let classSetBar = {
    ['bg-color-'+cTheme]: true,
  };

  let styleSetBar = {
    height: 2,
    width: (percent < 0 ? 0 : percent) + '%',
    ...transiton(`${intervalTime}ms`, {property: 'width'}),
    ...shadow(),
  }


  return (
    <Component className={cx(classSet, className)} {...props} >
      <div className={cx(classSetBar)} style={styleSetBar}/>
    </Component>
  );
}


export default timable(ProgressBar, {defaultProps:{
  timeout: 200*100,
  intervalTime: 200,
  autoStop: false,
}});
