/**
 * 基础组件以及一些工具函数
 * @module
 */
import ReactDOM from 'react-dom';
import css from 'dom-helpers/style';
import offset from 'dom-helpers/query/offset';
import position from 'dom-helpers/query/position';
import classes from '@bnorth/rich.css/lib/classes'; 


const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};
 

// util
// -------------------
export function domCapitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function domTriggerBrowserReflow(node) {
  // reading a dimension prop will cause the browser to recalculate,
  // which will let our animations work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

// env
// -------------------
/**
 * 是否支持 touch
 * @type {boolean}
 */
export const domIsTouch = 'ontouchstart' in document;
/**
 * 是否支持鼠标
 * @type {boolean}
 */
export const domIsMouse = 'onmousedown' in document;


// dom find
// -------------------
/**
 * 返回组件对应的元素
 * @param {element|component} - 组件
 * @returns {element} 对应的元素
 */
export function domFindNode(node) {
  return ReactDOM.findDOMNode(node);
}

/**
 * 查找组件或元素的 container，查找模式：
 * 
 * 1. 如果父元素为 body 则返回 body
 * 1. 如果父元素是 page 则返回页面元素
 * 1. 返回具有参数 container 指定的，具有 data-container 响应名称属性的元素
 * @param {element|component} - 组件或元素
 * @param {true|string} - 查找模式
 * @returns {element} 所在的 container
 */
export function domFindContainer(node, container) {
  let el=domFindNode(node);
  if(!el) return document.body;

  while((el=el.parentElement)) {
    if(el===document.body) return el;
    if(el.getAttribute('data-page')) return el;
    if(container===true&&el.getAttribute('data-container')==='true') return el;
    if(container&&el.getAttribute('data-container')===container) return el;
  }

  return document.body;
}

/**
 * 查找组件或者元素的可滚动父元素
 * @param {element|component} - 组件或元素
 * @param {element|component} - 如果为真，直接作为结果返回
 * @param {boolean} - 是否是横向滚动 
 * @returns {element} 滚动父元素
 */
export function domFindScrollContainer(node, container, horizontal) {
  if (container) return ReactDOM.findDOMNode(container); 
  node = ReactDOM.findDOMNode(node);

  while (node.parentNode) {
    node = node.parentNode;
    if (node === document.body) return node; 

    const style = window.getComputedStyle(node);
    const overflow = (horizontal?style.getPropertyValue('overflow-x'):style.getPropertyValue('overflow-y'))||style.getPropertyValue('overflow');
    if (overflow === 'auto' || overflow === 'scroll') return node;
  }

  return document.body;
}

// dom portal
// -------------------
/**
 * 将组建以 portal 方式，render 到制定元素
 * @param {component} - 将 render 的组件 
 * @param {element} - render 到的元素
 */
export function domCreatePortal(component, container) {
  return ReactDOM.createPortal(component, container||document.body)
}

// dom offset
// -------------------
/**
 * @typedef ElementOffset
 * @type {object}
 * @param {number} x - 坐标 x
 * @param {number} y - 坐标 y
 * @param {number} width - 宽度
 * @param {number} height - 高度
 */
/**
 * 返回组件或者元素的坐标和尺寸
 * @param {component|element} - 目标元素或组件 
 * @param {element} - 相对于该元素的相对坐标，为空时是相对于浏览器的绝对坐标 
 * @returns {module:utils/dom~ElementOffset} - x,y 坐标，width,height 尺寸
 */
export function domOffset(node, container) {
  node = domFindNode(node);
  return container?position(node, container):offset(node);
}

export function domGetDimensionValue(elem, dimension="height") {
  elem = ReactDOM.findDOMNode(elem);
  let value = elem[`offset${domCapitalize(dimension)}`];
  let margins = MARGINS[dimension];

  return (
    value +
    parseInt(css(elem, margins[0]), 10) +
    parseInt(css(elem, margins[1]), 10)
  );
}

export function domGetScrollDimensionValue(elem, dimension="height") {
  return `${ReactDOM.findDOMNode(elem)[`scroll${domCapitalize(dimension)}`]}px`;
}

// event
// -------------------
/**
 * 将函数串联起来，返回一个函数，调用时将串行调用所包含的全部函数
 * @param  {...function} 全部函数
 * @returns {function} 串联后的函数 
 */
export function chainedFuncs(...funcs) {
  return funcs.filter(f=>f).reduce((acc, f) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (!acc) {
      return f;
    }

    return function chainedFunction(...args) {
      acc.apply(this, args);
      f.apply(this, args);
    };
  }, undefined);
}

// on, off, filter, listen
// node, eventName, handler, capture
export * from 'dom-helpers/events/'






/**
 * 虚拟组件基类，不可被直接使用，为组件提供通用的属性
 * 默认属性
 * @component
 * @exportdefault
 * @name BaseComponent
 */
