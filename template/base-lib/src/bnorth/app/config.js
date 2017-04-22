let Config = {};

Config.BaseUrl = window.location.protocol + "//" + window.location.hostname + ((window.location.port === 80 || window.location.port === 443 || window.location.port === "")? "" : ":" + window.location.port) + "/";
Config.BaseApiUrl = Config.BaseUrl + "/";
Config.ApiAuthUrl = Config.BaseApiUrl + "auth/";
Config.ApiWebDavUrl = Config.BaseApiUrl + "fsdata/";

Config.Version = "0.1.0";
Config.debug = false;
Config.OnBrowserDebug = true;
Config.OnBrowser = Boolean(!window.cordova);
Config.OnApp = Config.OnBrowserDebug||Boolean(window.cordova);


import { ExtendConfig } from '../../extend/extend';
export default Object.assign(Config, ExtendConfig||{});
