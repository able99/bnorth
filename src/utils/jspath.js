export default {
  setValue(obj, key, value) {
    if(!obj) return null;
    obj[key] = value;
    return obj;
  },

  getValue(obj, key) {
    if(!obj) return null;
    return obj[key];
  }
}