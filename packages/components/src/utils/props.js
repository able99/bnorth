import classnames from 'classnames';
import { styleFlexSubGrow, styleFlexSubShrink, styleFlexSubBasis, styleFlexSubOrder } from '@bnorth/rich.css/lib/styles/flex'
import { transform } from '@bnorth/rich.css/lib/styles/animation'


export let functions = {
  styleFlexSubGrow, styleFlexSubShrink, styleFlexSubBasis, styleFlexSubOrder,
  transform,
}

export function cx(...args) {
  return classnames(...args);
};

export function cxm(...args) {
  return mergeClassName(cx(...args));
}

export function mergeClassName(className) {
  let classNames = className.split(/\s/);
  return classNames
    .filter((v,i,a)=>{let key=v.substr(0, v.lastIndexOf('-')); return !a.slice(i+1).find(vv=>vv.startsWith(key))})
    .join(' ');
}

export function genCommonProps(aprops) {
  let {
    active, selected, disabled,
    className, style, refWrap, ...props
  } = aprops||{};
  let classSet = {};
  let styleSet = {};

  Object.entries(props).forEach(([k,v])=>{
    if(k.startsWith('bs-')){
      let name = k.slice(3);
      styleSet[name] = v;
      delete props[k];
    }else if(k.startsWith('bc-')){
      let name = k.slice(3);
      classSet[name+(v===true?'':('-'+v))] = true;
      delete props[k];
    }else if(k.startsWith('bf-')){
      let name = k.slice(3);
      if(functions[name]) styleSet = {...styleSet, ...(functions[name](...(Array.isArray(v)?v:[v])))}
      delete props[k];
    }
  })
  
  if(active) classSet['active'] = true;
  if(selected) classSet['selected'] = true;
  if(disabled) classSet['disabled'] = true;
  
  return {
    ...props,
    className: cx(classSet, className),
    style: {...styleSet, ...style},
    selected, active, disabled,
    ref: refWrap,
  };
}

export function getSubComponentProps(
  i, length, props, 
  {className:subPropsEachClassName, style:subPropsEachStyle, ...subPropsEach}={}, 
  {className:subPropsClassName, style:subPropsStyle, ...subProps}={},
  subGetClassName, subGetStyle, subGetProps
){
  return {
    style: {
      ...((subGetStyle&&subGetStyle(i, length, props, subPropsEach, subProps))||{}), 
      ...subPropsStyle, 
      ...subPropsEachStyle,
    },
    className: cxm(
      subGetClassName&&subGetClassName(i, length, props, subPropsEach, subProps),
      subPropsClassName,
      subPropsEachClassName,
    ),
    ...((subGetProps&&subGetProps(i, length, props, subPropsEach, subProps))||{}),
    ...subProps,
    ...subPropsEach,
  };
}





// export function hascx(className, name) {
//   return className && className.split(' ').find(v=>v.trim().startsWith(name));
// }

// export function genItemProps(i, size, componentProps={}, aprops, getClassName, getProps, getStyle) {
//   let { className, style, ...props } = aprops;
//   let { className:componentClassName } = componentProps;
//   className = cx(componentClassName, className);

//   return {
//     ...componentProps,
//     ...props,
//     ...getProps&&getProps(i, size, componentProps),
//     style: {...style, ...getStyle&&getStyle(i, size, componentProps)},
//     className: cx(className, getClassName&&getClassName(i, size, componentProps, className)),
//   }
// }