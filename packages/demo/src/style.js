import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import Icon from '@bnorth/components/lib/Icon';
import List from '@bnorth/components/lib/List';
import icoSvg from '../res/default.ico.svg';
// import './index.css';

let iconMap = {
  'left': 'keyboard_arrow_left',
  'right': 'keyboard_arrow_right', 
  'up': 'keyboard_arrow_up',
  'down': 'keyboard_arrow_down', 
  'backTop': 'vertical_align_top', 
}

export default function(app) {
  genCss();

  Icon.appendSvgIcons(icoSvg);
  Icon.appendMap(iconMap);

  List.Item.defaultProps['b-precast']['bc-padding-a'] = 'lg';
  List.Item.defaultProps['b-precast']['bp-media-b-size'] = 'xxs';
  List.Item.defaultProps['b-precast']['bp-title-b-size'] = '';
  List.Item.defaultProps['b-precast']['bp-arrow-b-size'] = 'xxxl';
}
