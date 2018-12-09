import { getSelector, getStyleSet, getSizeSet } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


const TimingFunctions = {
  'ease': true,
  'linear': true,
  'easein': 'ease-in',
  'easeout': 'ease-out',
  'easeinout': 'ease-in-out',
  'cubicbezier': 'cubic-bezier',
}

const Directions = {
  'normal': true,
  'reverse': true,
  'alternate': true,
  'alternatereverse': 'alternate-reverse',
}

const PlayStates = {
  'running': true,
  'paused': true,
}

const baseSelectorTransition = 'transition';
const baseSelectorAnimation = 'animation';


export function genTransitionProperty(config) {
  let ret = {};
  let sizes = getSizeSet('animationProperty', config);
  let func = 'property'
  let selector = `${baseSelectorTransition}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, k))));
  return ret;
}

export function genTransitionDuration(config) {
  let ret = {};
  let sizes = getSizeSet('animationTime', config);
  let func = 'duration'
  let selector = `${baseSelectorTransition}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v))));
  return ret;
}

export function genTransitionDelay(config) {
  let ret = {};
  let sizes = getSizeSet('animationTime', config);
  let func = 'delay'
  let selector = `${baseSelectorTransition}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v))));
  return ret;
}

export function genTransitionTimingFunction(config) {
  let ret = {};
  let func = 'timing-function'
  let selector = `${baseSelectorTransition}-${func}`;
  Object.entries(TimingFunctions).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v, {key: k}))));
  return ret;
}

export function genAnimationCount(config) {
  let ret = {};
  let sizes = getSizeSet('animationCount', config);
  let func = 'iteration-count'
  let selector = `${baseSelectorAnimation}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v))));
  return ret;
}

export function genAnimationDirection(config) {
  let ret = {};
  let func = 'direction'
  let selector = `${baseSelectorAnimation}-${func}`;
  Object.entries(Directions).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v, {key: k}))));
  return ret;
}

export function genAnimationPlayState(config) {
  let ret = {};
  let func = 'play-state'
  let selector = `${baseSelectorAnimation}-${func}`;
  Object.entries(PlayStates).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v, {key: k}))));
  return ret;
}

export function genAnimationDuration(config) {
  let ret = {};
  let sizes = getSizeSet('animationTime', config);
  let func = 'duration'
  let selector = `${baseSelectorAnimation}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v))));
  return ret;
}

export function genAnimationDelay(config) {
  let ret = {};
  let sizes = getSizeSet('animationTime', config);
  let func = 'delay'
  let selector = `${baseSelectorAnimation}-${func}`;
  Object.entries(sizes).forEach(([k,v])=>(ret[getSelector(selector, k)] = compatibleAnimation(getStyleSet(selector, v))));
  return ret;
}

export default function gen(config) {
  return {
    ...genTransitionProperty(config), 
    ...genTransitionDuration(config), 
    ...genTransitionDelay(config), 
    ...genTransitionTimingFunction(config), 
    ...genAnimationCount(config), 
    ...genAnimationDirection(config), 
    ...genAnimationPlayState(config), 
    ...genAnimationDuration(config), 
    ...genAnimationDelay(config), 
  };
}