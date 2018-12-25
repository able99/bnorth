/**
 * @module
 */
import classes from '@bnorth/rich.css/lib/classes'; 


let functions = {};

/**
 * 增加基类组件 bf-style-function 属性的函数集合
 * @param {object} - 函数集合的名称和函数的键值对 
 * @returns {object} 函数集合
 */
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

/**
 * 虚拟组件基类，不可被直接使用，为组件提供通用的属性
 * 默认属性
 * @component
 * @static
 * @name BaseComponent
 */
export function BaseComponent(){}

BaseComponent.defaultProps = {
  /**
   * 设置 class name
   * 
   * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到 className 组件属性中
   * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接，追加到 className 组件属性中
   * - 当属性值不为真时，没有任何作用
   * @type {boolean|string|number} 
   * @example
   * ```jsx
   * <Panel bc-text-size="lg" />
   * ```
   */
  'bc-[classname]': '',
  /**
   * 设置 style，将属性名去掉 bs- 前缀，和属性值，追加到组件的 style 属性对象中
   * @type {*} 
   * @example
   * ```jsx
   * <Panel bs-width="50%" />
   * ```
   */
  'bs-[style]': '',
  /**
   * 设置 style 函数，将属性名去掉 bs- 前缀作为名称，从 bf-style-function 属性的函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的 style 属性对象中
   * @type {string|array} 
   * @example
   * ```jsx
   * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
   * import { addFunctions } from '@bnorth/components/lib/utils/props';
   * addFunctions({ backgroundImage });
   * 
   * export default props=>{
   *   return <Panel bf-background={[]} />
   * }
   * ```
   */
  'bf-[style-function]': '',
}