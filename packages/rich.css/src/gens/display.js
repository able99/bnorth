import { getStyleValueSet, genClassObjects } from '../utils';


function genFuncDisplay({directionAxis, display, visibility, opacity, pointerEvents, overflow, float}) {
  return Object.assign(
    genClassObjects('.display', {
      styleKey: true,
      styleValueSet: getStyleValueSet(display),
    }), 
    genClassObjects('.visibility', {
      styleKey: true,
      styleValueSet: getStyleValueSet(visibility),
    }), 
    genClassObjects('.opacity', {
      styleKey: true,
      styleValueSet: getStyleValueSet(opacity),
      styleValueMap: val=>(val/100).toFixed(2),
    }), 
    genClassObjects('.scrollable', {
      selectorExt: '-',
      styleKeySet: getStyleValueSet(directionAxis),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'max-width': styleKeySetKey!=='y'?'100%':undefined,
        'max-height': styleKeySetKey!=='x'?'100%':undefined,
        'overflow-x': styleKeySetKey!=='y'?'auto':'hidden',
        'overflow-y': styleKeySetKey!=='x'?'auto':'hidden',
        '-webkit-overflow-scrolling': 'touch',
      })
    }),
    genClassObjects('.overflow', {
      styleKey: true,
      styleKeySet: getStyleValueSet(directionAxis),
      styleValueSet: getStyleValueSet(overflow),
    }), 
    genClassObjects('.pointer-events', {
      styleKey: true,
      styleValueSet: getStyleValueSet(pointerEvents),
    }), 
    genClassObjects('.float', {
      styleKey: true,
      styleValueSet: getStyleValueSet(float),
    }), 
    genClassObjects('.clear:before', {
      styleObjectMap: {
        'content': "' '",
        'display': 'table',
      }
    }),
    genClassObjects('.clear:after', {
      styleObjectMap: {
        'content': "' '",
        'display': 'table',
        'clear': 'both',
      }
    }),
  );
}


export default genFuncDisplay;