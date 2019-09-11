"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.triangleImage = triangleImage;

function triangleImage(color) {
  return "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20version%3D%221.1%22%20width%3D%2232%22%20height%3D%2220%22%20viewBox%3D%220%200%2032%2020%22%3E%3Cpolygon%20points%3D%220%2C0%2032%2C0%2016%2C20%22%20style%3D%22fill%3A%20".concat(color, "%22%3E%3C/polygon%3E%3C/svg%3E");
}
/*
// Image triangle
@function image-triangle($color: #000) {
  $color: rgb(red($color), green($color), blue($color));
  @return "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20version%3D%221.1%22%20width%3D%2232%22%20height%3D%2220%22%20viewBox%3D%220%200%2032%2020%22%3E%3Cpolygon%20points%3D%220%2C0%2032%2C0%2016%2C20%22%20style%3D%22fill%3A%20#{$color}%22%3E%3C/polygon%3E%3C/svg%3E";
}

@function pi() {
  @return 3.14159265359;
}

// Shape
// -----------------------------------------------------------------------------
/// CSS Triangle
/// Creates a CSS triangle, which can be used for dropdown arrows, popup tails, and more. Use this mixin inside a `&::before` or `&::after` selector, to attach the triangle to an existing element.
///
/// @param {number} $triangle-size - Width of the triangle.
/// @param {color} $triangle-color - Color of the triangle.
/// @param {keyword} $triangle-direction - Direction the triangle points. Can be `top`, `right`, `bottom`, or `left`.
@mixin css-triangle($triangle-size, $triangle-color, $triangle-direction) {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: inset $triangle-size;
  @if ($triangle-direction == top) {
    border-color: $triangle-color transparent transparent transparent;
    border-top-style: solid;
  }
  @if ($triangle-direction == bottom) {
    border-color: transparent transparent $triangle-color transparent;
    border-bottom-style: solid;
  }
  @if ($triangle-direction == left) {
    border-color: transparent transparent transparent $triangle-color;
    border-left-style: solid;
  }
  @if ($triangle-direction == right) {
    border-color: transparent $triangle-color transparent transparent;
    border-right-style: solid;
  }
}
*/