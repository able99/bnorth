[{"tags":[{"type":"copyright","string":"(c) 2016 able99","html":"<p>(c) 2016 able99</p>"},{"type":"author","string":"able99 (8846755@qq.com)","html":"<p>able99 (8846755@qq.com)</p>"},{"type":"license","string":"MIT","html":"<p>MIT</p>"}],"description":{"full":"<p>bnorth solution</p>","summary":"<p>bnorth solution</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":1,"codeStart":9,"code":"import { timeInit, time, timeFrom } from '../utils/time';\nimport { check, checkObject, checkObjectItem } from '../utils/validator';","ctx":false},{"tags":[{"type":"class","string":"**插件** 该类为插件类扩展了App 的能力\napp.Format: 该类的原型\napp.format: 该类的实例","html":"<p><strong>插件</strong> 该类为插件类扩展了App 的能力<br />\napp.Format: 该类的原型<br />\napp.format: 该类的实例</p>"}],"description":{"full":"<p>为app 提供格式化输出与数据校验的功能扩展</p>","summary":"<p>为app 提供格式化输出与数据校验的功能扩展</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":13,"codeStart":20,"code":"class Format {\n  constructor(app){\n    this.app = app;","ctx":{"type":"class","constructor":"Format","cons":"Format","name":"Format","extends":"","string":"new Format()"}},{"tags":[{"type":"property","string":"{string} [moneyDefault='0.00'] - 金额默认字符串","name":"[moneyDefault='0.00']","description":"<ul>\n<li>金额默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":24,"codeStart":27,"code":"this.moneyDefault = '0.00';","ctx":{"type":"property","receiver":"this","name":"moneyDefault","value":"'0.00'","string":"this.moneyDefault"}},{"tags":[{"type":"property","string":"{string} [timeFormat='YYYY-MM-DD HH:mm:ss'] - 时间默认的格式化字符串","name":"[timeFormat='YYYY-MM-DD","description":"<p>HH:mm:ss'] - 时间默认的格式化字符串</p>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":29,"codeStart":32,"code":"this.timeFormat = \"YYYY-MM-DD HH:mm:ss\";","ctx":{"type":"property","receiver":"this","name":"timeFormat","value":"\"YYYY-MM-DD HH:mm:ss\"","string":"this.timeFormat"}},{"tags":[{"type":"property","string":"{string} [byteSizeG='G'] - 文件大小默认字符串","name":"[byteSizeG='G']","description":"<ul>\n<li>文件大小默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":34,"codeStart":37,"code":"this.byteSizeG = 'G';","ctx":{"type":"property","receiver":"this","name":"byteSizeG","value":"'G'","string":"this.byteSizeG"}},{"tags":[{"type":"property","string":"{string} [byteSizeM='M'] - 文件大小默认字符串","name":"[byteSizeM='M']","description":"<ul>\n<li>文件大小默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":38,"codeStart":41,"code":"this.byteSizeM = 'M';","ctx":{"type":"property","receiver":"this","name":"byteSizeM","value":"'M'","string":"this.byteSizeM"}},{"tags":[{"type":"property","string":"{string} [byteSizeK='K'] - 文件大小默认字符串","name":"[byteSizeK='K']","description":"<ul>\n<li>文件大小默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":42,"codeStart":45,"code":"this.byteSizeK = 'K';","ctx":{"type":"property","receiver":"this","name":"byteSizeK","value":"'K'","string":"this.byteSizeK"}},{"tags":[{"type":"property","string":"{string} [byteSizeB='B'] - 文件大小默认字符串","name":"[byteSizeB='B']","description":"<ul>\n<li>文件大小默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":46,"codeStart":49,"code":"this.byteSizeB = 'B';","ctx":{"type":"property","receiver":"this","name":"byteSizeB","value":"'B'","string":"this.byteSizeB"}},{"tags":[{"type":"property","string":"{string} [checkErrorMessage='error'] - 校验错误的默认字符串","name":"[checkErrorMessage='error']","description":"<ul>\n<li>校验错误的默认字符串</li>\n</ul>","types":["string"],"typesDescription":"<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":51,"codeStart":54,"code":"this.checkErrorMessage = 'error';\n  }","ctx":{"type":"property","receiver":"this","name":"checkErrorMessage","value":"'error'","string":"this.checkErrorMessage"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{number|string} val - 金额","name":"val","description":"<ul>\n<li>金额</li>\n</ul>","types":["number","string"],"typesDescription":"<code>number</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>格式化金额</p>","summary":"<p>格式化金额</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":57,"codeStart":62,"code":"money(val){\n  return !isNaN(val)?Number(val).toFixed(2):this.moneyDefault;\n}","ctx":{"type":"method","name":"money","string":"money()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{number|string} value - 金额","name":"value","description":"<ul>\n<li>金额</li>\n</ul>","types":["number","string"],"typesDescription":"<code>number</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{number|string} discount - 折扣","name":"discount","description":"<ul>\n<li>折扣</li>\n</ul>","types":["number","string"],"typesDescription":"<code>number</code>|<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{number|string} [min=0.01] - 最小金额","name":"[min=0.01]","description":"<ul>\n<li>最小金额</li>\n</ul>","types":["number","string"],"typesDescription":"<code>number</code>|<code>string</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>计算折扣并格式化</p>","summary":"<p>计算折扣并格式化</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":66,"codeStart":73,"code":"discount(value, discount, min=0.01) {\n  if(isNaN(value)||Number(value)===0) return 0;\n  if(isNaN(discount)) return value;\n\n  return Math.max(Math.round(value*100*discount)/100, min);\n}","ctx":{"type":"method","name":"discount","string":"discount()"}},{"tags":[{"type":"method","string":"","html":""}],"description":{"full":"<p>初始化时间格式化，由于moment 体积较大，分离初始化</p>","summary":"<p>初始化时间格式化，由于moment 体积较大，分离初始化</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":80,"codeStart":84,"code":"timeInit() {\n  return timeInit();\n}","ctx":{"type":"method","name":"timeInit","string":"timeInit()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{*} val ","name":"val","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} val</p>"},{"type":"param","string":"{*} options","name":"options","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} options</p>"}],"description":{"full":"<p>格式化时间</p>","summary":"<p>格式化时间</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":88,"codeStart":94,"code":"time(val, options){\n  options = options||{};\n  options.format = options.format || this.timeFormat;\n  return time(val, options);\n}","ctx":{"type":"method","name":"time","string":"time()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{*} val ","name":"val","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} val</p>"},{"type":"param","string":"{*} options","name":"options","description":"","types":[],"typesDescription":"<code>*</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{*} options</p>"}],"description":{"full":"<p>格式化时间比较</p>","summary":"<p>格式化时间比较</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":100,"codeStart":106,"code":"timeFrom(val, options){\n  return timeFrom(val, options);\n}","ctx":{"type":"method","name":"timeFrom","string":"timeFrom()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{number} size - 文件大小","name":"size","description":"<ul>\n<li>文件大小</li>\n</ul>","types":["number"],"typesDescription":"<code>number</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false},{"type":"param","string":"{number} [fixed=2] - 小数点位数","name":"[fixed=2]","description":"<ul>\n<li>小数点位数</li>\n</ul>","types":["number"],"typesDescription":"<code>number</code>","optional":true,"nullable":false,"nonNullable":false,"variable":false}],"description":{"full":"<p>格式化文件尺寸</p>","summary":"<p>格式化文件尺寸</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":110,"codeStart":116,"code":"byteSize(size=0, fixed=2){\n  if(size>1024*1024*1024){\n    return (size/1024/1024/1024).toFixed(fixed)+this.byteSizeG;\n  }else if(size>1024*1024){\n    return (size/1024/1024).toFixed(fixed)+this.byteSizeM;\n  }else if(size>1024){\n    return (size/1024).toFixed(fixed)+this.byteSizeK;\n  }else{\n    return (size?size:0)+this.byteSizeB;\n  }\n}","ctx":{"type":"method","name":"byteSize","string":"byteSize()"}},{"tags":[{"type":"method","string":"","html":""},{"type":"param","string":"{object} val ","name":"val","description":"","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{object} val</p>"},{"type":"param","string":"{object} arule ","name":"arule","description":"","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{object} arule</p>"},{"type":"param","string":"{object} options ","name":"options","description":"","types":["object"],"typesDescription":"<code>object</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{object} options</p>"},{"type":"param","string":"{string} errorMessage","name":"errorMessage","description":"","types":["string"],"typesDescription":"<code>string</code>","optional":false,"nullable":false,"nonNullable":false,"variable":false,"html":"<p>{string} errorMessage</p>"}],"description":{"full":"<p>校验数据对象的有效性</p>","summary":"<p>校验数据对象的有效性</p>","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":128,"codeStart":136,"code":"check(val, arule, options, errorMessage) {\n  return check(val, arule, options, this.checkErrorMessage);\n}\n\ncheckObjectItem(obj, key, rules, options)  {\n  return checkObjectItem(obj, key, rules, options);\n}\n\ncheckObject(obj, rules, options)  {\n  return checkObject(obj, rules, options);\n}\n}\n\n\nexport default {\nname: 'format',\n\ninit(app) {\n  app.Format = Format;\n  app.format = new Format(app);\n}\n}","ctx":{"type":"method","name":"check","string":"check()"}}]