/**
 * 动画
 * @module
 */
import { getStyleValueSet, genClassObjects } from '../utils';
import compatibleAnimation from '../compatibles/compatibleAnimation';


/**
 * 样式生成函数：动画
 * @exportdefault
 * @type {module:gen~GenFunc}
 * @param {module:config~GenConfig} config - 生成配置对象
 * @returns {module:gen~ClassObjects} 样式表的描述对象
 */
function genFuncAnimation({transitionProperty, transitionTime, animationTime, animationTimingFunction, animationCount, animationDirection, animationPlayState}) {
  return Object.assign(
    /**
     * 设置渐变动画影响的属性
     * @classname transition-property
     * @param {module:config~GenConfig#transitionProperty} property - 属性
     */
    genClassObjects('.transition-property', {
      styleKey: true,
      styleValueSet: getStyleValueSet(transitionProperty),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置渐变动画的过度时间
     * @classname transition-duration
     * @param {module:config~GenConfig#transitionTime} time - 过度时间
     */
    genClassObjects('.transition-duration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(transitionTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置渐变动画的延迟开始的时间
     * @classname transition-delay
     * @param {module:config~GenConfig#transitionTime} time - 延迟时间
     */
    genClassObjects('.transition-delay', {
      styleKey: true,
      styleValueSet: getStyleValueSet(transitionTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置渐变动画的过度函数
     * @classname transition-timing-function
     * @param {module:config~GenConfig#animationTimingFunction} func - 过度函数
     */
    genClassObjects('.transition-timing-function', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTimingFunction),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置帧动画的重复次数
     * @classname animation-iteration-count
     * @param {module:config~GenConfig#animationCount} times - 重复次数
     */
    genClassObjects('.animation-iteration-count', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationCount),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置帧动画的重复执行时的执行方向
     * @classname animation-direction
     * @param {module:config~GenConfig#animationDirection} direction - 执行方向
     */
    genClassObjects('.animation-direction', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationDirection),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置帧动画的播放状态
     * @classname animation-play-state
     * @param {module:config~GenConfig#animationPlayState} state - 播放状态
     */
    genClassObjects('.animation-play-state', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationPlayState),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置帧动画的动画时间
     * @classname animation-duration
     * @param {module:config~GenConfig#animationTime} time - 动画时间
     */
    genClassObjects('.animation-duration', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
    /**
     * 设置帧动画的延迟开始的时间
     * @classname animation-delay
     * @param {module:config~GenConfig#animationTime} time - 延迟时间
     */
    genClassObjects('.animation-delay', {
      styleKey: true,
      styleValueSet: getStyleValueSet(animationTime),
      styleObjectCompatible: compatibleAnimation,
    }), 
  );
}


export default genFuncAnimation;