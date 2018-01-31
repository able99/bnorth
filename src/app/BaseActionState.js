/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import getUuid from '../utils/uuid';
import getOptions from '../utils/getOptions';

 
export default class BaseActionState{
  static maps = {};
  static getClassName(claxx) {
    return claxx&&(claxx.stateName||claxx.name);
  }
  static instance(claxx,app,uuid,options) {
    uuid = uuid||getUuid();
    let className = BaseActionState.getClassName(claxx);

    if(!BaseActionState.maps[className]) BaseActionState.maps[className] = {};
    let instance = BaseActionState.maps[className][uuid] || new claxx(app, uuid, getOptions(options));
    instance.className = className;
    BaseActionState.maps[className][uuid] = instance;
    return instance;
  }

  constructor(app, uuid){
    this.name='';
    this.displayName = '';
    this.app = app;
    this.uuid = uuid;
  }

  get state() { 
    return null;
  }

  get states() { 
    return null;
  }

  trigger(event, ...args) {
    let handler = this[event];
    if(!handler) return false;
    let title = `state event(${event}-${this.className}-${this.name}-${this.displayName}):`;
    try{
      this.app.verbose(title, ...args);
      return handler.apply(this, args);
    }catch(e){
      this.app.error('state handler', e); 
      this.app.errorNotice(e);
    }
  }
}
