/**
 * @module
 */
import { transform } from './animation';

export default function animationFrame(el, work, options={}) {
  if(!el||!work) return;
  let time = (new Date()).getTime();
  let start = 0;
  let stop = false;

  function run() {
    let ret = work(el, start++, time, options);
    if(!stop&&ret) window.requestAnimationFrame(run);
  };

  if(options.first) run();

  return [()=>{
    stop = true;
  },reset=>{
    stop = false;
    if(reset) {
      start = 0;
      time = (new Date()).getTime();
    }
    run();
  }];
}

export function afSpin(el, start, time, options) {
  let obj = transform('rotate', start*3%360+'deg');
  Object.entries(obj).forEach(([k,v])=>{
    el.style[k] = v;
  })

  return true;
}

export function afFlyoutLeft(el, start, time, {duration}) {
  let diff = (new Date()).getTime() - time;
  let percent = diff*100/duration;
  let obj = transform('translateX', percent+'%');
  Object.entries(obj).forEach(([k,v])=>{
    el.style[k] = v;
  })

  return percent<100;
}