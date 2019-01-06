import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleFlex from '../compatibles/compatibleFlex';


function genFuncFlex({flexDisplay, flexDirection, flexJustify, flexAlign, flexWrap, flexSubFlex}) {
  return Object.assign(
    genClassObjects('.flex-display', {
      styleKey: 'display',
      styleValueSet: getStyleValueSet(flexDisplay),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-direction', {
      styleKey: true,
      styleValueSet: getStyleValueSet(flexDirection),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-justify', {
      styleKey: 'justify-content',
      styleValueSet: getStyleValueSet(flexJustify),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-align', {
      styleKey: 'align-items',
      styleValueSet: getStyleValueSet(flexAlign),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-wrap', {
      styleKey: true,
      styleValueSet: getStyleValueSet(flexWrap),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-sub-align', {
      styleKey: 'align-self',
      styleValueSet: getStyleValueSet(flexAlign),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-sub-flex', {
      styleKey: 'flex',
      styleValueSet: getStyleValueSet(flexSubFlex),
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-sub-flex-extend', {
      styleKey: 'flex-grow',
      styleValueMap: '1',
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-sub-flex-shrink', {
      styleKey: 'flex-shrink',
      styleValueMap: '1',
      styleObjectCompatible: compatibleFlex,
    }), 
    genClassObjects('.flex-overflow', {
      styleObjectMap: {
        'position': 'relative',
        'width': '100%',
      },
    }), 
    genClassObjects('.flex-overflow:before', {
      styleObjectMap: {
        'content': '" "',
        'display': 'inline-bloc',
        'width': '100%',
        'height': '1px',
      },
    }), 
    genClassObjects('.flex-overflow .text-truncate-old', {
      styleObjectMap: {
        'position': 'absolute',
        'width': '100%',
        'left': '0',
      },
    }), 
  );
}


export default genFuncFlex;