/**
 * @module
 */
import { domIsMouse, domPassiveSupported } from './BaseComponent';

function renderActive(el, root) {
  while (el) {
    if (el === root) break;; 
    if(/\bbtn\b/.test(el.className.baseVal||el.className)) {
      let rect = el.getBoundingClientRect();
      let active = document.createElement('div');
      active.setAttribute('style', `position: absolute;pointer-events: none; top: ${rect.top}px; bottom: ${rect.bottom}px; left: ${rect.left}px; right: ${rect.right}px; width: ${rect.width}px; height: ${rect.height}px;`);
      let ripple = document.createElement('div');
      ripple.setAttribute('style', 'width: 100%; height: 100%; background: rgba(0,0,0,0.33); opacity: 0;');
      active.appendChild(ripple);
      root.appendChild(active);
      
      let time = (new Date()).getTime();
      let finish = false;
      let _run = ()=>{
        if(finish) { active.remove(); return }

        let diff = (new Date()).getTime() - time;
        let percent = diff*100/400;
        if(percent>=100) { percent = 100; finish = true }

        ripple.style.opacity = percent<50?(percent/2/100):(1-percent/2/100)
        requestAnimationFrame(_run);
      }
      _run();
    }
    el = el.parentNode;
  }
}

function getScrollTarget(offsetX, offsetY, node, root) {
  let scrollEl, direction;
  let offsetXAbs = Math.abs(offsetX);
  let offsetYAbs = Math.abs(offsetY);

  if(offsetXAbs>=11||offsetYAbs>=11) {
    while (node.parentNode) {
      node = node.parentNode;
      if (node === root) break;

      if(offsetYAbs>=11&&node.scrollable==='y') {
        scrollEl = node;
        direction = 'y';
        break;
      }else if(offsetXAbs>=11&&node.scrollable==='x') {
        scrollEl = node;
        direction = 'x';
        break;
      }

      const style = window.getComputedStyle(node);
      let overflowX = style.getPropertyValue('overflow-x');
      let overflowY = style.getPropertyValue('overflow-y');
      if(offsetYAbs>=11&&(overflowY==='auto'||overflowY==='scroll')) {
        scrollEl = node;
        direction = 'y';
        break;
      }else if(offsetXAbs>=11&&(overflowX==='auto'||overflowX==='scroll')) {
        scrollEl = node;
        direction = 'x';
        break;
      }
    }
  }

  return [scrollEl, direction];
}

function getScrollOver(node, direction, offset) {
  let scrollOffset = direction==='x'?(node.scrollable?node.scrollableLeft:node.scrollLeft):(node.scrollable?node.scrollableTop:node.scrollTop);
  let scrollSize = direction==='x'?((node.scrollable?node.scrollableWidth:node.scrollWidth)-node.clientWidth):((node.scrollable?node.scrollableHeight:node.scrollHeight)-node.clientHeight); 

  if(scrollOffset===0&&offset>0) {
    return -offset;
  }else if(scrollOffset>=scrollSize&&offset<0) {
    return -offset;
  }else {
    return 0;
  }
}

function setScrollEdgeShadow(edgeShadow, direction, scrollOver, root) {
  if(!edgeShadow) {
    edgeShadow = document.createElement('div');
    edgeShadow.setAttribute('class', 'transition-set- position-absolute pointer-events-none')
    root.appendChild(edgeShadow);
  }
  
  edgeShadow.setAttribute(
    'style', 
    'background: rgba(0,0,0,0.2); border-radius: 20px; ' +
    (direction==='x'?'width: 60px; height: 100%; top: 0; bottom: 0; ':'width: 100%; height: 60px; left: 0; right: 0; ') +
    (direction==='x'&&scrollOver<0?`left: ${Math.min(-60+Math.abs(scrollOver), -20)}px`:'') +
    (direction==='x'&&scrollOver>0?`right: ${Math.min(-60+Math.abs(scrollOver), -20)}px`:'') +
    (direction==='y'&&scrollOver<0?`top: ${Math.min(-60+Math.abs(scrollOver), -20)}px`:'') +
    (direction==='y'&&scrollOver>0?`bottom: ${Math.min(-60+Math.abs(scrollOver), -20)}px`:'') +
    (scrollOver===0?'display: none;':'')
  );

  return edgeShadow;
}



