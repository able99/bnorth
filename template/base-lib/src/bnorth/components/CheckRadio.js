import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const CheckRadioExterior = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      classPrefix: 'checkradio',
    };
  },

  removeUnknownProp(props) {
    delete props.classPrefix;
    return props;
  },

  render() {
    let {
      //checkbox,
      exteriorClassName,
      exteriorInputClassName,
      exteriorLabelClassName,
    } = this.props;

    return (
      <span className={cx(this.getClassSet(),exteriorClassName)}>
        <span className={cx(this.prefixClass('input'),exteriorInputClassName)} dangerouslySetInnerHTML={{__html: '&#10003'}}></span>
        <span className={cx(this.prefixClass('label'),exteriorLabelClassName)}>{this.props.children}</span>
      </span>
    )
  },
});

const CheckRadio = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      classPrefix: 'checkradio-container',
    };
  },

  render() {
    const {
      name,
      defaultChecked,
      disabled,
      label,
      onChange,
      value,
      checkbox,

      exterior,
      exteriorClassName,
      exteriorInputClassName,
      exteriorLabelClassName,
      //...props
    } = this.props;

    return (
      <label className={cx(this.getClassSet())} >
        <input
          name={name}
          type={checkbox?"checkbox":"radio"}
          value={value}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled} />
        {exterior
        ?<exterior exteriorClassName={exteriorClassName} exteriorInputClassName={exteriorInputClassName} exteriorLabelClassName={exteriorLabelClassName} checkbox>{label}</exterior>
        :<CheckRadioExterior exteriorClassName={exteriorClassName} exteriorInputClassName={exteriorInputClassName} exteriorLabelClassName={exteriorLabelClassName} checkbox>{label}</CheckRadioExterior>}
      </label>
    );
  }
});

export default CheckRadio;
