[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import moment from 'moment';","ctx":false},{"tags":[{"type":"class","string":"formatPlugin","html":"<p>formatPlugin</p>"}],"description":{"full":"<p><strong>plugin</strong> moment: format dependence: format<br />\n覆盖format 中时间格式化函数，支持 <a href=\"https://github.com/moment/moment/\">moment</a></p>","summary":"<p><strong>plugin</strong> moment: format dependence: format<br />\n覆盖format 中时间格式化函数，支持 <a href=\"https://github.com/moment/moment/\">moment</a></p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":12,"codeStart":17,"code":"export default {\n  name: 'moment',\n  dependences: 'format',\n  \n  init(app) {\n    if(!app.format) return;","ctx":false},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{date|number|string} date - 需要格式化的时间，moment 标准","name":"date","description":"<ul>\n<li>需要格式化的时间，moment 标准</li>\n</ul>","types":["date","number","string"],"typesDescription":"<code>date</code>|<code>number</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} [format] - 格式化字符串，moment 标准","name":"[format]","description":"<ul>\n<li>格式化字符串，moment 标准</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{string} - 格式化后的时间字符串","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>格式化后的时间字符串</li>\n</ul>"}],"description":{"full":"<p>格式化时间</p>","summary":"<p>格式化时间</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":24,"codeStart":31,"code":"app.format.time = function(date, format) {\n  return moment(date).format(format);\n}","ctx":{"type":"method","receiver":"app.format","name":"time","string":"app.format.time()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{date|number|string} date - 需要比较的时间，moment 标准","name":"date","description":"<ul>\n<li>需要比较的时间，moment 标准</li>\n</ul>","types":["date","number","string"],"typesDescription":"<code>date</code>|<code>number</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{string} [fromTime] - 格式化字符串，moment 标准","name":"[fromTime]","description":"<ul>\n<li>格式化字符串，moment 标准</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false},{"type":"return","string":"{string} - 计算后的时间字符串","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"description":"<ul>\n<li>计算后的时间字符串</li>\n</ul>"}],"description":{"full":"<p>格式化时间</p>","summary":"<p>格式化时间</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":35,"codeStart":42,"code":"app.format.timeFrom = function(date, fromTime){\n  return fromTime?moment(date).from(fromTime):moment(date).fromNow();\n}\n  }\n}","ctx":{"type":"method","receiver":"app.format","name":"timeFrom","string":"app.format.timeFrom()"}}]