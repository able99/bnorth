/**
 * @module
 */
import genConfig from './config';
import { stylesToString } from './utils';


/**
 * 读取配置
 * @returns {GenConfig} 配置对象
 */
export function getCssConfig() {
  return window.richCssConfig?window.richCssConfig:genConfig;
}

/**
 * 修改配置
 * @param {GenConfig} - 配置对象，只替换对象包含的属性
 * @example
 * ```js
 * import { getCssConfig, setCssConfig } from '@bnorth/rich.css/lib/gen';
 * let { textColors } = getCssConfig();
 * textColors.normal = '#222222';
 * setCssConfig({textColors});
 * ```
 */
export function setCssConfig(config={}) {
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

/**
 * 根据传入的 gen 函数集合，生成 css dom 对象，并写入 dom header
 * @static
 * @param {string} - 写入 header 的 id
 * @param  {...function} - gen 函数集合
 * @example
 * ```js
 * import cssGen from '@bnorth/rich.css/lib/gen';
 * import genText from '@bnorth/rich.css/lib/gens/text';
 * cssGen('richcss', genText);
 * ```
 */
function gen(name='richcss', ...gens) {
  let config = getCssConfig();
  let styleElement = getStyleElement(name);

  return gens.forEach(v=>writeStyles(v(config), styleElement, true));
}

export default gen;
