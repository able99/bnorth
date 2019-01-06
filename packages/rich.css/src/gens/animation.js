import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


function genFuncAnimation({animationProperty, animationTime, animationTimingFunction, animationCount, animationDirection, animationPlayState}) {
  return Object.assign(
    genClassObjects('.transition-property', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationProperty),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.transition-duration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.transition-delay', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.transition-timing-function', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTimingFunction),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.animation-iteration-count', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationCount),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.animation-direction', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationDirection),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.animation-play-state', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationPlayState),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.animation-duration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    genClassObjects('.animation-delay', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
  );
}


export default genFuncAnimation;