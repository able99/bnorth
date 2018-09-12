import React from 'react';
import { genCommonProps, cx } from './utils/props';


export default (aprops) => {
  let { component:Component='div', className, mask, ...props } = genCommonProps(aprops);

  let classSet = {
    'position-absolute': true,
    'square-full': true,
    'offset-start-left': true,
    'offset-start-top': true,
    'bg-color-mask': mask,
    'overflow-hidden': true,
  };

  return <Component className={cx(classSet,className)} {...props} /> ;
}