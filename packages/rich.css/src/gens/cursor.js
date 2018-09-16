import { getSelector, getStyleSet } from '../utils';


const Cursors = {
  '-': 'default',
  'default': true,
  'auto': true,
  'pointer': true,
  'not-allowed': true,
  'crosshair': true,
  'text': true,
  'wait': true,
  'help': true,
  'move': true,
  'n-resize': true,
  's-resize': true,
  'w-resize': true,
  'e-resize': true,
  'ne-resize': true,
  'nw-resize': true,
  'se-resize': true,
  'sw-resize': true,
}

export default function gen() {
  let ret = {};
  let baseSelector = 'cursor';

  Object.entries(Cursors).forEach(([k,v])=>(ret[getSelector(baseSelector, k)] = getStyleSet(baseSelector, v, {
    key: k,
  })))

  return ret;
}