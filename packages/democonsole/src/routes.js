export default {
  '/login': {
    title: 'bnorth crm',
    component: require('./layouts/login').default,
    subRoutes: ['login'],
  },
  'login': {
    title: '登录',
    component: require('./pages/login').default,
  },
  '/': {
    title: 'bnorth crm',
    component: require('./layouts/base').default,
    subRoutes: ['home', 'users', ,'user','personal'],
    subPages: {home: 'home'},
    menus: ["home", {title: '用户管理', name: 'folder', subMenus: ["users"]}],
  },
  'home': {
    title: '首页',
    name: 'home',
    component: require('./pages/home').default,
  },
  'users': {
    title: '用户列表',
    name: 'unordered-list',
    component: require('./pages/user/users').default,
  },
  'user:id': {
    title: '详情页面',
    name: 'database',
    component: require('./pages/user/user').default,
  },
  'personal': {
    title: '个人中心',
    name: 'user',
    component: require('./pages/personal').default,
  },
}