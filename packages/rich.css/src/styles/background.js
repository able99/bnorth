/**
 * @module
 */

/**
 * 生成设置背景的 style inline 对象
 * @param {?string=} - 背景图片地址，可以为空
 * @param {object=} options - 背景参数对象
 * 
 * 1. repeat|repeatX|repeatY：设置是否及如何重复背景图像，可分垂直水平两个方向分别设置，默认值为 `no-repeat`
 * 1. position|positionX|positionY：设置背景图像的开始位置，可分垂直水平两个方向分别设置，默认值为 `center`
 * 1. size|sizeW|sizeH：规定背景图片的尺寸，可分垂直水平两个方向分别设置，默认值为 `contain`
 * 1. color：设置元素的背景颜色
 * 1. attachment：设置背景图像是否固定或者随着页面的其余部分滚动，参见 css background-attachment
 * 1. origin：规定背景图片的定位区域，参见 css background-origin
 * 1. clip：规定背景的绘制区域，参见 css background-clip
 * 
 * @returns {object} style inline object
 * @example
 * ```jsx
 * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
 * export default props=>{
 *   return <div style={backgroundImage(props.bgimg, {size: '100%'})} />
 * }
 * ```
 */
export function backgroundImage(image, {
  repeat='no-repeat', repeatX, repeatY,
  position='center', positionX, positionY,
  size='contain', sizeW, sizeH,
  color, attachment, origin, clip,
}={}) {
  let ret = {};

  if(image) ret["backgroundImage"] = `url(${image})`;

  if(!repeatX&&!repeatY) ret["backgroundRepeat"] = repeat;
  if(repeatX) ret["backgroundRepeatX"] = repeatX;
  if(repeatY) ret["backgroundRepeatY"] = repeatY;

  if(!positionX&&!positionY) ret["backgroundPosition"] = position||'center';
  if(positionX) ret["backgroundPositionX"] = positionX;
  if(positionY) ret["backgroundPositionY"] = positionY;
  
  if(!sizeW&&!sizeH) ret["backgroundSize"] = size;
  if(sizeW||sizeH) ret["backgroundSize"] = `${sizeW||'auto'} ${sizeH||'auto'}`;

  if(color) ret["backgroundColor"] = color;
  if(attachment) ret["backgroundAttachment"] = attachment;
  if(origin) ret["backgroundOrigin"] = origin;
  if(clip) ret["backgroundClip"] = clip;

  return ret;
}