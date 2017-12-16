//let iframe = null;
export function setBrowserTitle(title) {
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

export function getBrowserTitle() {
  return window.top.document.title;
}