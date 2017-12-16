"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBrowserTitle = setBrowserTitle;
exports.getBrowserTitle = getBrowserTitle;
//let iframe = null;
function setBrowserTitle(title) {
  window.top.document.title = title;

  // if(!iframe) iframe = document.createElement('iframe');
  // iframe.setAttribute('style', 'display:none;');
  // iframe.setAttribute('src', './res/favicon.png');
  // iframe.setAttribute('onload', ()=>{
  //   setTimeout(()=>{
  //     iframe.remove();
  //   },0);
  // });
  // document.body.appendChild(iframe);
}

function getBrowserTitle() {
  return window.top.document.title;
}