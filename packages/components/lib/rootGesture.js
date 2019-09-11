"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _BaseComponent = require("./BaseComponent");

/**
 * @module
 */
function renderActive(el, root) {
  while (el) {
    if (el === root) break;
    ;

    if (/\bbtn\b/.test(el.className.baseVal || el.className)) {
      (function () {
        var rect = el.getBoundingClientRect();
        var active = document.createElement('div');
        active.setAttribute('style', "position: absolute;pointer-events: none; top: ".concat(rect.top, "px; bottom: ").concat(rect.bottom, "px; left: ").concat(rect.left, "px; right: ").concat(rect.right, "px; width: ").concat(rect.width, "px; height: ").concat(rect.height, "px;"));
        var ripple = document.createElement('div');
        ripple.setAttribute('style', 'width: 100%; height: 100%; background: rgba(0,0,0,0.33); opacity: 0;');
        active.appendChild(ripple);
        root.appendChild(active);
        var time = new Date().getTime();
        var finish = false;

        var _run = function _run() {
          if (finish) {
            active.remove();
            return;
          }

          var diff = new Date().getTime() - time;
          var percent = diff * 100 / 400;

          if (percent >= 100) {
            percent = 100;
            finish = true;
          }

          ripple.style.opacity = percent < 50 ? percent / 2 / 100 : 1 - percent / 2 / 100;
          requestAnimationFrame(_run);
        };

        _run();
      })();
    }

    el = el.parentNode;
  }
}

function getScrollTarget(offsetX, offsetY, node, root) {
  var scrollEl, direction;
  var offsetXAbs = Math.abs(offsetX);
  var offsetYAbs = Math.abs(offsetY);

  if (offsetXAbs >= 11 || offsetYAbs >= 11) {
    while (node.parentNode) {
      node = node.parentNode;
      if (node === root) break;

      if (offsetYAbs >= 11 && node.scrollable === 'y') {
        scrollEl = node;
        direction = 'y';
        break;
      } else if (offsetXAbs >= 11 && node.scrollable === 'x') {
        scrollEl = node;
        direction = 'x';
        break;
      }

      var style = window.getComputedStyle(node);
      var overflowX = style.getPropertyValue('overflow-x');
      var overflowY = style.getPropertyValue('overflow-y');

      if (offsetYAbs >= 11 && (overflowY === 'auto' || overflowY === 'scroll')) {
        scrollEl = node;
        direction = 'y';
        break;
      } else if (offsetXAbs >= 11 && (overflowX === 'auto' || overflowX === 'scroll')) {
        scrollEl = node;
        direction = 'x';
        break;
      }
    }
  }

  return [scrollEl, direction];
}

function getScrollOver(node, direction, offset) {
  var scrollOffset = direction === 'x' ? node.scrollable ? node.scrollableLeft : node.scrollLeft : node.scrollable ? node.scrollableTop : node.scrollTop;
  var scrollSize = direction === 'x' ? (node.scrollable ? node.scrollableWidth : node.scrollWidth) - node.clientWidth : (node.scrollable ? node.scrollableHeight : node.scrollHeight) - node.clientHeight;

  if (scrollOffset === 0 && offset > 0) {
    return -offset;
  } else if (scrollOffset >= scrollSize && offset < 0) {
    return -offset;
  } else {
    return 0;
  }
}

function setScrollEdgeShadow(edgeShadow, direction, scrollOver, root) {
  if (!edgeShadow) {
    edgeShadow = document.createElement('div');
    edgeShadow.setAttribute('class', 'transition-set- position-absolute pointer-events-none');
    edgeShadow.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" version=\"1.1\">\n\n    <rect x=\"0\" y=\"0\" rx=\"35%\" ry=\"35%\" width=\"100%\" height=\"100%\" style=\"fill:rgba(0,0,0,0.1)\"/>\n    \n    <script xmlns=\"\"/></svg>";
    root.appendChild(edgeShadow);
  }

  edgeShadow.setAttribute('style', (direction === 'x' ? 'width: 60px; height: 100%; top: 0; bottom: 0; ' : 'width: 100%; height: 60px; left: 0; right: 0; ') + (direction === 'x' && scrollOver < 0 ? "left: ".concat(Math.min(-60 + Math.abs(scrollOver), -20), "px") : '') + (direction === 'x' && scrollOver > 0 ? "right: ".concat(Math.min(-60 + Math.abs(scrollOver), -20), "px") : '') + (direction === 'y' && scrollOver < 0 ? "top: ".concat(Math.min(-60 + Math.abs(scrollOver), -20), "px") : '') + (direction === 'y' && scrollOver > 0 ? "bottom: ".concat(Math.min(-60 + Math.abs(scrollOver), -20), "px") : '') + (scrollOver === 0 ? 'display: none;' : ''));
  return edgeShadow;
}

