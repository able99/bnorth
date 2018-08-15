/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import base64 from 'hi-base64';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'base64',
  pluginDependence: [],

  onPluginMount(app) {
    app.utils.base64encode = (str, asciiOnly)=>base64.encode(str, asciiOnly);
    app.utils.base64decode = (str, asciiOnly)=>base64.decode(str, asciiOnly);
  },

  onPluginUnmount(app) {
    delete app.utils.base64encode;
    delete app.utils.base64decode;
  },
}
