import { getSelector, getStyleSet } from '../utils';


const Cursors = {
  '-': 'default',
  'default': true,
  'auto': true,
  'pointer': true,
  'notallowed': 'not-allowed',
  'crosshair': true,
  'text': true,
  'wait': true,
  'help': true,
  'move': true,
  'nresize': 'n-resize',
  'sresize': 's-resize',
  'wresize': 'w-resize',
  'eresize': 'e-resize',
  'neresize': 'ne-resize',
  'nwresize': 'nw-resize',
  'seresize': 'se-resize',
  'swresize': 'sw-resize',
}

export default function gen() {
  let ret = {};
  let baseSelector = 'cursor';

  Object.entries(Cursors).forEach(([k,v])=>(ret[getSelector(baseSelector, k)] = getStyleSet(baseSelector, v, {
    key: k,
  })))

  return ret;
}