/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React, { cloneElement } from 'react';
import { transiton, transform } from '@bnorth/rich.css/lib/styles/animation'; 
import { genCommonProps, cx, hascx } from './utils/props';


class AnimationSlider extends React.Component {
  render() {
    let {
      countToShow=1, index, timeout=300, innerProps:{className: classNameInner, style: styleInner, ...innerProps}={},
      component:Component='div', className, children, ...props
    } = genCommonProps(this.props);
    let items = React.Children.toArray(children).filter(v=>v.type===AnimationSlider.Item);
    children = React.Children.toArray(children).filter(v=>v.type!==AnimationSlider.Item);


    let classSet = {
      'overflow-a-hidden': true,
      'position-relative': !hascx(className, 'position'),
    }

    let classSetInner = {
      'flex-display-flex': true, 
      'flex-align-stretch': true, 
    }

    let styleSetInner = {
      width: `${100/countToShow*items.length}%`,
      ...transiton(timeout),
      ...transform('translateX',`${-100/items.length*index}%`),
      ...styleInner,
    }


    return (
      <Component className={cx(classSet, className)} {...props}>
        <div className={cx(classSetInner, classNameInner)} style={styleSetInner} {...innerProps}>
          {items.map((v,i,arr)=>cloneElement(v, {
            ...v.props, i, timeout, countToShow, index, 
          }))}
        </div>
        {children}
      </Component>
    )
  }
}

AnimationSlider.Item = aprops=>{
  let {
    i, timeout, countToShow, index,
    component:Component='div', className,...props
  } = genCommonProps(aprops);


  let classSet = {
    'overflow-a-hidden': true,
    'flex-sub-flex-extend': true,
  }


  return (
    <Component className={cx(classSet, className)} {...props} />
  )
}



export default AnimationSlider;