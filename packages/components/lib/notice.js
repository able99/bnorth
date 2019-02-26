"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classes = _interopRequireDefault(require("@bnorth/rich.css/lib/classes"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Animation = _interopRequireDefault(require("./Animation"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = require("./Icon");

var Notice = function Notice(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, Notice),
      containerProps = _BaseComponent.containerProps,
      onDoClose = _BaseComponent.onDoClose,
      onFinished = _BaseComponent.onFinished,
      transitionProps = _BaseComponent.transitionProps,
      contentProps = _BaseComponent.contentProps,
      closeProps = _BaseComponent.closeProps,
      close = _BaseComponent.close,
      children = _BaseComponent.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["containerProps", "onDoClose", "onFinished", "transitionProps", "contentProps", "closeProps", "close", "children"]);

  var classNamePreContainer = 'position-absolute offset-top-start offset-left-top width-full';
  var classNamePre = 'flex-display-block flex-align-center width-full';
  var classNamePreInner = 'padding-a-';
  var classNamePreContent = 'text-weight- text-size-lg flex-sub-flex-extend';
  var classNamePreClose = 'padding-h-sm padding-v-0 flex-sub-flex-none';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    className: classNamePreContainer
  }, containerProps), _react.default.createElement(_Animation.default, (0, _extends2.default)({
    type: "collapse",
    transitionProps: transitionProps,
    onFinished: onFinished,
    "b-style": "solid",
    "b-theme": "mask",
    classNamePre: classNamePre
  }, props), _react.default.createElement(_Panel.default, {
    classNamePre: classNamePreInner
  }, children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePreContent
  }, contentProps), children) : null, close ? _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    "b-style": "plain",
    "b-theme": "white",
    inline: true,
    "bc-cursor-pointer": true,
    onClick: onDoClose,
    name: "close",
    defaultName: "x"
  }, closeProps), close === true ? undefined : close) : null)));
}; // export default {
//   _id: 'notice',
//   onPluginMount(app) {
//     app.notice = {
//       _timer: undefined,
//       show: (message, { timeout=3000, options={}, ...props}={})=>{
//         message = app.utils.message2String(message);
//         if(!message) return;
//         let _id = app.notice._id || app.router.genPopLayerId(options);
//         options._id = _id;
//         props.in = true;
//         props.onDoClose = ()=>app.notice.close();
//         props.children = message;
//         if(app.notice._timer) window.clearTimeout(app.notice._timer);
//         app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);
//         return app.notice._id = app.router.addPopLayer(<Container><Notification /></Container> , props, options);
//       },
//       close: ()=>{
//         if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
//         if(!app.notice._id) return;
//         let {content, props={}, options={}} = app.router.getPopLayerInfo(app.notice._id)||{};
//         if(!content) { app.notice._id = undefined; return; }
//         props.in = false;
//         props.onTransitionFinished = ()=>{ 
//           app.router.removePopLayer(app.notice._id); 
//           app.notice._id = undefined; 
//         }
//         return app.router.addPopLayer(content, props, options);
//       },
//     };
//     app.notice._oldNotice = app.render.notice;
//     app.notice._oldErrorNotice = app.render.errorNotice;
//     app.render.notice = (message, options)=>app.notice.show(message, options);
//     app.render.error = (message, options={})=>app.notice.show(message, {...options, 'b-theme': options['b-theme']||'alert'});
//   },
//   onPluginUnmount(app) {
//     app.render.notice = app.notice._oldNotice;
//     app.render.error = app.notice._oldErrorNotice;
//     delete app.notice;
//   },
// }


exports.Notice = Notice;