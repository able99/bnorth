import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


function genFuncPosition({ position, directionOffsetAll, directionOffset }) {
  return Object.assign(
    genClassObjects('.position', {
      styleKey: 'position',
      styleValueSet: getStyleValueSet(position),
    }), 
    genClassObjects('.offset', {
      selectorExt: 'start',
      styleKeySet: directionOffsetAll,
      styleValueMap: ()=>'0',
    }),
    genClassObjects('.offset', {
      selectorExt: 'center',
      styleKey: ' ',
      styleKeySet: directionOffset,
      styleValueMap: ()=>'50%',
    }),
    genClassObjects('.offset', {
      selectorExt: 'end',
      styleKey: ' ',
      styleKeySet: directionOffset,
      styleValueMap: ()=>'100%',
    }),
    genClassObjects('.translate-center', {
      selectorExt: 'a',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(-50%, -50%, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
    genClassObjects('.translate-center', {
      selectorExt: 'x',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(-50%, 0, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
    genClassObjects('.translate-center', {
      selectorExt: 'y',
      styleKey: 'transform',
      styleValueMap: ()=>'translate3d(0, -50%, 0)',
      styleObjectCompatible: compatibleAnimation,
    }),
  );
}


export default genFuncPosition;