'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeInit = timeInit;
exports.init = init;
exports.time = time;
exports.timeFrom = timeFrom;
var moment = void 0;

function timeInit() {
  return new Promise(function (resolve, reject) {
    import( /* webpackChunkName: "moment" */'moment').then(function (result) {
      moment = result;
      resolve();
    });
  });
}

function init(func, val, options) {
  timeInit().then(function () {
    if (options && options.cb) options.cb(func && func(val, options));
  });
}

function time(val, options) {
  if (!moment) {
    init(time, val, options);return val;
  }
  return moment(val).format(options ? options.format : undefined);
}

function timeFrom(val, options) {
  if (!moment) {
    init(timeFrom, val, options);return val;
  }
  return options && options.fromTime ? moment(val).from(options.fromTime) : moment(val).fromNow();
}