export default function(app) {
  // app.plugins.add(require('@bnorth/components/lib/rootGesture').default, {pullAction:true});
  // app.plugins.add(require('@bnorth/components/lib/Notice').notice);
  // app.plugins.add(require('@bnorth/components/lib/Modal').modal);
  app.plugins.add(require('@bnorth/components/lib/Loader').loader);
  app.plugins.add(require('@bnorth/components/lib/Loader').mask);
  // app.plugins.add(require('@bnorth/components/lib/Loader').pulldown);
  // app.plugins.add(require('@bnorth/components/lib/Loader').pullup);
  // app.plugins.add(require('@bnorth/components/lib/pageTransform').PageTransform);
  // app.plugins.add(require('@bnorth/components/lib/Picker').default);

  app.plugins.add(require('@bnorth/plugins/lib/network').default);
  app.plugins.add(require('@bnorth/plugins/lib/request').default, {request: app.network.fetch.bind(app.network)});

  // app.plugins.add(require('@bnorth/plugins/lib/validate').default);
  // app.plugins.add(require('@bnorth/plugins/lib/base64').default);
  // app.plugins.add(require('@bnorth/plugins/lib/md5').default);
  // app.plugins.add(require('@bnorth/plugins/lib/format').default);

  app.plugins.add(require('@bnorth/plugins/lib/storage').default);
  // app.plugins.add(require('@bnorth/plugins/lib/browser').default, {autoTitle: true});
  // app.plugins.add(require('@bnorth/plugins/lib/browser/lib/wechat').default, {});
  // app.plugins.add(require('@bnorth/plugins/lib/browser/lib/alipay').default, {});
  
}