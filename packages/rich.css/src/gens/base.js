import { getSelector, getSizeSet } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


export default function gen(config) {
  let {
    textColors,
    utilColors,
    fontSizeBase,
    fontFamilys,
    fontWeightSizeBase,
    fontWeightSizeSet,
    bodyBackground,
    lineHeightSizeBase,
  } = config;
  let ret = {};

  
  ret['html'] = {
    'font-size': `${fontSizeBase}px`,
  }

  ret['body'] = {
    'font-size':  `${fontSizeBase}px`,
    'color':       textColors.normal,
    'font-family': fontFamilys['sans-serif'],
    'font-weight': fontWeightSizeBase,
    'line-height': lineHeightSizeBase,
    'background':  bodyBackground,
  }

  let sizes = getSizeSet('font', config);
  ret['h1'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xxl'],
  }
  ret['h2'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xl'],
  }
  ret['h3'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['lg'],
  }
  ret['h4'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes[''],
  }
  ret['h5'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['sm'],
  }
  ret['h6'] = {
    'font-weight': fontWeightSizeSet.bold,
    'font-size': sizes['xs'],
  }

  ret['strong'] = {
    'font-weight': fontWeightSizeSet.bold,
  }
  
  ret['hr'] = {
    'border':  `1px solid ${utilColors.border}`,
    'border-width': '1 0 0',
    'clear': 'both',
    'height': 0,
  }

  ret[getSelector('transition-set-')] = compatibleAnimation({
    'transition': '.15s ease-out',
  });

  ret[getSelector('line-height-0')] = {
    'line-height': '0',
  };

  ret[getSelector('line-height-1')] = {
    'line-height': '1',
  };

  ret[getSelector('line-height-1em')] = {
    'line-height': '1em',
  };

  ret[getSelector('outline-none-')] = {
    'outline': 'none',
  };

  ret[getSelector('appearance-none-')] = {
    'appearance': 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
  };

  ret[getSelector('backface-hidden-')] = {
    'backface-visibility': 'hidden',
  };

  ret[getSelector('force-hardware-acceleration-')] = compatibleAnimation({
    'transform': 'translateZ(0)',
    'backface-visibility': 'hidden',
    'perspective': '1000',
  });

  ret[getSelector('font-smoothing-antialiased-')] = {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  };


  return ret;
}