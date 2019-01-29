export default function(app) {
  app.plugins.add(require('@bnorth/components/lib/notice').default);
  app.plugins.add(require('@bnorth/components/lib/mask').default);
  app.plugins.add(require('@bnorth/components/lib/modal').default);
  app.plugins.add(require('@bnorth/components/lib/loading').default);
  app.plugins.add(require('@bnorth/components/lib/picker').default);

  app.plugins.add(require('@bnorth/plugin-network').default);
  app.plugins.add(require('@bnorth/plugin-request').default, {request: app.network.fetch.bind(app.network)});

  app.plugins.add(require('@bnorth/plugin-validate').default);
  app.plugins.add(require('@bnorth/plugin-base64').default);
  app.plugins.add(require('@bnorth/plugin-md5').default);
  app.plugins.add(require('@bnorth/plugin-format').default);

  app.plugins.add(require('@bnorth/plugin-storage').default);
  app.plugins.add(require('@bnorth/plugin-browser').default, {autoTitle: true});
  app.plugins.add(require('@bnorth/plugin-browser/lib/wechat').default, {});
  app.plugins.add(require('@bnorth/plugin-browser/lib/alipay').default, {});
  // app.plugins.add(require('@bnorth/plugin-user').default);
  
}