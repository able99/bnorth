import { getSelector, getStyleSet } from '../utils';
import compatibleFlex from '../compatibles/compatibleFlex';


const Inlines = {
  'flex':  'flex' ,
  'flex-inline': 'flex-inline',
}

const Directions = {
  'h':  'row',
  'v':  'column' ,
  'hv': 'row-reverse',
  'vv': 'column-reverse',
}

const Justifis = {
  'start':   'flex-start',
  'center':  'center',
  'end':     'flex-end',
  'between': 'space-between',
  'around':  'space-around',
}

const Aligns = {
  'start':    'flex-start',
  'center':   'center',
  'end':      'flex-end',
  'baseline': 'baseline',
  'stretch':  'stretch',
}

const Wraps = {
  'wrap': 'wrap',
  'nowrap': 'nowrap',
  'reverse': 'reverse',
}

const BaseSelector = 'flex';
const BaseSelectorSub = 'flex-sub';

export default function gen() {
  let ret = {};

  Object.entries(Inlines).forEach(([k,v])=>(ret[getSelector(BaseSelector, 'display', k)] = compatibleFlex(getStyleSet('display', v))));
  Object.entries(Directions).forEach(([k,v])=>(ret[getSelector(BaseSelector, 'direction', k)] = compatibleFlex(getStyleSet('flex-direction', v))));
  Object.entries(Justifis).forEach(([k,v])=>(ret[getSelector(BaseSelector, 'justify', k)] = compatibleFlex(getStyleSet('justify-content', v))));
  Object.entries(Aligns).forEach(([k,v])=>(ret[getSelector(BaseSelector, 'align', k)] = compatibleFlex(getStyleSet('align-items', v))));
  Object.entries(Wraps).forEach(([k,v])=>(ret[getSelector(BaseSelector, 'wrap', k)] = compatibleFlex(getStyleSet('flex-wrap', v))));

  Object.entries(Aligns).forEach(([k,v])=>(ret[getSelector(BaseSelectorSub, 'align', k)] = compatibleFlex(getStyleSet('align-self', v))));
  ret[getSelector(BaseSelectorSub, 'flex-auto')] = compatibleFlex({ 'flex': 'auto', });
  ret[getSelector(BaseSelectorSub, 'flex-none')] = compatibleFlex({ 'flex': 'none', });
  ret[getSelector(BaseSelectorSub, 'flex-extend')] = compatibleFlex({ 'flex': '1', });
  ret[getSelector(BaseSelectorSub, 'flex-grow')] = compatibleFlex({ 'flex-grow': 1, });
  ret[getSelector(BaseSelectorSub, 'flex-shrink')] = compatibleFlex({ 'flex-shrink': 1, });
  
  ret[getSelector(BaseSelector, 'overflow')] = {
    'position': 'relative',
    'width': '100%',
  };
  ret[getSelector(BaseSelector, 'overflow:before')] = {
    'content': '" "',
    'display': 'inline-bloc',
    'width': '100%',
    'height': '1px',
  };
  ret[getSelector(BaseSelector, 'flex-overflow .text-truncate-old')] = {
    'position': 'absolute',
    'width': '100%',
    'left': '0',
  };
  

  return ret;
}