export default {
  _id: 'rootGesture',

  _onStart(app) {
    app.rootGesture = {};

    app.rootGesture.init = function(root) {
      let x,y,offsetX,offsetY,edgeShadow,scrollEl,direction;

      let handleStart = e=>{
        renderActive(e.target, root);

        x = domIsMouse?e.clientX:e.touches[0].clientX;
        y = domIsMouse?e.clientY:e.touches[0].clientY;
      }
      
      let handleMove = e=>{
        offsetX = (domIsMouse?e.clientX:e.touches[0].clientX) - x;
        offsetY = (domIsMouse?e.clientY:e.touches[0].clientY) - y;
        let node = e.target;

        if(!scrollEl) { let scrollTarget = getScrollTarget(offsetX, offsetY, node, root); scrollEl = scrollTarget[0]; direction = scrollTarget[1] }
        let scrollOver = scrollEl&&direction&&getScrollOver(scrollEl, direction, direction==='x'?offsetX:offsetY);
        
        if(scrollOver<0&&scrollEl.getAttribute('data-b-pulldown')) {
          let evt = document.createEvent("Events");
          evt.initEvent('scroll', true, true);
          scrollEl.pulldown = Math.abs(scrollOver);
          scrollEl.dispatchEvent(evt);
        }else if(scrollOver>0&&scrollEl.getAttribute('data-b-pullup')) {
          let evt = document.createEvent("Events");
          evt.initEvent('scroll', true, true);
          scrollEl.pullup = Math.abs(scrollOver);
          scrollEl.dispatchEvent(evt);
        }else if(scrollOver||edgeShadow){
          edgeShadow = setScrollEdgeShadow(edgeShadow, direction, scrollOver, root);
        }
      }

      let hadnleEnd = e=>{
        x = y = undefined;
        if(scrollEl&&scrollEl.pulldown) {
          let evt = document.createEvent("Events");
          evt.initEvent('scroll', true, true);
          scrollEl.pulldown = String(scrollEl.pulldown);
          scrollEl.dispatchEvent(evt);
        }
        if(scrollEl&&scrollEl.pullup) scrollEl.pullup = undefined;
        if(scrollEl&&scrollEl.pulldown) scrollEl.pulldown = undefined;
        scrollEl = undefined;
        direction = undefined;
        if(edgeShadow) edgeShadow.remove();
        edgeShadow = null;
      }

      let eventOption = domPassiveSupported()?{passive: true}:false;
      root.addEventListener(domIsMouse?'mousedown':'touchstart', handleStart, eventOption);
      root.addEventListener(domIsMouse?'mousemove':'touchmove', handleMove, eventOption);
      root.addEventListener(domIsMouse?'mouseup':'touchend', hadnleEnd, eventOption);
      (!domIsMouse)&&root.addEventListener('touchcancel', hadnleEnd, eventOption);
      app.rootGesture._close = ()=>{
        root.removeEventListener(domIsMouse?'mousedown':'touchstart', handleStart, eventOption);
        root.removeEventListener(domIsMouse?'mousemove':'touchmove', handleMove, eventOption);
        root.removeEventListener(domIsMouse?'mouseup':'touchend', hadnleEnd, eventOption);
        (!domIsMouse)&&root.removeEventListener('touchcancel', hadnleEnd, eventOption);
      }
    }

    app.rootGesture.close = function() {
      app.rootGesture._close();
    }
  },

  _onStop(app) {
    app.rootGesture.close();
    app.rootGesture = null;
  },
      
  onAppStartRender(app) {
    app.rootGesture.init(app.render.domRoot);
  }
}