var _default = {
  _id: 'rootGesture',
  _onStart: function _onStart(app) {
    app.rootGesture = {};

    app.rootGesture.init = function (root) {
      var x, y, offsetX, offsetY, edgeShadow, scrollEl, direction;

      var handleStart = function handleStart(e) {
        renderActive(e.target, root);
        x = _BaseComponent.domIsMouse ? e.clientX : e.touches[0].clientX;
        y = _BaseComponent.domIsMouse ? e.clientY : e.touches[0].clientY;
      };

      var handleMove = function handleMove(e) {
        offsetX = (_BaseComponent.domIsMouse ? e.clientX : e.touches[0].clientX) - x;
        offsetY = (_BaseComponent.domIsMouse ? e.clientY : e.touches[0].clientY) - y;
        var node = e.target;

        if (!scrollEl) {
          var scrollTarget = getScrollTarget(offsetX, offsetY, node, root);
          scrollEl = scrollTarget[0];
          direction = scrollTarget[1];
        }

        var scrollOver = scrollEl && direction && getScrollOver(scrollEl, direction, direction === 'x' ? offsetX : offsetY);

        if (scrollOver < 0 && scrollEl.getAttribute('data-b-pulldown')) {
          var evt = document.createEvent("Events");
          evt.initEvent('scroll', true, true);
          scrollEl.pulldown = Math.abs(scrollOver);
          scrollEl.dispatchEvent(evt);
        } else if (scrollOver > 0 && scrollEl.getAttribute('data-b-pullup')) {
          var _evt = document.createEvent("Events");

          _evt.initEvent('scroll', true, true);

          scrollEl.pullup = Math.abs(scrollOver);
          scrollEl.dispatchEvent(_evt);
        } else if (scrollOver || edgeShadow) {
          edgeShadow = setScrollEdgeShadow(edgeShadow, direction, scrollOver, root);
        }
      };

      var hadnleEnd = function hadnleEnd(e) {
        x = y = undefined;

        if (scrollEl && scrollEl.pulldown) {
          var evt = document.createEvent("Events");
          evt.initEvent('scroll', true, true);
          scrollEl.pulldown = String(scrollEl.pulldown);
          scrollEl.dispatchEvent(evt);
        }

        if (scrollEl && scrollEl.pullup) scrollEl.pullup = undefined;
        if (scrollEl && scrollEl.pulldown) scrollEl.pulldown = undefined;
        scrollEl = undefined;
        direction = undefined;
        if (edgeShadow) edgeShadow.remove();
        edgeShadow = null;
      };

      var eventOption = (0, _BaseComponent.domPassiveSupported)() ? {
        passive: true
      } : false;
      root.addEventListener(_BaseComponent.domIsMouse ? 'mousedown' : 'touchstart', handleStart, eventOption);
      root.addEventListener(_BaseComponent.domIsMouse ? 'mousemove' : 'touchmove', handleMove, eventOption);
      root.addEventListener(_BaseComponent.domIsMouse ? 'mouseup' : 'touchend', hadnleEnd, eventOption);
      !_BaseComponent.domIsMouse && root.addEventListener('touchcancel', hadnleEnd, eventOption);

      app.rootGesture._close = function () {
        root.removeEventListener(_BaseComponent.domIsMouse ? 'mousedown' : 'touchstart', handleStart, eventOption);
        root.removeEventListener(_BaseComponent.domIsMouse ? 'mousemove' : 'touchmove', handleMove, eventOption);
        root.removeEventListener(_BaseComponent.domIsMouse ? 'mouseup' : 'touchend', hadnleEnd, eventOption);
        !_BaseComponent.domIsMouse && root.removeEventListener('touchcancel', hadnleEnd, eventOption);
      };
    };

    app.rootGesture.close = function () {
      app.rootGesture._close();
    };
  },
  _onStop: function _onStop(app) {
    app.rootGesture.close();
    app.rootGesture = null;
  },
  onAppStartRender: function onAppStartRender(app) {
    app.rootGesture.init(app.render.domRoot);
  }
};
exports.default = _default;