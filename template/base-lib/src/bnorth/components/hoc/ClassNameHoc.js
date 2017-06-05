import { NAMESPACE, CLASSNAMES, } from '../config';

const namespace = (NAMESPACE ? NAMESPACE + '-' : '');

export default (Wrapper) => {
  Wrapper.prototype.setClassNS = function(classPrefix) {
    const prefix = classPrefix || this.props.classPrefix || '';

    return namespace + prefix;
  }

  Wrapper.prototype.getClassSet = function(ignorePrefix) {
    let classNames = {};
    const {
      amSize,
      amStyle,
      hollow,
      radius,
      rounded,
      active,
      selected,
      disabled,
      inset,
    } = this.props;

    // uses `.am-` as prefix if `classPrefix` is not defined
    let prefix = namespace;

    if (this.props.classPrefix) {
      const classPrefix = this.setClassNS();

      prefix = classPrefix + '-';

      // don't return prefix if ignore flag set
      !ignorePrefix && (classNames[classPrefix] = true);
    }

    if (amSize) {
      classNames[prefix + amSize] = true;
    }

    if (amStyle) {
      classNames[prefix + amStyle] = true;
    }

    if (hollow) {
      classNames[prefix + 'hollow'] = true;
    }

    classNames[this.prefixClass('radius')] = radius;
    classNames[this.prefixClass('rounded')] = rounded;

    classNames[this.prefixClass('inset')] = inset;

    // state className
    // `selected` is an alias of active
    classNames[CLASSNAMES['active']] = active || selected;
    classNames[CLASSNAMES['disabled']] = disabled;

    // shape
    // classNames[constants.CLASSES.radius] = this.props.radius;
    // classNames[constants.CLASSES.round] = this.props.round;

    return classNames;
  }

  Wrapper.prototype.prefixClass = function(subClass) {
    return this.setClassNS() + '-' + subClass;
  }
  
  return Wrapper;
}