import { getStyleValueSet, genClassObjects } from '../utils';


function genFuncSize({ directionSize, size }) {
  return Object.assign(
    genClassObjects('.square-full', {
      styleObjectMap: {
        'width': '100%',
        'height': '100%',
      }
    }),
    genClassObjects('.', {
      styleKeySet: getStyleValueSet(directionSize),
      styleValueSet: getStyleValueSet(size),
    }), 
  );
}


export default genFuncSize;