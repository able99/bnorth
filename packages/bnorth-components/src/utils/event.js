// on, off, filter, listen
// node, eventName, handler, capture
export * from 'dom-helpers/events/'

export function createChainedFunction(...funcs) {
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