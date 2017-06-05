import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Icon from './Icon';

class CheckRadio extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    amStyle: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    contentOn: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    contentOff: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
  }

  static defaultProps = {
    classPrefix: 'check-radio',
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
      <label {...props} className={cx(classSet, className)} >
        <input
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled} />
        {label?label:children}
        <span className={this.prefixClass('content')}>
          <span className={this.prefixClass('on')}>
            {contentOn?contentOn:<Icon name="check" className={this.prefixClass('default')} />}
          </span>
          <span className={this.prefixClass('off')}>
            {contentOff?contentOff:<Icon name="check" className={this.prefixClass('default')} />}
          </span>
        </span>
      </label>
    );
  }
}

export default ClassNameHoc(CheckRadio);
