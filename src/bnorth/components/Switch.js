import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class Switch extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    name: PropTypes.string,
    amStyle: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'switch',
    onValueChange: () => {},
  }

  getValue() {
    return this.refs.field.checked;
  }

  render() {
    let classSet = this.getClassSet();
    const {
      name,
      className,
      onValueChange,
      value,
      disabled,
      ...props
    } = this.props;

    delete props.classPrefix;

    return (
      <label
        {...props}
        className={cx(classSet, className)}
      >
        <input
          onChange={onValueChange.bind(this)}
          name={name}
          type="checkbox"
          ref="field"
          defaultChecked={value}
          disabled={disabled} />
        <span className={this.prefixClass('label')} />
      </label>
    );
  }
}

export default ClassNameHoc(Switch);
