/**
 * 滑动动画
 * @module
 */
import React, { cloneElement } from 'react';
import { transiton, transform } from '@bnorth/rich.css/lib/styles/animation'; 
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


// Animation Slider
// --------------------------

/**
 * 滑动动画组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let AnimationSlider = aprops=>{
  let {
    countToShow, index, timeout, 
    innerProps, itemProps, content,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, AnimationSlider.props);

  children = React.Children.toArray(children).filter(v=>v).map((v,i)=>cloneElement(v, {
    countToShow, 
    index, 
    timeout, 
    i,
    ...itemProps,
    ...v.props,
  }));

  let classStr = 'overflow-a-hidden position-relative';

  return (
    <Component component={componentPanel} className={classes(classStr, className)} {...props}>
      <Inner countToShow={countToShow} index={index} timeout={timeout} {...innerProps}>
        {children}
      </Inner>
      {content}
    </Component>
  )
}

AnimationSlider.defaultProps = {};
/**
 * 设置一组显示的条目的数量
 * @type {number}
 */
AnimationSlider.defaultProps.countToShow = 1;
/**
 * 设置当前显示的组索引
 * @attribute module:AnimationSlider.AnimationSlider.index
 * @type {number}
 */
/**
 * 设置动画时间，单位是毫秒
 * @type {number}
 */
AnimationSlider.defaultProps.timeout = 350;
/**
 * 设置内置容器的属性
 * @attribute module:AnimationSlider.AnimationSlider.innerProps
 * @type {object}
 */
/**
 * 统一设置各个条目的属性
 * @attribute module:AnimationSlider.AnimationSlider.itemProps
 * @type {object}
 */
/**
 * 设置除各个动画条目之外的内容
 * @attribute module:AnimationSlider.AnimationSlider.content
 * @type {component|element}
 */
/**
 * 参见 BaseComponent
 */
AnimationSlider.defaultProps.component = 'div';

export default AnimationSlider;


// Animation Slider inner
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @mount AnimationSlider.Inner
 */
let Inner = aprops=>{
  let {
    countToShow, index, timeout,
    component:Component, className, style, children, ...props
  } = parseProps(aprops, Inner.props);

  children = React.Children.toArray(children);

  let classStr = 'flex-display-block flex-align-stretch';
  let styleSet = {
    width: `${100/countToShow*children.length}%`,
    ...transiton(timeout),
    ...transform('translateX',`${-100/children.length*(index%children.length)}%`),
    ...style,
  }

  return <Component className={classes(classStr, className)} style={styleSet} {...props}>{children}</Component>;
}

Inner.defaultProps = {};
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.countToShow
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.index
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Inner.timeout
 */
/**
 * 参见 BaseComponent
 */
Inner.defaultProps.component = Panel;

Object.defineProperty(AnimationSlider,"Inner",{ get:function(){ return Inner }, set:function(val){ Inner = val }})


// Animation Slider item
// --------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @augments BaseComponent
 * @mount AnimationSlider.Item
 */
let Item = aprops=>{
  let {
    i, timeout, countToShow, index,
    component:Component=Panel, componentPanel, className,...props
  } = parseProps(aprops, Item.props);

  let classStr = 'overflow-a-hidden flex-sub-flex-extend';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(AnimationSlider,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 索引号
 * @attribute module:AnimationSlider~Item.i
 * @type {number}
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.countToShow
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.index
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~Item.timeout
 */
/**
 * 参见 BaseComponent
 */
Item.defaultProps.component = Panel;