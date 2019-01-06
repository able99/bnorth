import { getStyleValueSet, getStyleValueSetDefault, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


function genFuncBase({ textColors, utilColors, textSize, hMapTextSize, textFontFamily, textWeight, bodyBackground, lineHeight, transitionTime }) {
  textSize = getStyleValueSet(textSize);
  textWeight = getStyleValueSet(textWeight);
  lineHeight = getStyleValueSet(lineHeight);

  return Object.assign(
    genClassObjects('html', {
      styleObjectMap: {
        'font-size': getStyleValueSetDefault(textSize),
      },
    }), 
    genClassObjects('body', {
      styleObjectMap: {
        'font-size':  getStyleValueSetDefault(textSize),
        'color':       textColors.normal,
        'font-family': getStyleValueSetDefault(textFontFamily),
        'font-weight': getStyleValueSetDefault(textWeight),
        'line-height': getStyleValueSetDefault(lineHeight),
        'background':  bodyBackground,
      },
    }), 
    genClassObjects('h', {
      styleValueSet: getStyleValueSet(hMapTextSize),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>{
        return {
          'font-weight': textWeight.bold,
          'font-size': textSize[styleValueSetValue],
        }
      }
    }),
    genClassObjects('strong', {
      styleObjectMap: {
        'font-weight': textWeight.bold,
      },
    }), 
    genClassObjects('hr', {
      styleObjectMap: {
        'border':  `1px solid ${utilColors.border}`,
        'border-width': '1 0 0',
        'clear': 'both',
        'height': 0,
      },
    }), 
    genClassObjects('.transition-set', {
      styleKey: 'transition',
      styleValueSet: getStyleValueSet(transitionTime),
      styleValueMap: val=>`${val} ease-out`,
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.line-height', {
      styleKey: true,
      styleValueSet: lineHeight, 
    }), 
    genClassObjects('.outline-none-', {
      styleObjectMap: {
        'outline': 'none',
      },
    }), 
    genClassObjects('.appearance-none-', {
      styleObjectMap: {
        'appearance': 'none',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
      },
    }), 
    genClassObjects('.backface-hidden-', {
      styleObjectMap: {
        'backface-visibility': 'hidden',
      },
    }), 
    genClassObjects('.force-hardware-acceleration-', {
      styleObjectMap: {
        'transform': 'translateZ(0)',
        'backface-visibility': 'hidden',
        'perspective': '1000',
      },
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.font-smoothing-antialiased-', {
      styleObjectMap: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
    }), 
  );
}


export default genFuncBase;