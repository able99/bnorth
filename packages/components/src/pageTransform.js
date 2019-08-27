export let PageTransform = {
  _id: 'page_transform',

  _onStart(app) {
    app.router._oldComponent = app.router.Component;
    app.router.Component = class extends app.router.Component {
      _pageTransform() {
        let app = this.props.app;
        let page = app.Page.getPage();
        let status = page&&page.status;

        if(status !== 'normal') {
          let deactivePageInfo = this.state.pageInfos.find(v=>v.isInactive);
          let deactivePage = deactivePageInfo&&app.Page.getPage(deactivePageInfo._id);

          let time = (new Date()).getTime();
          let finish = false;
          let _run = ()=>{
            if(finish) { this._updateRouterInfo(); return }
      
            let diff = (new Date()).getTime() - time;
            let percent = diff*100/300;
            if(percent>=100) { percent = 100; finish = true }
            page.dom.style.webkitTransform = "translate3d("+(status==='pushin'?(100-percent):(percent-100))+"%, 0, 0)";
            deactivePage&&(deactivePage.dom.style.webkitTransform="translate3d("+((status==='pushout'?1:-1)*percent)+"%, 0, 0)");
            requestAnimationFrame(_run);
          }
          _run();
        }
      }
    }
  },

  _onStop(app) {
    app.router.Component = app.router._oldComponent;
    delete app.router._oldComponent;
  },
}