export default function BaseComponent(aprops, Component, {isContainer}={}) {
  if(!Component) return null;
  let componentProps = Component.props;
  if(typeof componentProps === 'function') componentProps(aprops, Component);
  aprops = {...componentProps, ...aprops};

  let {
    active, selected, disabled,
    classNamePre, classNameExt, stylePre, styleExt, className, style, refWrap, ...props
  } = aprops;

  let classSet = {};
  let styleSet = {};

  if(isContainer){
    if(!props.containerProps) props.containerProps = aprops;
    if(Component.itemGetClassName&&!props.itemGetClassName) props.itemGetClassName = Component.itemGetClassName;
    if(Component.itemGetStyle&&!props.itemGetStyle) props.itemGetStyle = Component.itemGetStyle;
    if(Component.itemGetProps&&!props.itemGetProps) props.itemGetProps = Component.itemGetProps;
    if(!props.itemProps) props.itemProps = {};
  }

  Object.entries(props).forEach(([k,v])=>{
    /**
     * 设置组件的样式对象，将属性名去掉 bs- 前缀，和属性值，追加到组件的样式对象中
     * 
     * @attribute BaseComponent.bs-xxx
     * @type {number|string} 
     * @example
     * ```jsx
     * <Panel bs-width="50%" style={{height: '50%'}} /> // style: { widht: 50%, height: 50% }
     * ```
     */
    if(k.startsWith('bs-')){
      delete props[k]; if(!v) return; let name = k.slice(3);

      styleSet[name] = v;
    /**
     * 设置样式类
     * 
     * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到组件的样式类属性中
     * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接后，追加到组件的样式类属性中
     * - 当属性值不为真时，没有任何作用
     * 
     * @attribute BaseComponent.bc-xxx
     * @type {boolean|string|number} 
     * @example
     * ```jsx
     * <Panel bc-text-size="lg" bc-text-weight-={true} className="text-color-primary" /> // className: 'text-color-primary text-size-lg text-weight-'
     * ```
     */
    }else if(k.startsWith('bc-')){
      delete props[k]; if(!v) return; let name = k.slice(3); 

      classSet[name+(v===true?'':('-'+v))] = true;
    /**
     * 执行样式函数，并将结果设置到组件的样式对象。将属性名去掉 bs- 前缀作为函数名称，从样式函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的样式对象中
     * 
     * @attribute BaseComponent.bf-xxx
     * @type {number|string|array} 
       * @example
       * ```jsx
       * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
       * import { addFunctions } from '@bnorth/components/lib/utils/props';
       * addFunctions({ backgroundImage });
       * 
       * export default props=>{
       *   return <Panel bf-background={'bg.jpg'} /> // style: {backgroundImage: url(bg.jpg)}
       * }
       * ```
     */
    }else if(k.startsWith('bf-')){
      delete props[k]; if(!v) return; let name = k.slice(3); name = BaseComponent.styleFunctions[name]; if(!name) return;
      
      Object.assign(styleSet, Array.isArray(v)?name(...v):name(v));
    }else if(k.startsWith('bp-')){
      delete props[k]; if(!v) return; 
      k = k.slice(3);
      let index = k.indexOf('-'); if(index<0) return;
      let objName = k.slice(0, index);
      let propName = k.slice(index+1);
      if(!objName||!propName) return;
      objName += 'Props';
      props[objName] = props[objName]||{};
      props[objName][propName] = v;
    }
  })
  
  if(active) classSet['active'] = true;
  if(selected) classSet['selected'] = true;
  if(disabled) classSet['disabled'] = true;
  
  return {
    ...props,
    className: classes(classNamePre, classSet, className, classNameExt),
    style: {...stylePre, ...styleSet, ...style, ...styleExt},
    selected, active, disabled,
    ref: refWrap,
  };
}

/**
 * 样式函数映射集合
 */
BaseComponent.styleFunctions = {}



/**
 * 其他 react 标准属性，比如：
 * 
 * - className：样式类 
 * - style：样式对象，注意 react 使用样式对象，而不是样式字符串
 * - children：子元素
 * - onXXX：事件
 * - xxx：其他 react 属性和 dom 属性
 * @attribute BaseComponent.xxx
 */
/**
 * 设置映射组件
 * 
 * bnorth 组件，一般情况下都只是设置组件的样式和属性，或者设置默认的映射组件，而功能是由映射组件去完成。可以通过修改该属性，修改默认的映射组件。
 * 比如 Button 组件的默认映射组件为 button，可以修改为 a 元素
 * @attribute BaseComponent.component
 * @type {element|component}
 */
/**
 * 设置映射组件的映射组件，
 * 当映射组件设置的映射组件为 bnorth 组件，而不是元素时，还可以通过该属性，设置映射组件的映射组件，方便二次包装组件
 * @attribute BaseComponent.componentPanel
 * @type {element|component}
 */
/**
 * 其他映射组件可以设置的属性
 * @attribute BaseComponent.xxx
 */
/**
 * 设置组件通用的默认属性，当设置为回调函数时，参数是组件当前属性，返回值是属性，可覆盖当前属性
 * @member BaseComponent.props
 * @type {function|object}
 * @static
 */