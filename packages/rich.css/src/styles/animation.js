/**
 * @module
 */
import compatibleAnimation from '../compatibles/compatibleAnimation';


/**
 * 生成 transition 过度动画属性的 style inline 对象
 * @param {string} [duration='300ms'] - 动画持续时间
 * @param {object=} options - 动画参数对象
 * 
 * 1. property：规定应用过渡的 CSS 属性的名称，默认值为 `all`
 * 1. delay：规定过渡效果何时开始
 * 1. timeFunction： 规定过渡效果的时间曲线，参见 css transition-timing-function
 * 
 * @returns {object} style inline object
 */
export function transiton(duration='300ms', {
  property='all', 
  delay='0s',
  timeFunction='ease-in-out',
}={}) {
  return compatibleAnimation({
    'transition': `${property} ${isNaN(duration)?duration:`${duration}ms`} ${timeFunction} ${delay}`,
  }, true);
}

/**
 * 生成 transform 的变换原点配置
 * @param {string} [x='center'] - x 轴或者全部(y,z 为空)
 * @param {string=} [y] - y 轴
 * @param {string=} z - z 轴
 * @returns {object} style inline object
 */
export function transformOrigin(x='center',y,z) {
  return compatibleAnimation({
    'transform-origin': `${x} ${y||''} ${z||''}`,
  }, true);
}

/**
 * 生成 animation 帧动画属性的 style inline 对象
 * @param {string} name - 规定 @keyframes 动画的名称
 * @param {string} [duration='1s'] - 规定动画完成一个周期所花费的秒或毫秒
 * @param {object=} options - 动画参数对象
 * 
 * 1. delay：规定过渡效果何时开始，默认值 `0s`
 * 1. count：规定动画被播放的次数，默认值 `infinite`
 * 1. direction：规定动画是否在下一周期逆向地播放
 * 1. playState：规定动画是否正在运行或暂停
 * 1. timeFunction： 规定过渡效果的时间曲线，参见 css transition-timing-function，默认值 `ease-in-out`
 * 
 * @returns {object} style inline object
 */
export function animation(name, duration='1s', {
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

/**
 * 生成 transform 应用 2D 或 3D 转换(包括旋转、缩放、移动或倾斜) 的 style inline 对象
 * 
 * 转换函数包括：
 * 
 * 1. none	定义不进行转换。
 * 1. matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵
 * 1. matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。	
 * 1. translate(x,y)	定义 2D 转换
 * 1. translate3d(x,y,z)	定义 3D 转换。	
 * 1. translateX(x)	定义转换，只是用 X 轴的值
 * 1. translateY(y)	定义转换，只是用 Y 轴的值
 * 1. translateZ(z)	定义 3D 转换，只是用 Z 轴的值。	
 * 1. scale(x,y)	定义 2D 缩放转换
 * 1. scale3d(x,y,z)	定义 3D 缩放转换。	
 * 1. scaleX(x)	通过设置 X 轴的值来定义缩放转换
 * 1. scaleY(y)	通过设置 Y 轴的值来定义缩放转换
 * 1. scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。	
 * 1. rotate(angle)	定义 2D 旋转，在参数中规定角度
 * 1. rotate3d(x,y,z,angle)	定义 3D 旋转。	
 * 1. rotateX(angle)	定义沿着 X 轴的 3D 旋转
 * 1. rotateY(angle)	定义沿着 Y 轴的 3D 旋转
 * 1. rotateZ(angle)	定义沿着 Z 轴的 3D 旋转
 * 1. skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换
 * 1. skewX(angle)	定义沿着 X 轴的 2D 倾斜转换
 * 1. skewY(angle)	定义沿着 Y 轴的 2D 倾斜转换
 * 1. perspective(n)	为 3D 转换元素定义透视视图。
 * 
 * @param {string} name - 转换的名称
 * @param {...*} - 转换的参数
 * 
 * @returns {object} style inline object
 */
export function transform(name, ...params){
  params = params.reduce((v1,v2,i)=>`${v1}${i>0?',':''}${v2}`,'');

  return compatibleAnimation({
    transform: `${name}(${params})`,
  }, true);
}

/**
 * transform 的批量版本
 * @param {object} - 转换的名称
 * @returns {object} style inline object
 */
export function transforms(param){
  let ret = {};
  Object.entries(param).forEach((v)=>compatibleAnimation({'transform': ` ${v[0]}(${v[1]})`}), true);
  return ret;
}