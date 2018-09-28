import ReactDOM from 'react-dom';
import css from 'dom-helpers/style';
import offset from 'dom-helpers/query/offset';


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
export const domIsTouch = 'ontouchstart' in document;
export const domIsMouse = 'onmousedown' in document;
export const domTouchEventNameMaps = domIsTouch 
  ? {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
    cancel: 'touchcancel',
  } : domIsMouse ? {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
    cancel: 'mouseout',
  } : {};


// dom find
// -------------------
export function domFindNode(node) {
  return ReactDOM.findDOMNode(node);
}

export function domFindContainer(node, container) {
  let el=domFindNode(node);
  if(!el) return document.body;

  while((el=el.parentElement)) {
    if(el===document.body) return el;
    if(el.getAttribute('data-container-page')) return el;
    if(container===true&&el.getAttribute('data-container')==='true') return el;
    if(container&&el.getAttribute('data-container')===container) return el;
  }

  return document.body;
}

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

// dom offset
// -------------------
export function domOffset(node) {
  return offset(domFindNode(node));
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
export function chainedFuncs(...funcs) {
  return funcs.filter(f=>f).reduce((acc, f) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction(...args) {
      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

// on, off, filter, listen
// node, eventName, handler, capture
export * from 'dom-helpers/events/'