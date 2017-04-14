import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';


//able no margin
let Group = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    header: PropTypes.node,
    footer: PropTypes.node,
    noPadded: PropTypes.bool,
    noMargined: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'group',
      component: 'div'
    };
  },

  renderAddon(role) {
    role = role || 'header';
    return this.props[role] ?
      React.createElement(role, {
        className: this.prefixClass(role)
      }, this.props[role]) : null;
  },

  render() {
    let {
      component: Component,
      className,
      noPadded,
      noMargined,
      ...props,
    } = this.props;
    let classSet = this.getClassSet();

    delete props.classPrefix;
    delete props.header;
    delete props.footer;

    classSet[this.prefixClass('no-padded')] = noPadded;
    classSet[this.prefixClass('no-margined')] = noMargined;

    let bodyClasses = {
      [this.prefixClass('body')]: true,
    };

    return (
      <Component
        {...props}
        className={cx(className, classSet)}
      >
        {this.renderAddon('header')}
        <div className={cx(bodyClasses)}>
          {this.props.children}
        </div>
        {this.renderAddon('footer')}
      </Component>
    );
  }
});

export default Group;
