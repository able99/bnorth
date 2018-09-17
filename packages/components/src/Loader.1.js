/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { animation } from '@bnorth/rich.css/lib/styles/animation'; 
import { genCommonProps, cx, hascx } from './utils/props';

 
let Loader = (aprops)=>{
  let {
    timeout='1.5s', delay=0.2, keyframe='bouncedelay',
    component: Component = 'span', className, style, containerClassName, containerStyle, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSetItem = (i)=>{return{
    'width-em': true,
    'height-em': true,
    'margin-left-sm': i,
    'display-inline-block': true,
    ...(cStyle!=='hollow'?{
      ['bg-color-'+(cTheme||'component')]: !hascx(className, 'bg-color'),
    }:{
      'bg-color-white': !hascx(className, 'bg-color'),
      ['border-set-'+(cTheme||'component')]: !hascx(className, 'border'),
    }),
    ['text-size-'+cSize]: cSize,
  }};

  let styleSetItem = (i)=>({
    ...animation(keyframe, timeout, {delay: `${delay*i}s`}),
    ...style,
  });
  
  let classSet = {
    'text-align-center': true,
  };
    

  return (
    <Component className={cx(classSet, containerClassName)} {...props}>
      {Array(3).fill(0).map((v,i)=>(
        <div key={i} style={styleSetItem(i)} className={cx(classSetItem(i), className)} />
      ))}
      {children}
    </Component>
  );
}


export default Loader;
