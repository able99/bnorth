//https://github.com/emn178
const base64 = require('hi-base64');

export function base64encode(...args){
  return base64.encode(...args);
}

export function base64decode(...args){
  return base64.decode(...args);
}
