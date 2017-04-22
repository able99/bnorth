import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Pager from './Pager';

const Tabs = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    activeKey: PropTypes.any,
    defaultActiveKey: PropTypes.any,
    onAction: PropTypes.func,
    inset: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'tabs',
    };
  },

  getInitialState() {
    return {
      activeKey: this.getDefaultActiveKey(),
      previousActiveKey: null
    };
  },

  componentWillReceiveProps(nextProps) {
    let nextActiveKey = nextProps.activeKey;

    // update controlled Tabs' state
    if (nextActiveKey != null && nextActiveKey !== this.props.activeKey) {
      this.setState({
        activeKey: nextActiveKey,
        previousActiveKey: this.props.activeKey
      });
    }
  },

  getDefaultActiveKey(children) {
    let defaultActiveKey = this.props.defaultActiveKey;

    if (defaultActiveKey != null) {
      return defaultActiveKey;
    }

    React.Children.forEach(children, function(child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey != null ? defaultActiveKey : 0;
  },

  getActiveKey() {
    return this.props.activeKey != null ?
      this.props.activeKey : this.state.activeKey;
  },

  handleClick(key, disabled, e) {
    e.preventDefault();
    let activeKey = this.state.activeKey;

    if (disabled) {
      return;
    }

    if (this.props.onAction) {
      this.props.onAction(key);
    }

    // uncontrolled
    if (this.props.activeKey == null && activeKey !== key) {
      this.setState({
        activeKey: key,
        previousActiveKey: activeKey
      });
    }
  },

  renderNav() {
    let activeKey = this.getActiveKey();

    let navs = React.Children.map(this.props.children, (child, index) => {
      let {
        eventKey,
        disabled,
        navSize,
        navStyle,
      } = child.props;
      let key = index;

      eventKey = eventKey !== undefined ? eventKey : index;
      let active = eventKey === activeKey;

      return (
        <Button
          ref={'tabNav' + key}
          key={key}
          onClick={this.handleClick.bind(this, key, disabled)}
          active={active}
          disabled={disabled}
          className={active ? 'active' : null}
          amSize={navSize}
          amStyle={navStyle || 'primary'}
          underline
        >
          {child.props.title}
        </Button>
      );
    });

    return (
      <ButtonGroup
        className={this.prefixClass('nav')}
        justify
      >
        {navs}
      </ButtonGroup>
    )
  },

  renderTabPanels() {
    let activeKey = this.getActiveKey();
    let panels = React.Children.map(this.props.children, (child, index) => {
      let {
        eventKey,
        children,
        ...props
      } = child.props;

      if (eventKey === undefined) {
        eventKey = index;
      }

      return (
        <Pager.Item
          active={eventKey === activeKey}
          eventKey={eventKey}
          key={'tabPanel' + index}
          {...props}
        >
          {children}
        </Pager.Item>
      );
    });

    return (
      <Pager>
        {panels}
      </Pager>
    )
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.activeKey;
    delete props.defaultActiveKey;
    delete props.inset;
    delete props.onAction;

    return (
      <div
        {...props}
        className={cx(classSet, className)}
      >
        {this.renderNav()}
        {this.renderTabPanels()}
      </div>
    );
  }
});

Tabs.Item = Pager.Item;

export default Tabs;