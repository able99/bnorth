/**
 * 基础组件以及一些工具函数
 * @module
 */
import ReactDOM from 'react-dom';
import css from 'dom-helpers/style';
import offset from 'dom-helpers/query/offset';
import position from 'dom-helpers/query/position';


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
 * 1. 返回具有参数 dock 指定的，具有 data-dock 响应名称属性的元素
 * @param {element|component} - 组件或元素
 * @param {true|string} - 查找模式
 * @returns {element} 所在的 dock
 */
export function domFindDock(node, dockParam) {
  let el=domFindNode(node);
  if(!el) return document.body;
  if(dockParam==='parent') return el.parentElement;

  while((el=el.parentElement)) {
    if(el===document.body) return el;
    if(el.getAttribute('data-page')) return el;
    if(dockParam===true&&el.getAttribute('data-dock')==='true') return el;
    if(dockParam&&el.getAttribute('data-dock')===dockParam) return el;
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
export function domFindScrollDock(node, dock, horizontal) {
  if (dock) return ReactDOM.findDOMNode(dock); 
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
export function domCreatePortal(component, dock) {
  return ReactDOM.createPortal(component, dock||document.body)
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
export function domOffset(node, dock) {
  node = domFindNode(node);
  return dock?position(node, dock):offset(node);
}

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

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
export default function BaseComponent(props) {
  props = {
    ...(typeof props['b-precast']==='function'?props['b-precast'](props):props['b-precast']), 
    ...(typeof props['b-dynamic']==='function'?props['b-dynamic'](props):props['b-dynamic']),
    ...props
  }
  delete props['b-precast'];
  delete props['b-dynamic'];

  Object.entries(props).forEach(([k,v])=>{
    if(k.startsWith('bp-')){
      delete props[k]; 
      k = k.slice(3);
      let index = k.indexOf('-'); if(index<0) return;
      let objName = k.slice(0, index);
      let propName = k.slice(index+1);
      if(!objName||!propName) return;
      objName += 'Props';
      props[objName] = {...props[objName]};
      props[objName][propName] = v;
    }
  })
  
  return props;
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