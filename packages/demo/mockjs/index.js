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