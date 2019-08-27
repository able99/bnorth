let validate = {
  errors: {
    default: '无效数据',
    required: '不可为空',
    number: '不是有效数字',
    inumber: '不是有效数字',
    positive: '不是有效正数',
    ipositive: '不是有效正数',
  },

  required(val, check0){
    if(val===undefined||val===null) return false;
    if(typeof(val)==='string'&&!val.length) return false;
    return true;
  },

  irequired(val){
    return true;
  },
  
  number(val){
    return !isNaN(val);
  },

  inumber(val){
    return !isNaN(val) || ((val==='.'||val==='0'||val==='0.'));
  },

  positive(val){
    return this.number(val) && val > 0;
  },

  ipositive(val){
    return this.inumber(val) && val>=0;
  },
}

function getClass(app) {
  return class Validate extends app.State {
    constructor(app, options){
      super(app, options);

      app.event.on(this._id, 'onStateUpdating', (nextData, prevData, data, {input,irules,rules,path}={})=>{return this.validate(nextData, input?irules:rules, path, prevData)}, this._id);
      app.event.on(this._id, 'onStateUpadteInvalidate', (key, message, nextData, prevData)=>{this.app.render.error(message); return true}, this._id);
    }

    validateItem(key, data, rules) {
      let val = data&&this.app.utils.pathGet(data, key);
      let rule = rules[key];
      if(!rule) return;

      let rulesArr = Array.isArray(rule)?rule:[rule];
      for(let ruleItem of rulesArr) {
        if(typeof ruleItem==='function') {
          return ruleItem(key, data, rules);
        }else if(typeof ruleItem==='object') {

        }else{
          let ruleParams = String(ruleItem).split('|');
          let ret = (typeof(this.app.validate[ruleParams[0]])==='function') && this.app.validate[ruleParams[0]](val, ...ruleParams.slice(1));
          if(!ret) return this.app.validate.errors[ruleParams[0]] || this.app.validate.errors.default;
        }
      }
    }

    validate(nextData, rules, paths, prevData) {
      if(!rules) return;

      let keys = !paths?Object.keys(rules):(Array.isArray(paths)?paths:[paths])
      for(let key of keys) {
        let message = this.validateItem(key, nextData, rules);
        if(message) {
          this.app.event.emitSync(this._id, 'onStateUpadteInvalidate', key, message, nextData, prevData);
          return prevData;
        }
      }
    }
  }
}

export default app=>{
  let Validate = getClass(app);

  return {
    _id: 'validate',

    _onStart(app) {
      app.validate = validate;
      app.Validate = Validate;
    },

    _onStop(app) {
      delete app.validate;
      delete app.Validate;
    },
  }
}

