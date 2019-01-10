/**
 * @module
 */
import genConfig from './config';
import { classObjectsToString } from './utils';


/**
 * 样式开关，实际上 - 符号，放在样式结尾。与默认值意义不同，有些默认值也是 - 结尾
 * @typedef StyleSwitcher
 * @type {string}
 */


/**
 * 样式表的描述对象
 * @typedef ClassObjects
 * @type {object}
 */

/**
 * 样式生成函数
 * @typedef GenFunc
 * @type {function}
 * @param {module:config~GenConfig} config - 配置对象
 * @returns {module:gen~ClassObjects}
 */

/**
 * 读取配置
 * @returns {module:config~GenConfig} 配置对象
 */
export function getCssConfig() {
  return window.richCssConfig?window.richCssConfig:genConfig;
}

/**
 * 修改配置
 * @param {module:config~GenConfig} - 配置对象，只替换对象包含的属性
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

  let html = classObjectsToString(styles);
  append?(styleElement.innerHTML+=html):(styleElement.innerHTML=html);
}

/**
 * 根据传入的 gen 函数集合，生成 css dom 对象，并写入 dom header
 * @static
 * @param {string} - 写入 header 的 id
 * @param  {...module:gen~GenFunc} - gen 函数集合
 * @example
 * ```js
 * import cssGen from '@bnorth/rich.css/lib/gen';
 * import genFuncText from '@bnorth/rich.css/lib/gens/text';
 * cssGen('richcss', genFuncText);
 * ```
 */
function gen(name='richcss', ...gens) {
  let config = getCssConfig();
  let styleElement = getStyleElement(name);
  let classObjects = Object.assign({}, ...gens.map(v=>v(config)));
  writeStyles(classObjects, styleElement, true);
}


export default gen;
