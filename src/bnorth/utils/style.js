const Style = {};

Style.shadow = function(color='#888888', h=0, v='1px', blur='3px', spread=0, inset=false) {
  return {
    boxShadow: `${color} ${h} ${v} ${blur?blur:''} ${spread?spread:''}${inset?' inset':''}`,
  }
}

Style.backgroundImage = function(image, repeat='no-repeat', w='100%', h='auto', x='center', y='center', color="none", attachment, origin, clip) {
  let ret = {};

  if(image){
  	ret["backgroundImage"] = `url(${image})`;
  }

  if(repeat){
  	ret["backgroundRepeat"] = repeat;
  }

  if(attachment){
  	ret["backgroundAttachment"] = attachment;
  }

  if(x||y){
  	ret["backgroundPosition"] = `${x} ${y}`;
  }

  if(w||h){
  	ret["backgroundSize"] = `${w} ${h}`;
  }

  if(color){
    ret["backgroundColor"] = color;
  }

  if(origin){
  	ret["backgroundOrigin"] = origin;
  }

  if(clip){
  	ret["backgroundClip"] = clip;
  }

  return ret;
}

export default Style;