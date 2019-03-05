import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import Icon from '@bnorth/components/lib/Icon';
import Space from '@bnorth/components/lib/Space';
import {OverlayLoader} from '@bnorth/components/lib/Loader';
import icoSvg from '../res/default.ico.svg';
import './index.css';

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
  Space.props = {'b-theme': 'alert', 'data-a': 1}

  OverlayLoader.props = {style:{top: 45-3}}
}
