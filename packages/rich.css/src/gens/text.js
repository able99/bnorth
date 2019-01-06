/**
 * @module
 */
import { getStyleValueSet, getStyleValueSetDefault, genClassObjects } from '../utils';


function genFuncText({utilColors, mainColors, textColors, textFontFamily, textSize, textWeight, textStyle, textDecoration, textAlign, textVerticalAligns, textWhiteSpaces, lineHeight, textTruncate}) {
  lineHeight = getStyleValueSet(lineHeight);

  return Object.assign(
    genClassObjects('.text-size', {
      styleKey: 'font-size',
      styleValueSet: getStyleValueSet(textSize), 
    }), 
    genClassObjects('.text-weight', {
      styleKey: 'font-weight',
      styleValueSet: getStyleValueSet(textWeight), 
    }), 
    genClassObjects('.text-color', {
      styleKey: 'color',
      styleValueSet: { '-': textColors.normal, ...utilColors, ...mainColors, ...textColors },
    }), 
    genClassObjects('.text-style', {
      styleKey: 'font-style',
      styleValueSet: getStyleValueSet(textStyle), 
    }), 
    genClassObjects('.text-decoration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(textDecoration), 
    }), 
    genClassObjects('.text-align', {
      styleKey: true,
      styleValueSet: getStyleValueSet(textAlign), 
    }), 
    genClassObjects('.text-vertical-align', {
      styleKey: 'vertical-align',
      styleValueSet: getStyleValueSet(textVerticalAligns), 
    }), 
    genClassObjects('.text-white-space', {
      styleKey: 'white-space',
      styleValueSet: getStyleValueSet(textWhiteSpaces), 
    }), 
    genClassObjects('.text-family', {
      styleKey: 'font-family',
      styleValueSet: textFontFamily,
    }), 
    genClassObjects('.text-truncate', {
      selectorExt: '-',
      styleObjectMap: {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      }
    }),
    genClassObjects('.text-truncate', {
      selectorExt: '-',
      styleValueSet: getStyleValueSet(textTruncate),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': getStyleValueSetDefault(lineHeight),
        'max-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
      })
    }),
    genClassObjects('.text-truncate', {
      selectorExt: 'placeholder-',
      styleValueSet: getStyleValueSet(textTruncate),
      styleObjectMap: (styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue)=>({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': styleValueSetValue,
        'line-height': getStyleValueSetDefault(lineHeight),
        'max-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
        'min-height': (Number(getStyleValueSetDefault(lineHeight))*Number(styleValueSetValue)).toFixed(1)+'em',
      })
    }),
  );
}


export default genFuncText;