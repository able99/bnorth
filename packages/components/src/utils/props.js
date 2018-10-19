import classes from '@bnorth/rich.css/lib/classes'; 


export let functions = {};

export function addFunctions(args) {
  return Object.assign(functions, args);
}

export default function parseProps(aprops, aaprops) {
  let {
    active, selected, disabled,
    className, style, refWrap, ...props
  } = {...(typeof aaprops==='function'?aaprops(aprops):aaprops), ...aprops};
  let classSet = {};
  let styleSet = {};

  Object.entries(props).forEach(([k,v])=>{
    if(k.startsWith('bs-')){
      delete props[k]; if(!v) return; let name = k.slice(3);

      styleSet[name] = v;
    }else if(k.startsWith('bc-')){
      delete props[k]; if(!v) return; let name = k.slice(3); 

      classSet[name+(v===true?'':('-'+v))] = true;
    }else if(k.startsWith('bf-')){
      delete props[k]; if(!v) return; let name = k.slice(3); name = functions[name]; if(!name) return;
      
      Object.assign(styleSet, Array.isArray(v)?name(...v):name(v));
    }
  })
  
  if(active) classSet['active'] = true;
  if(selected) classSet['selected'] = true;
  if(disabled) classSet['disabled'] = true;
  
  return {
    ...props,
    className: classes(classSet, className),
    style: {...styleSet, ...style},
    selected, active, disabled,
    ref: refWrap,
  };
}
