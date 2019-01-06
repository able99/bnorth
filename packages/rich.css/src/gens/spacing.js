/**
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';


function genFuncSpacing({ directionEdge, spacing }) {
  let styleValueSet =  getStyleValueSet(spacing);

  return Object.assign(
    genClassObjects('.margin', {
      styleKey: true,
      styleKeySet: directionEdge,
      styleValueSet,
    }), 
    genClassObjects('.padding', {
      styleKey: true,
      styleKeySet: directionEdge,
      styleValueSet,
    }), 
  );
}


export default genFuncSpacing;