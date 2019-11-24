var Mock = require('mockjs')

Mock.setup({ timeout: '1000-3000' })

Mock.mock('/test/obj', {
  'a|+1': 1,
  'b|+1': 1,
  'c|+1': 1,
})

Mock.mock('/test/arr', )

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