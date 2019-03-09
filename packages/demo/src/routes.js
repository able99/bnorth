export default {
  '/': require('./pages/home').default,
  '/test': require('./test').default,

  'components:component?': {component: require('./pages/components').default, title: '组件列表'},

  'cplugins': {component: require('./pages/cplugins').default, title: '组件插件列表'},

  'router': {component: require('./pages/router').default, title: '路由管理展示'},
  'pageinfo:param1?:param2?': require('./pages/router').PageInfo,
  'dynamic': {
    loader: ()=>new Promise(resolve=>setTimeout(()=>{resolve({component: require('./pages/router').PageInfo })},3000))
  },

  'data': {component: require('./pages/data').default, title: '数据管理展示'},

  'plugins': {component: require('./pages/plugins').default, title: '插件展示'},

  'tabs:tab?': {
    component: require('./pages/tabs').default, title: 'tabbar demo',
    subPages: ['tabx', 'tabx', 'tabx', 'tabx'],
  },
  'tabx': {component: require('./pages/tabs').Tabx, title: 'tabx'},

  'lists': {component: require('./pages/lists').default, title: 'list demo'},
  'search:keyword?:pageid?': {component: require('./pages/lists').Search, title: '搜索'},
}