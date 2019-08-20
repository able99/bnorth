import React from 'react';


export let PageTransform = {
  _id: 'page_transform',

  onPluginMount(app) {
    app.router._RouterComponent = class extends app.router._RouterComponent {
      _pageTrans() {
        let app = this.props.app;
        let router = app.router;
        if(!router._transStatus) return
    
        let activeEl = document.querySelector('main[data-page="'+router._activeId+'"]');
        let deactiveEl = document.querySelector('main[data-page="'+router._deactiveId+'"]');
    
        Array.from(document.querySelectorAll('main')).filter(v=>!v.getAttribute('data-page-sub')).forEach(v=>{
          let id = v.getAttribute('data-page');
          if(id===router._activeId) {
            v.style.webkitTransform = "translateX("+(router._transStatus==='push'?100:-100)+"%)";
            v.style.display = 'block';
          }else if(id===router._deactiveId) {
            v.style.webkitTransform = "translateX("+(0)+"%)";
            v.style.display = 'block';
          }else {
            v.style.display = 'none';
          }
        })
        
        let time = (new Date()).getTime();
        let finish = false;
        let _run = ()=>{
          if(finish) { deactiveEl&&(deactiveEl.style.display='none'); router._updateRouterInfo(router._history.location); return }
    
          let diff = (new Date()).getTime() - time;
          let percent = diff*100/200;
          if(percent>=100) { percent = 100; finish = true }
    
          activeEl.style.webkitTransform = "translate3d("+(router._transStatus==='push'?(100-percent):(percent-100))+"%, 0, 0)";
          deactiveEl&&(deactiveEl.style.webkitTransform="translate3d("+((router._transStatus==='push'?-1:1)*percent)+"%, 0, 0)");
    
          requestAnimationFrame(_run);
        }
        _run();
      }
    }
  },

  onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldError;
    delete app.notice;
  },
}