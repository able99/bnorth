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
    

    if(positionX&&!positionY) ret["backgroundPosition"] = position||'center';
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