import md5 from '../utils/md5';
import uuid from '../utils/uuid';
import { base64decode, base64encode } from '../utils/base64';


class Utils {
  uuid(...args){
    return uuid(...args);
  }

  base64encode(...args){
    return base64encode(...args);
  }

  base64decode(...args){
    return base64decode(...args);
  }

  md5(...args) {
    return md5(...args);
  }
}


export default {
  init(app) {
    app.Utils = Utils;
    app.utils = new Utils(app);
  }
}
