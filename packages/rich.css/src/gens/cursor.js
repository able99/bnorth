import { getStyleValueSet, genClassObjects } from '../utils';


function genFuncCursor({cursor}) {
  return genClassObjects('.cursor', {
    styleKey: true,
    styleValueSet: getStyleValueSet(cursor),
  });
}


export default genFuncCursor;