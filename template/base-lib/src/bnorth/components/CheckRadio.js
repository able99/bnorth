import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Icon from './Icon';
import ComponentConfig from './config.js';

class CheckRadio extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    amStyle: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    contentOn: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    contentOff: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
  }

  static defaultProps = {
    classPrefix: 'check-radio',
    type: 'radio',
  }

  render() {
    let classSet = this.getClassSet();
    const {
      name,
      type,
      className,
      label,
      value,
      defaultValue,
      disabled,
      children,
      contentOn,
      contentOff,
      onChange,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.amStyle;
    delete props.amSize;
    delete props.underline;
    delete props.hollow;
    delete props.block;
    delete props.active;
    delete props.rounded;

    return (
      <label {...props} className={cx(classSet, className)} onClick={this.props.onClick||((e)=>{e.stopPropagation()})}>
        <input
          name={name}
          type={type}
          onChange={onChange}
          checked={value}
          defaultChecked={defaultValue}
          disabled={disabled} />
        {label?label:children}
        <span className={this.prefixClass('content')}>
          <span className={this.prefixClass('on')}>
            {contentOn?React.cloneElement(contentOn,{onClick:(e)=>e.target.parentElement.click()}):<Icon name={ComponentConfig.icons.check} className={this.prefixClass('default')} />}
          </span>
          <span className={this.prefixClass('off')}>
            {contentOff?React.cloneElement(contentOff,{onClick:(e)=>e.target.parentElement.click()}):<Icon name={ComponentConfig.icons.check} className={this.prefixClass('default')} />}
          </span>
        </span>
      </label>
    );
  }
}

export default ClassNameHoc(CheckRadio);
