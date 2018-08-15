/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import md5 from 'js-md5';


export default {
  // plugin 
  // --------------------------------
  pluginName: 'md5',
  pluginDependence: [],

  onPluginMount(app) {
    app.utils.md5 = (str)=>md5(str);
  },

  onPluginUnmount(app) {
    delete app.utils.md5;
  },
}
