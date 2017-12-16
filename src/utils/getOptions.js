export default function getOptions(options) {
  let ret = {};
  if(typeof(options)==='function'){
    ret = options()||{};
  }else if(typeof(options)==='object'){
    ret = options;
  }

  if(ret.getOptions) ret = Object.assign({}, ret, ret.getOptions());
  return ret;
}