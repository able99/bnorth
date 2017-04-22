import React from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Pager = React.createClass({
  mixins: [ClassNameMixin],

  getDefaultProps() {
    return {
      classPrefix: 'pager',
    };
  },

  render() {
    let {
      className,
      children,
    } = this.props;

    return (
      <div className={cx(this.getClassSet(),className)} >
        {children}
      </div>
    );
  },
});

const PagerItem = React.createClass({
  mixins: [ClassNameMixin],

  getDefaultProps() {
    return {
      classPrefix: 'pager',
    };
  },

  render() {
    let classSet = this.getClassSet(true);
    let {
      className,
      children,
      noPadded,
      ...props
    } = this.props;
    const elementName = 'panel';

    delete props.classPrefix;  
    delete props.eventKey;
    delete props.active;
    delete props.noPadded;

    classSet[this.prefixClass(elementName)] = true;
    classSet[this.prefixClass(`${elementName}-no-padded`)] = noPadded;

    return (
      <div key="pager"
        {...props}
        className={cx(classSet, className)}
      >
        {children}
      </div>
    );
  }
});

Pager.Item = PagerItem;

export default Pager;