import compatibleAnimation from '../compatibles/compatibleAnimation';


export function transiton(duration='300ms', {
  property='all', 
  delay='0s',
  timeFunction='ease-in-out',
}={}) {
  return compatibleAnimation({
    'transition': `${property} ${isNaN(duration)?duration:`${duration}ms`} ${timeFunction} ${delay}`,
  }, true);
}

export function animation(name, duration='1s', {
  property='transform', 
  delay='0s',
  count='infinite',
  timeFunction='ease-in-out',
  direction,
  playState,
}={}) {
  let ret = {
    'animation': `${name} ${duration} ${timeFunction} ${delay} ${count}`,
  }
  if(direction) ret['animation-direction'] = direction;
  if(playState) ret['animation-play-state'] = playState;
  return compatibleAnimation(ret, true);
}

export function transform(name, ...params){
  params = params.reduce((v1,v2,i)=>`${v1}${i>0?',':''}${v2}`,'');

  return compatibleAnimation({
    transform: `${name}(${params})`,
  }, true);
}

export function transforms(param){
  let ret = {};
  Object.entries(param).forEach((v)=>compatibleAnimation({'transform': ` ${v[0]}(${v[1]})`}), true);
  return ret;
}