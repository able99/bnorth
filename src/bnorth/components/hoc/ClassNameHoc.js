import ComponentConfig from '../config';

const namespace = (ComponentConfig.namespace ? ComponentConfig.namespace + '-' : '');

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
      block,
    } = this.props;

    let prefix = namespace;
    if (this.props.classPrefix) {
      const classPrefix = this.setClassNS();
      prefix = classPrefix + '-';
      !ignorePrefix && (classNames[classPrefix] = true);
    }

    if (amSize) {
      classNames[prefix + amSize] = true;
    }

    if (amStyle) {
      classNames[prefix + amStyle] = true;
    }

    classNames[this.prefixClass('radius')] = radius;
    classNames[this.prefixClass('rounded')] = rounded;
    classNames[this.prefixClass('inset')] = inset;
    classNames[this.prefixClass('block')] = block;
    classNames[this.prefixClass('hollow')] = hollow;
    classNames[ComponentConfig.classnames['active']] = active || selected;
    classNames[ComponentConfig.classnames['disabled']] = disabled;

    return classNames;
  }

  Wrapper.prototype.prefixClass = function(subClass) {
    return this.setClassNS() + '-' + subClass;
  }
  
  return Wrapper;
}