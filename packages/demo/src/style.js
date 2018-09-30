import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import Icon from '@bnorth/components/lib/Icon';
import icoSvg from '../res/default.ico.svg';

let iconMap = {
  'left': 'keyboard_arrow_left',
  'right': 'keyboard_arrow_right', 
  'backTop': 'vertical_align_top', 
}

export default function(app) {
  genCss();
  Icon.appendSvgIcons(icoSvg);
  Icon.appendMap(iconMap);
}