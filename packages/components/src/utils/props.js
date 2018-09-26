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
