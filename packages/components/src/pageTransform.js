export let PageTransform = {
  _id: 'page_transform',

  _onStart(app) {
    app.router._oldComponent = app.router.Component;
    app.router.Component = class extends app.router.Component {
      _pageTransform() {
        if(!this._isTransforming()) return;

        let app = this.props.app;
        let page = app.Page.getPage();
        let deactivePageInfo = this.state.pageInfos.find(v=>v.isInactive);
        let deactivePage = deactivePageInfo&&app.Page.getPage(deactivePageInfo._id);

        let time = (new Date()).getTime();
        let finish = false;
        this._isPageTransforming = true;
        let _run = ()=>{
          if(finish) { this._isPageTransforming = false; this._updateRouterInfo(); return }
          let diff = (new Date()).getTime() - time;
          let percent = diff*100/250;
          if(percent>=100) { percent = 100; finish = true }
          page.dom.style.webkitTransform = "translate3d("+(page.status==='pushin'?(100-percent):(percent-100))+"%, 0, 0)";
          deactivePage&&(deactivePage.dom.style.webkitTransform="translate3d("+((deactivePageInfo.status==='popout'?1:-1)*percent)+"%, 0, 0)");
          requestAnimationFrame(_run);
        }
        _run();
      }
    }
  },

  _onStop(app) {
    app.router.Component = app.router._oldComponent;
    delete app.router._oldComponent;
  },
}