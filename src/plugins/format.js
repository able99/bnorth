import { timeInit, time, timeFrom } from '../utils/time';
import { check, checkObject, checkObjectItem } from '../utils/validator';

class Format {
  constructor(app){
    this.app = app;

    this.moneyDefault = '0.00';

    this.timeFormat = "YYYY-MM-DD HH:mm:ss";

    this.byteSizeG = 'G';
    this.byteSizeM = 'M';
    this.byteSizeK = 'K';
    this.byteSizeB = 'B';

    this.checkErrorMessage = 'error';
  }

  money(val){
    return !isNaN(val)?Number(val).toFixed(2):this.moneyDefault;
  }

  discount(value, discount, min=0.01) {
    if(isNaN(value)||Number(value)===0) return 0;
    if(isNaN(discount)) return value;

    return Math.max(Math.round(value*100*discount)/100, min);
  }

  timeInit() {
    return timeInit();
  }

  time(val, options){
    options = options||{};
    options.format = options.format || this.timeFormat;
    return time(val, options);
  }

  timeFrom(val, options){
    return timeFrom(val, options);
  }

  byteSize(size=0, fixed=2){
    if(size>1024*1024*1024){
      return (size/1024/1024/1024).toFixed(fixed)+this.byteSizeG;
    }else if(size>1024*1024){
      return (size/1024/1024).toFixed(fixed)+this.byteSizeM;
    }else if(size>1024){
      return (size/1024).toFixed(fixed)+this.byteSizeK;
    }else{
      return (size?size:0)+this.byteSizeB;
    }
  }

  check(val, arule, options, errorMessage) {
    return check(val, arule, options, this.checkErrorMessage);
  }

  checkObjectItem(obj, key, rules, options)  {
    return checkObjectItem(obj, key, rules, options);
  }

  checkObject(obj, rules, options)  {
    return checkObject(obj, rules, options);
  }
}


export default {
  init(app) {
    app.Format = Format;
    app.format = new Format(app);
  }
}