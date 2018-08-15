export function getComponentDisplayName(component, defaultName='hoc') {
  return component.displayName || component.name || defaultName;
}

export function cloneStaticMethod(from, to) {
  Object.entries(from).forEach(([k,v])=>k!=='propTypes'&&(to[k]=v));
}

export function applyHocOptions(component, options={}) {
  if(!component) return component;
  Object.entries(options).forEach(([k,v])=>{
    if(k === 'defaultProps') {
      component[k] = {...component[k], ...v};
    }else {
      component.prototype[k] = v;
    }
  })
}

export default function hocHelper(WrappedComponent, EnhancedComponent, options, enhancedName, defaultName) {
  cloneStaticMethod(WrappedComponent, EnhancedComponent);
  applyHocOptions(EnhancedComponent, options);
  EnhancedComponent.displayName = `${enhancedName}-${getComponentDisplayName(WrappedComponent, defaultName)}`;
  return EnhancedComponent;
}