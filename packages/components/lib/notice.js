"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent"));

var _Animation = _interopRequireDefault(require("./Animation"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Icon = require("./Icon");

var _Notice = function Notice(aprops) {
  var _BaseComponent = (0, _BaseComponent2.default)(aprops, _Notice),
      containerProps = _BaseComponent.containerProps,
      onDoClose = _BaseComponent.onDoClose,
      onFinished = _BaseComponent.onFinished,
      transitionProps = _BaseComponent.transitionProps,
      animationProps = _BaseComponent.animationProps,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["containerProps", "onDoClose", "onFinished", "transitionProps", "animationProps"]);

  var classNamePreContainer = 'position-absolute offset-top-start offset-left-top width-full';
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    className: classNamePreContainer
  }, containerProps), _react.default.createElement(_Animation.default, (0, _extends2.default)({
    type: "collapse",
    "bc-width-full": true,
    onFinished: onFinished,
    transitionProps: transitionProps
  }, animationProps), _react.default.createElement(_Icon.PanelIcon, (0, _extends2.default)({
    "bp-title-bc-flex-sub-flex-extend": true,
    "bp-title-bc-text-weight-": true,
    "bp-title-bc-text-size-lg": true,
    name: "close:x",
    "bp-icon-onClick": onDoClose,
    "b-icon-bc-padding-a-xs": true,
    "bc-width-full": true,
    "bc-padding-a-": true,
    position: "right",
    "b-style": "solid",
    "b-theme": "mask"
  }, props))));
};

exports.Notice = _Notice;
_Notice.defaultProps = {};
Object.defineProperty(_Notice, "Notice", {
  get: function get() {
    return _Notice;
  },
  set: function set(val) {
    exports.Notice = _Notice = val;
  }
}); // export default {
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