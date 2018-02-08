export { default } from './app/app';

export * from './app/router';

export { default as pluginBrowser } from './plugins/browser';
export { default as pluginData } from './plugins/data';
export { default as pluginFormat } from './plugins/format';
export { default as pluginNavigator } from './plugins/navigator';
export { default as pluginNetwork } from './plugins/network';
export { default as pluginRequest } from './plugins/request';
export { default as pluginStorage } from './plugins/storage';
export { default as pluginUser } from './plugins/user';
export { default as pluginUtils } from './plugins/utils';


// TODO: validate, rule
// TODO: Path, path->pathname
// TODO: network, ->axios
// TODO: format, add another moment plugin override format time function
// TODO: user, opt and cleanup
// TODO: request, action remove request param
// TOOD: request action state, comments