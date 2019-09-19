let validate = {
  errors: {
    default: '无效数据',
    required: '不可为空',
    number: '不是有效数字',
    positive: '不是有效正数',
  },

  required(val){
    if(val===undefined||val===null) return this.errors.required;
    if(typeof(val)==='string'&&!val.length) return this.errors.required;
  },
  
  number(val){
    return isNaN(val)&&this.errors.number;
  },

  positive(val){
    return this.number(val) && val > 0;
  },
}

function getClass(app) {
  return class Validate extends app.State {
    constructor(_id, options, ownerId){
      super(_id, options, ownerId);

      this.invalidates = {};
      this.options.__onStateUpdating = this.options._onStateUpdating;
      this.options._onStateUpdating = (nextData, prevData, data, options)=>{
        let {validateRules:rules, validateOptions={}, _onStateInvalidate, _onStateInvalidates} = options;
        this.invalidates = {};
        if(rules) {
          let invalidate;
          for(let rule of rules) {
            let func = (typeof rule.rule==='function')?rule.rule:(app.validate[rule.rule]&&app.validate[rule.rule].bind(app.validate));
            if(!func) continue;
            invalidate = func(nextData[rule.key], rule.params);
            if(invalidate) this.invalidates[rule.key] = invalidate;
            if(invalidate&&validateOptions.bail&&_onStateInvalidate) {
              nextData = _onStateInvalidate(invalidate, rule, nextData, prevData, data, options)||nextData;
            }
          }
          if(invalidate&&_onStateInvalidates) nextData = _onStateInvalidates(this.invalidates, rules, nextData, prevData, data, options)||nextData;
        }
        return this.options.__onStateUpdating?this.options.__onStateUpdating(nextData, prevData, data, options):nextData;
      }
    }
  }
}

export default {
  _id: 'validate',

  _onStart(app) {
    app.validate = validate;
    app.Validate = getClass(app);
  },

  _onStop(app) {
    delete app.validate;
    delete app.Validate;
  },
}

