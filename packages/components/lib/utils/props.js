"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hascx = hascx;
exports.genSelector = genSelector;
exports.genCommonProps = genCommonProps;
exports.genItemProps = genItemProps;
Object.defineProperty(exports, "cx", {
  enumerable: true,
  get: function get() {
    return _classnames.default;
  }
});

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _flex = require("rich.css/lib/styles/flex");

function hascx(className, name) {
  return className && className.split(' ').find(function (v) {
    return v.trim().startsWith(name);
  });
} // export function mergeClassName(...args){
//   let ret;
//   for(let arg of args) {
//     let className = cx(arg);
//     if(!ret) ret = className;
//     className.split(/\s*/).forEach(v=>{
//     })
//   }
// }


function genSelector(name) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (v) {
    if (!v || v === true) return;
    if (Array.isArray(v)) v = v[0] === true ? v[1] : v[0];
    name += "-".concat(v);
  });
  return name;
}

function genCommonProps(aprops, hasContainer) {
  var _ref = aprops || {},
      className = _ref.className,
      containerClassName = _ref.containerClassName,
      style = _ref.style,
      containerStyle = _ref.containerStyle,
      scrollable = _ref.scrollable,
      block = _ref.block,
      active = _ref.active,
      selected = _ref.selected,
      disabled = _ref.disabled,
      radius = _ref.radius,
      rounded = _ref.rounded,
      cursor = _ref.cursor,
      flexDisplay = _ref.flexDisplay,
      flexDirection = _ref.flexDirection,
      flexJustify = _ref.flexJustify,
      flexAlign = _ref.flexAlign,
      flexWrap = _ref.flexWrap,
      flexSubAlign = _ref.flexSubAlign,
      flexSubFlex = _ref.flexSubFlex,
      flexSubGrow = _ref.flexSubGrow,
      flexSubShrink = _ref.flexSubShrink,
      flexSubBasis = _ref.flexSubBasis,
      flexSubOrder = _ref.flexSubOrder,
      refWrap = _ref.refWrap,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "containerClassName", "style", "containerStyle", "scrollable", "block", "active", "selected", "disabled", "radius", "rounded", "cursor", "flexDisplay", "flexDirection", "flexJustify", "flexAlign", "flexWrap", "flexSubAlign", "flexSubFlex", "flexSubGrow", "flexSubShrink", "flexSubBasis", "flexSubOrder", "refWrap"]);

  var classSet = {};
  var styleSet = {};
  var baseSelector = '';
  if (active) classSet['active'] = true;
  if (selected) classSet['selected'] = true;
  if (disabled) classSet['disabled'] = true;

  if (block) {
    classSet['display-block'] = true;
    classSet['width-full'] = true;
  }

  if (radius) {
    classSet['border-radius'] = true;
  }

  if (rounded) {
    classSet['border-radius-rounded'] = true;
  }

  if (scrollable) {
    classSet[genSelector('scrollable', scrollable)] = true;
  }

  baseSelector = 'flex';

  if (flexDisplay) {
    classSet[genSelector(baseSelector, 'display', [flexDisplay, 'flex'])] = true;
  }

  if (flexDirection) {
    classSet[genSelector(baseSelector, 'direction', [flexDirection, 'v'])] = true;
  }

  if (flexJustify) {
    classSet[genSelector(baseSelector, 'justify', [flexJustify, 'center'])] = true;
  }

  if (flexAlign) {
    classSet[genSelector(baseSelector, 'align', [flexAlign, 'center'])] = true;
  }

  if (flexWrap) {
    classSet[genSelector(baseSelector, 'wrap', [flexWrap, 'wrap'])] = true;
  }

  baseSelector = 'flex-sub';

  if (flexSubAlign) {
    classSet[genSelector(baseSelector, 'align', [flexSubAlign, 'center'])] = true;
  }

  if (flexSubFlex) {
    classSet[genSelector(baseSelector, 'flex', [flexSubFlex, 'extend'])] = true;
  }

  if (flexSubGrow) {
    styleSet = (0, _objectSpread2.default)({}, styleSet, (0, _flex.styleFlexSubGrow)(flexSubGrow));
  }

  if (flexSubShrink) {
    styleSet = (0, _objectSpread2.default)({}, styleSet, (0, _flex.styleFlexSubShrink)(flexSubShrink));
  }

  if (flexSubBasis) {
    styleSet = (0, _objectSpread2.default)({}, styleSet, (0, _flex.styleFlexSubBasis)(flexSubBasis));
  }

  if (flexSubOrder) {
    styleSet = (0, _objectSpread2.default)({}, styleSet, (0, _flex.styleFlexSubOrder)(flexSubOrder));
  }

  return (0, _objectSpread2.default)({}, props, {
    className: (0, _classnames.default)(classSet, className),
    style: (0, _objectSpread2.default)({}, styleSet, style),
    selected: selected,
    ref: refWrap
  });
}

function genItemProps(i, size) {
  var componentProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var aprops = arguments.length > 3 ? arguments[3] : undefined;
  var getClassName = arguments.length > 4 ? arguments[4] : undefined;
  var getProps = arguments.length > 5 ? arguments[5] : undefined;
  var getStyle = arguments.length > 6 ? arguments[6] : undefined;
  var className = aprops.className,
      style = aprops.style,
      props = (0, _objectWithoutProperties2.default)(aprops, ["className", "style"]);
  var componentClassName = componentProps.className;
  className = (0, _classnames.default)(componentClassName, className);
  return (0, _objectSpread2.default)({}, componentProps, props, getProps && getProps(i, size, componentProps), {
    style: (0, _objectSpread2.default)({}, style, getStyle && getStyle(i, size, componentProps)),
    className: (0, _classnames.default)(className, getClassName && getClassName(i, size, componentProps, className))
  });
}