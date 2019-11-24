var Mock = require('mockjs')

Mock.setup({ timeout: '1000-3000' })

var users = {
  'admin': {
    'id': 'admin',
    'token': 'admin',
    'name': '管理员',
    'age': 18,
    'role': '管理员',
  },
  'user1': {
    'id': 'user1',
    'token': 'user1',
    'name': '用户1',
    'age': 19,
    'role': '用户',
  },
  'user2': {
    'id': 'user2',
    'token': 'user2',
    'name': '用户2',
    'age': 20,
    'role': '用户',
  }
}


Mock.mock('/auth', 'get', function(options) {
  let id = options.url.split('/').slice(-1)[0];
  return options;//users[1]||{};
})

Mock.mock('/auth', 'post', function(options) {
  let data = JSON.parse(options.body)||{};
  return users[data.username]||{};
})

Mock.mock(/\/user(\/\w*)?/, 'get', function(options) {
  let [,id=""] = options.url.match(/\/user(\/\w*)/)||[];
  return id?users[id.slice(1)]:Object.values(users);
})

Mock.mock('/test/arr', function(options) {
  return Mock.mock({ 'list|3':['@integer(1,100)'] }).list
});

Mock.mock('/test/arr/deep', { 'list|3':['@integer(1,100)'] })

let lists = Array.from({length: 168}, (v,i)=>String(i).padStart(3,'0'));
Mock.mock('/test/lists', function(options) {
  let data = JSON.parse(options.body)||{};

  return (data.order==='desc'?Array.from(lists).reverse():Array.from(lists))
    .filter(v=>!data.keyword?true:v.includes(data.keyword))
    .slice(data.pageStart, data.pageStart+data.pageSize)
    .map(v=>({type: data.type, data: v, num: Number(v)}))
})