"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backgroundImage = backgroundImage;

require("core-js/modules/es6.string.repeat");

function backgroundImage(image) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$repeat = _ref.repeat,
      repeat = _ref$repeat === void 0 ? 'no-repeat' : _ref$repeat,
      repeatX = _ref.repeatX,
      repeatY = _ref.repeatY,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'center' : _ref$position,
      positionX = _ref.positionX,
      positionY = _ref.positionY,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'contain' : _ref$size,
      sizeW = _ref.sizeW,
      sizeH = _ref.sizeH,
      color = _ref.color,
      attachment = _ref.attachment,
      origin = _ref.origin,
      clip = _ref.clip;

  var ret = {};
  if (image) ret["backgroundImage"] = "url(".concat(image, ")");
  if (!repeatX && !repeatY) ret["backgroundRepeat"] = repeat;
  if (repeatX) ret["backgroundRepeatX"] = repeatX;
  if (repeatY) ret["backgroundRepeatY"] = repeatY;
  if (positionX && !positionY) ret["backgroundPosition"] = position || 'center';
  if (positionX) ret["backgroundPositionX"] = positionX;
  if (positionY) ret["backgroundPositionY"] = positionY;
  if (!sizeW && !sizeH) ret["backgroundSize"] = size;
  if (sizeW || sizeH) ret["backgroundSize"] = "".concat(sizeW || 'auto', " ").concat(sizeH || 'auto');
  if (color) ret["backgroundColor"] = color;
  if (attachment) ret["backgroundAttachment"] = attachment;
  if (origin) ret["backgroundOrigin"] = origin;
  if (clip) ret["backgroundClip"] = clip;
  return ret;
}