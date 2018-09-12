import ReactDOM from 'react-dom';
import css from 'dom-helpers/style';


import offset from 'dom-helpers/query/offset';

export function domOffset(node) {
  node = ReactDOM.findDOMNode(node);
  return offset(node);
}

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};


export const domIsTouch = 'ontouchstart' in document;
export const domIsMouse = 'onmousedown' in document;

export const domTouchEventNameMaps = domIsTouch ? {
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


export function domCapitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function domTriggerBrowserReflow(node) {
  // reading a dimension prop will cause the browser to recalculate,
  // which will let our animations work
  node.offsetHeight; // eslint-disable-line no-unused-expressions
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
