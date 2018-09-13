import cx from 'classnames';
import { styleFlexSubGrow, styleFlexSubShrink, styleFlexSubBasis, styleFlexSubOrder } from '@bnorth/rich.css/lib/styles/flex'


export { default as cx } from 'classnames';

export function hascx(className, name) {
  return className && className.split(' ').find(v=>v.trim().startsWith(name));
}

// export function mergeClassName(...args){
//   let ret;
//   for(let arg of args) {
//     let className = cx(arg);
//     if(!ret) ret = className;
//     className.split(/\s*/).forEach(v=>{

//     })
//   }
// }

export function genSelector(name, ...args) {
  args.forEach(v=>{
    if(!v||v===true) return;
    if(Array.isArray(v)) v = v[0]===true?v[1]:v[0];
    name += `-${v}`;
  })
  return name;
}

export function genCommonProps(aprops, hasContainer) {
  let {
    className, containerClassName, style, containerStyle,
    scrollable, block, 
    active, selected, disabled,
    radius, rounded,
    cursor, 
    flexDisplay, flexDirection, flexJustify, flexAlign, flexWrap, 
    flexSubAlign, flexSubFlex, flexSubGrow, flexSubShrink, flexSubBasis, flexSubOrder,
    refWrap,
    ...props
  } = aprops||{};


  

  let classSet = {};
  let styleSet = {};
  let baseSelector = '';
  
  if(active) classSet['active'] = true;
  if(selected) classSet['selected'] = true;
  if(disabled) classSet['disabled'] = true;
  
  
  if(block){
    classSet['display-block'] = true;
    classSet['width-full'] = true;
  }

  if(radius){
    classSet['border-radius'] = true;
  }

  if(rounded){
    classSet['border-radius-rounded'] = true;
  }

  if(scrollable){
    classSet[genSelector('scrollable', scrollable)] = true;
  }

  baseSelector = 'flex';
  if(flexDisplay){
    classSet[genSelector(baseSelector, 'display', [flexDisplay, 'flex'])] = true;
  }
  if(flexDirection){
    classSet[genSelector(baseSelector, 'direction', [flexDirection, 'v'])] = true;
  }
  if(flexJustify){
    classSet[genSelector(baseSelector, 'justify', [flexJustify, 'center'])] = true;
  }
  if(flexAlign){
    classSet[genSelector(baseSelector, 'align', [flexAlign, 'center'])] = true;
  }
  if(flexWrap){
    classSet[genSelector(baseSelector, 'wrap', [flexWrap, 'wrap'])] = true;
  }

  baseSelector = 'flex-sub'
  if(flexSubAlign){
    classSet[genSelector(baseSelector, 'align', [flexSubAlign, 'center'])] = true;
  }
  if(flexSubFlex){
    classSet[genSelector(baseSelector, 'flex', [flexSubFlex, 'extend'])] = true;
  }
  if(flexSubGrow){
    styleSet = {...styleSet, ...styleFlexSubGrow(flexSubGrow)}
  }
  if(flexSubShrink){
    styleSet = {...styleSet, ...styleFlexSubShrink(flexSubShrink)}
  }
  if(flexSubBasis){
    styleSet = {...styleSet, ...styleFlexSubBasis(flexSubBasis)}
  }
  if(flexSubOrder){
    styleSet = {...styleSet, ...styleFlexSubOrder(flexSubOrder)}
  }


  return {
    ...props,
    className: cx(classSet, className),
    style: {...styleSet, ...style},
    selected,
    ref: refWrap,
  };
}

export function genItemProps(i, size, componentProps={}, aprops, getClassName, getProps, getStyle) {
  let { className, style, ...props } = aprops;
  let { className:componentClassName } = componentProps;
  className = cx(componentClassName, className);

  return {
    ...componentProps,
    ...props,
    ...getProps&&getProps(i, size, componentProps),
    style: {...style, ...getStyle&&getStyle(i, size, componentProps)},
    className: cx(className, getClassName&&getClassName(i, size, componentProps, className)),
  }
}