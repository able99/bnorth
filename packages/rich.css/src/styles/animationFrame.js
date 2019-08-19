/**
 * @module
 */
import { transform } from './animation';
import { domGetDimensionValue } from './dom';


export default function animationFrame(el, work, options={}, cb) {
  if(!el||!work) return;
  let time = (new Date()).getTime();
  let start = 0;
  let stop = false;

  function run() {
    let ret = !stop&&work(el, start++, time, options);
    if(!stop) {
      window.requestAnimationFrame(run);
    }else if(cb){
      cb();
    }
    if(!ret) stop = true;
  };

  if(options.autoStart) run();

  return [()=>{
    stop = true;
  },aoptions=>{
    stop = false;
    options = {...options, ...aoptions}
    if(options.reset) { start = 0; time = (new Date()).getTime() }
    run();
  }];
}

export function afSpin(el, start, time, options) {
  let obj = transform('rotate', start*3%360+'deg');
  Object.entries(obj).forEach(([k,v])=>{ el.style[k] = v });

  return true;
}

export function afFlyoutLeft(el, start, time, {duration}) {
  let diff = (new Date()).getTime() - time;
  let percent = diff*100/duration;
  let obj = transform('translateX', percent+'%');
  Object.entries(obj).forEach(([k,v])=>{ el.style[k] = v });

  return percent<100;
}

export function afPeekTop(el, start, time, { duration, rewind }) {
  let ret = true;
  let total = domGetDimensionValue(el);
  let diff = (new Date()).getTime() - time;
  let top = diff*total/duration;
  if(top>=total) { top = total; ret = false }
  let obj = transform('translateY', '-'+(!rewind?(total-top):(top))+'px');
  Object.entries(obj).forEach(([k,v])=>{ el.style[k] = v });
  return ret;
}

export function afZoom(el, start, time, { duration, rewind }) {
  let diff = (new Date()).getTime() - time;
  let scale = diff/duration+0.3;
  if(scale>1) scale = 1;
  let obj = transform('scale', !rewind?scale:(1-scale));
  Object.entries(obj).forEach(([k,v])=>{ el.style[k] = v });

  return scale<1;
}

export function afFade(el, start, time, { duration, rewind }) {
  let diff = (new Date()).getTime() - time;
  let scale = diff/duration;
  if(scale>1) scale = 1;
  el.style.opacity = !rewind?scale:(1-scale);

  return scale<1;
}

export function afBottom(el, start, time, { duration, rewind }) {
  let diff = (new Date()).getTime() - time;
  let percent = diff*100/duration;
  if(percent>100) percent = 100;
  let obj = transform('translateY', (!rewind?(100-percent):(percent))+'%');
  Object.entries(obj).forEach(([k,v])=>{ el.style[k] = v });

  return percent<100;
}
