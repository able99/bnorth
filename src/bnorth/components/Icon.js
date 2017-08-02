import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Icon extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    name: PropTypes.string,
    src: PropTypes.string,
    href: PropTypes.string,
    // amStyle: PropTypes.string,
    // button: PropTypes.bool,
    // size: PropTypes.string,
  }

  static defaultProps = {
    classPrefix: 'icon',
    component: 'span'
  }

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      style,
      name,
      src,
      children,
      containerStyle,
      containerClassName,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.amSize;
    delete props.amStyle;
    delete props.hollow;
    delete props.rounded;

    Component = props.href ? 'a' : Component;
    if(name) classSet[this.prefixClass(name)] = true;
    if(src) classSet[this.prefixClass('img')] = src;

    if(src){
      return (
        <Component
          className={cx(containerClassName||className, 'layout-h-start-center', 'layout-flex-inline')}
          style={containerStyle||style}
        >
          <img {...props} alt="" src={src} style={style} className={cx(classSet, className)} />
          {children}
        </Component>
      );
    }else{
      return (
        <Component
          {...props}
          className={cx(classSet, className)}
          style={style}
        >
          {children}
        </Component>
      );
    }
  }
}

export default ClassNameHoc(Icon);
