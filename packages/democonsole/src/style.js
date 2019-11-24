// import '@bnorth/rich.css/css/normalize.css';
import genCss from '@bnorth/rich.css';
import { getCssConfig, setCssConfig } from '@bnorth/rich.css/lib/gen';
import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
import { shadow } from '@bnorth/rich.css/lib/styles/shadow';
import { transform } from '@bnorth/rich.css/lib/styles/animation';
import BaseComponent from '@bnorth/components/lib/BaseComponent';
// import Icon from '@bnorth/components/lib/Icon';
// import icoSvg from '../res/default.ico.svg';

import notification from 'antd/es/notification';

import 'antd/es/layout/style';
import 'antd/es/menu/style';
import 'antd/es/dropdown/style';
import 'antd/es/icon/style';
import 'antd/es/button/style';
import 'antd/es/avatar/style';
import 'antd/es/page-header/style';
import 'antd/es/card/style';
import 'antd/es/row/style';
import 'antd/es/col/style';
import 'antd/es/table/style';
import 'antd/es/tag/style';
import 'antd/es/modal/style';
import 'antd/es/divider/style';
import 'antd/es/input/style';
import 'antd/es/form/style';
import 'antd/es/notification/style';

import './style.less';



export default function(app) {
  let cssConfig = getCssConfig();
  setCssConfig(cssConfig);
  genCss();

  BaseComponent.styleFunctions.backgroundImage = backgroundImage;
  BaseComponent.styleFunctions.shadow = shadow;
  BaseComponent.styleFunctions.transform = transform;

  // Icon.appendSvgIcons(icoSvg);
  // Icon.appendMap({});

  app.notice = {
    show: (description, {title:message}, options)=>{
      notification.open({ message, description });
    },
  };
  app.render.notice = app.notice;
}
