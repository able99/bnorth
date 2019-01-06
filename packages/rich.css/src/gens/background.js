import { genClassObjects } from '../utils';


function genFuncBackground({utilColors, mainColors, opacityColors}) {
  return Object.assign(
    genClassObjects('.bg-color', {
      styleKey: 'background-color',
      styleValueSet: { ...utilColors, ...mainColors, ...opacityColors },
    }), 
    genClassObjects('.bg-none-', {
      styleObjectMap: {
        'background': 'none',
      },
    }), 
  );
}


export default genFuncBackground;