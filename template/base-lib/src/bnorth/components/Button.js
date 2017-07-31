import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Button extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    href: PropTypes.string,
    target: PropTypes.string,
    amStyle: PropTypes.string,
    amSize: PropTypes.string,
    hollow: PropTypes.bool,
    plain: PropTypes.bool,
    underline: PropTypes.bool,
    block: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    radius: PropTypes.bool,
    rounded: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'btn',
  }

  removeUnknownProp(props) {
    delete props.classPrefix;
    delete props.amStyle;
    delete props.amSize;
    delete props.underline;
    delete props.plain;
    delete props.hollow;
    delete props.block;
    delete props.active;
    delete props.rounded;

    return props;
  }

  renderAnchor(classes) {
    let {
      href,
      component: Component,
      children,
      ...props
    } = this.props;
    Component = Component || 'a';

    href = href || '#';

    return (
      <Component
        {...this.removeUnknownProp(props)}
        
        className={cx(classes)}
        role="button"
      >
        {children}
      </Component>
    );
  }

  renderButton(classes) {
    let {
      component: Component,
      children,
      ...props,
    } = this.props;
    Component = Component || 'button';

    return (
      <Component
        {...this.removeUnknownProp(props)}
        className={classes}
      >
        {children}
      </Component>
    );
  }

  render() {
    let classSet = this.getClassSet();
    let {
      href,
      target,
      block,
      className,
      underline,
      plain,
    } = this.props;
    let renderType = href || target ? 'renderAnchor' : 'renderButton';

    classSet[this.prefixClass('block')] = block;
    classSet[this.prefixClass('underline')] = underline;
    classSet[this.prefixClass('plain')] = plain;

    return this[renderType](cx(classSet, className));
  }
}

export default ClassNameHoc(Button);
