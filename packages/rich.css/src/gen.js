import cssConfig from './config';
import { stylesToString } from './utils';


export function getCssConfig() {
  return window.richCssConfig?window.richCssConfig:cssConfig;
}

export function setCssConfig(config={}, options={}) {
  let ret = {...getCssConfig(), ...config};
  return window.richCssConfig = ret;
}

export function createStyleElement(name) {
  let styleElement = document.createElement('style');
  styleElement.setAttribute('data-name', name)
  document.head.appendChild(styleElement);
  return styleElement;
}

export function getStyleElement(name) {
  let styleElement = document.head.querySelector(`style[data-name=${name}]`)
  return styleElement || createStyleElement(name);
}

export function writeStyles(styles, styleElement, append) {
  if(!styles||!styleElement) return;

  let html = stylesToString(styles);
  append?(styleElement.innerHTML+=html):(styleElement.innerHTML=html);
}

export default function cssGen(name='richcss', ...gens) {
  let config = getCssConfig();
  let styleElement = getStyleElement(name);

  return gens.forEach(v=>writeStyles(v(config), styleElement, true));
}
