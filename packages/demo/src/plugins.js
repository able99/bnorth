export default function(app) {
  app.plugins.add(require('@bnorth/components/lib/plugins/notice').default);
  app.plugins.add(require('@bnorth/components/lib/plugins/mask').default);
  app.plugins.add(require('@bnorth/components/lib/plugins/modal').default);
  app.plugins.add(require('@bnorth/components/lib/plugins/loading').default);
  app.plugins.add(require('@bnorth/plugin-network').default);
  app.plugins.add(require('@bnorth/plugin-request').default, {request: app.network.fetch.bind(app.network)});
  app.plugins.add(require('@bnorth/plugin-validate').default);
}