export default {
  '/': require('./pages/home').default,
  '/test': require('./test').default,

  'components:component?': {component: require('./pages/components').default, title: '组件列表'},

  'cplugins': {component: require('./pages/cplugins').default, title: '组件插件列表'},

  'router': {component: require('./pages/router').default, title: '路由管理展示'},
  'pageinfo:param1?:param2?': require('./pages/router').PageInfo,
  'dynamic': {component: ()=>new Promise(resolve=>setTimeout(()=>import('./pages/router').then(v=>resolve(v.PageInfo)), 3000)), lazy: true},
  'toblock': {component: require('./pages/router').ToBlock, title: '被阻塞的页面'},
  'blockto': {component: require('./pages/router').BlockTo, title: '阻塞跳转到的页面'},

  'data': {component: require('./pages/data').default, title: '数据管理展示'},

  'plugins': {component: require('./pages/plugins').default, title: '插件展示'},

  'tabs:tab?': {
    component: require('./pages/tabs').default, title: 'tabbar demo',
    subPages: {'tabx0': 'tabx', 'tabx1': 'tabx', 'tabx2': 'tabx', 'tabx3': 'tabx'},
  },
  'tabx': {component: require('./pages/tabs').Tabx, title: 'tabx'},

  'lists': {component: require('./pages/lists').default, title: 'list demo'},
  'search:keyword?:pageid?': {component: require('./pages/lists').Search, title: '搜索'},
}