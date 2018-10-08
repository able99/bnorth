import gen from './gen';
import background from './gens/background';
import base from './gens/base';
import border from './gens/border';
import control from './gens/control';
import cursor from './gens/cursor';
import display from './gens/display';
import flex from './gens/flex';
import icon from './gens/icon';
import position from './gens/position';
import size from './gens/size';
import spacing from './gens/spacing';
import text from './gens/text';

export { setCssConfig, getCssConfig } from './gen'; 

export default function index() {
  gen('richcss', base, background, border, text, position, display, flex, spacing, size, cursor, control, icon);
}