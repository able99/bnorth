function getValueWork(obj, akey) {
  if(!obj || typeof(akey) !== 'string') return null;
  if(!akey) return obj;

  let keys = akey.split('.')
  for(let key of keys) {
    obj = obj[key];
    if(!obj) return null;
  }

  return obj;
}

export default {
  setValue(obj, key, value) {
    if(!obj || !key || typeof(key)!=='string') return obj;

    let keys = key.split('.');
    let aobj = getValueWork(obj, keys.slice(0,-1).join('.'));
    if(!aobj) return obj;
    aobj[keys[keys.length-1]] = value;
    return obj;
  },

  getValue(obj, key) {
    return getValueWork(obj, key);
  }
}