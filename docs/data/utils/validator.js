[{"tags":[{"type":"class","string":"Rule","html":"<p>Rule</p>"}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":true,"isEvent":false,"ignore":false,"line":5,"codeStart":8,"code":"let is = {};","ctx":{"type":"declaration","name":"is","value":"{}","string":"is"}},{"tags":[{"type":"method","string":"required","html":"<p>required</p>"},{"type":"example","string":"```js\n'required'\n```","html":"<pre><code class=\"lang-js\">'required'\n</code></pre>"}],"description":{"full":"","summary":"","body":""},"isPrivate":false,"isConstructor":false,"isClass":false,"isEvent":false,"ignore":false,"line":10,"codeStart":17,"code":"is.required = function(n,checkInput,checkO){\n  if(checkInput)return true;\n  if(n===undefined||n===null) return false;\n  if(typeof(n)==='string'&&!n.length) return false;\n  if(checkO&&Number(n)===0) return false;\n  return true;\n}\nis.number = function(n,checkInput){\n  return !isNaN(n) || (checkInput&&(n==='.'||n==='0'||n==='0.'));\n}\nis.positive = function(n,checkInput) {\n  return is.number(n) && Number(n) > 0;\n};\n\n\n// check\n// -----------------------------\nexport function check(val, arule, options={}, checkErrorMessage) {\n  if(!arule) return null;\n  let message = options.checkErrorMessage||checkErrorMessage||'error';\n  let rule;\n  let params = [];\n  let checker = null;\n  let ret;\n\n  if(typeof(arule)==='object'){\n    if(arule.rule) rule = arule.rule;\n    if(arule.params) params = arule.params;\n    if(arule.message) message = arule.message;\n  }else if(typeof(arule)==='string'){\n    rule = arule;\n  }else if(typeof(arule)==='function'){\n    rule = arule(val);\n  }\n  if(rule===undefined) return null;\n\n  let getNot = false;\n  if(rule===true||rule===false) {\n    ret = rule;\n  }else if(typeof(rule)==='function'){\n    ret = !rule(val, options.input, ...params);\n  }else if(typeof(rule)==='string') {\n    if(rule[0]==='!'){\n      rule = rule.slice(1);\n    }\n    let splits = rule.split('|');\n    if(splits.length>1){\n      rule = splits[0];\n      params = [...params, splits.slice(1)];\n    }\n    checker = is[rule];\n    if(!checker) return null;\n    ret = !checker(val, options.input, ...params);\n  }else{\n    return null;\n  }\n\n  if(getNot)ret=!ret;\n  return ret?message:null;\n}\n\nexport function checkObjectItem(obj={}, key, rules, options={}) {\n  if(!key||!rules) return false;\n  let val = jspath.apply(`.${key}[0]`,obj);\n\n  if(Array.isArray(rules)){\n    for(let rule of rules){\n      let ret = check(val,rule,options);\n      if(ret) return ret;\n    }\n    return false;\n  }else{\n    return check(val, rules, options);\n  }\n}\n\nexport function checkObject(obj, rules={}, options={}, rets={}) {\n  if(!obj||typeof(obj)!=='object') return;\n  let message = '';\n\n  for(let [key, rule] of Object.entries(rules)) {\n    message = checkObjectItem(obj, key, rule);\n    if(message) {\n      rets[key] = message;\n      if(!options.bail) break;\n    }\n  }\n\n  return message;\n}","ctx":{"type":"method","receiver":"is","name":"required","string":"is.required()"}}]