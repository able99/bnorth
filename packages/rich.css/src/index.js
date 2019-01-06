/**
 * @module 
 */
import cssGen from './gen';
import background from './gens/background';
import base from './gens/base';
import border from './gens/border';
import control from './gens/control';
import cursor from './gens/cursor';
import display from './gens/display';
import flex from './gens/flex';
import position from './gens/position';
import size from './gens/size';
import spacing from './gens/spacing';
import text from './gens/text';

/**
 * 生成全部 css class names
 * 
 * 执行后，将读取 css 配置对象，生成并写入 html header。修改 css 配置，需要在执行该函数前
 * 
 * 一般来说，在生成前，还需要引入标准化 css 文件，如果需要还需要引入自定义 css 文件等
 * @exportdefault
 * @example
 * ```js
 * import '@bnorth/rich.css/css/normalize.css';
 * import './index.css';
 * import genCss from '@bnorth/rich.css';
 * 
 * let app = new App({
 * plugin:{
 *   onAppStarting: async ()=>{genCss()},
 * })
 * app.start();
 * ```
 */
function genCss() {
  cssGen('richcss', base, background, border, text, position, display, flex, spacing, size, cursor, control);
}

export default genCss;