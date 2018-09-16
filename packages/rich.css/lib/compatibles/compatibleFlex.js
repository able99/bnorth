"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compatible;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("./utils");

function compatible(styles, dom) {
  styles = Array.isArray(styles) ? styles : Object.entries(styles);
  var ret = {};
  styles.forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    ret[k] = v;

    if (k === 'display') {
      v.includes('inline') ? ret = (0, _utils.addSelectorMulti)(k, ret, '-webkit-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex') : ret = (0, _utils.addSelectorMulti)(k, ret, '-webkit-box', '-ms-flexbox', '-webkit-flex');
    } else if (k === 'flex-direction') {
      ret['-webkit-flex-direction'] = ret[k];
      ret['-ms-flex-direction'] = v;
      ret['-webkit-box-orient'] = v.includes('column') ? 'vertical' : 'horizontal';
      ret['-webkit-box-direction'] = v.includes('reverse') ? 'reverse' : 'normal';
    } else if (k === 'justify-content') {
      if (ret[k] === 'start' || ret[k] === 'end') ret[k] = "flex-".concat(v);
      ret['-webkit-justify-content'] = ret[k];
      ret['-webkit-box-pack'] = v;
      ret['-ms-flex-pack'] = v;
    } else if (k === 'align-items') {
      if (ret[k] === 'start' || ret[k] === 'end') ret[k] = "flex-".concat(v);
      ret['-webkit-align-items'] = ret[k];
      ret['-webkit-box-align'] = v;
      ret['-ms-flex-align'] = v;
    } else if (k === 'flex-wrap') {
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, true, true);
    } else if (k === 'align-self') {
      if (ret[k] === 'start' || ret[k] === 'end') ret[k] = "flex-".concat(v);
      ret['-webkit-align-self'] = ret[k];
      ret['-ms-flex-item-align'] = v;
    } else if (k === 'flex') {
      ret['-webkit-box-flex'] = v;
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, true, true, false);
    } else if (k === 'flex-grow') {
      ret['-webkit-box-flex'] = v;
      ret['-webkit-flex-grow'] = v;
      ret['-ms-flex-positive'] = v;
    } else if (k === 'flex-shrink') {
      ret['-webkit-flex-shrink'] = v;
      ret['-ms-flex-negative'] = v;
    } else if (k === 'order') {
      ret['-webkit-box-ordinal-group'] = v;
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, true, true, true);
    } else if (k === 'flex-basis') {
      ret = (0, _utils.addSelectorPrefix)(k, v, ret, true); //ret['width'] = v;
    }
  });
  return (0, _utils.stylesToDom)(ret, dom);
}