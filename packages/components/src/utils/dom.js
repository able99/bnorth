/**
 * dom 操作工具集
 * @module
 */
import ReactDOM from 'react-dom';
import css from 'dom-helpers/style';
import offset from 'dom-helpers/query/offset';
import position from 'dom-helpers/query/position';


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
