import compatibleFlex from '../compatibles/compatibleFlex';


export function styleFlexSubOrder(val) {
  return compatibleFlex({
    'order': val,
  }, true);
}

export function styleFlexSubGrow(val) {
  return compatibleFlex({
    'flex-grow': val,
  }, true);
}

export function styleFlexSubShrink(val) {
  return compatibleFlex({
    'flex-shrink': val,
  }, true);
}

export function styleFlexSubBasis(val) {
  return compatibleFlex({
    'flex-basis': String(val.toFixed(2)) + '%',
  }, true);
}