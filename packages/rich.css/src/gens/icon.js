import { getSelector } from '../utils';


export function genIconFont({iconFonts, iconClassName}) {
  if(!iconFonts||!iconClassName) return;
  if(typeof iconFonts === 'string') iconFonts = [{src: iconFonts}];
  if(!Array.isArray(iconFonts)) iconFonts = [iconFonts];
  let ret = {};

  iconFonts.forEach((v,i)=>{
    ret[`@font-face${' '.repeat(i)}`] = {
      'font-family': v.family||'font',
      'font-weight': v.weight||'normal',
      'font-style': v.style||'normal',
      'src': v.src,
    }
  });

  let familys = iconFonts.reduce((v1, v2)=>{
    return v1 + (v2.family||'font') + ', ';
  },'') + 'sans-serif';

  ret[getSelector(iconClassName)] = {
    'font-family': familys,
  }

  return ret;
}

export function genIconClass({iconClassName='icon'}) {
  if(!iconClassName) return;
  let ret = {};

  ret[getSelector(iconClassName+':before')] = {
    'content': 'attr(data-icon-name)',
  }

  ret[getSelector(iconClassName+'.button')] = {
    'font-size': 'inherit',
  }

  return ret;
}


export default function gen(config) {
  return {
    ...genIconFont(config), 
    ...genIconClass(config),
  };
}