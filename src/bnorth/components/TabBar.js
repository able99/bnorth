import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from './Icon';
import Badge from './Badge';
import ClassNameHoc from './hoc/ClassNameHoc';

class TabBar extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    component: PropTypes.node,
    amStyle: PropTypes.string,
    onAction: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'tabbar',
    component: 'nav',
    onAction: () => {}
  }

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      children,
      onAction,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.amStyle;

    //able99
    return (
      <Component
        {...props}
        className={cx(classSet, className)}
      >
        {React.Children.map(children, (child, index) => {
          let {
            eventKey,
            onClick,
            ...props
          } = child.props;
          let clickHandler = onClick || onAction;
          let key = eventKey || index;
          eventKey = eventKey || key;

          return (
            child.type.displayName === "TabBarCenterItem" ?(
                child
              ):(
                <TabBar.Item
                  {...props}
                  onClick={clickHandler.bind(null, eventKey)}
                  key={key}
                  eventKey={eventKey} />
              )
          );
        })}
      </Component>
    );
  }
}

class TabBarItem extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    component: PropTypes.any,
    icon: PropTypes.string, // icon name
    src: PropTypes.string, // icon name
    srcSelected: PropTypes.string, // icon name
    title: PropTypes.string,
    href: PropTypes.string,
    eventKey: PropTypes.any,
    badge: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    badgeStyle: PropTypes.string,
    selected: PropTypes.bool, // alias of `active`
    selectedIcon: PropTypes.node, // not supported now
    onAction: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'tabbar',
    component: 'span',
    onAction: () => {},
  }

  renderBadge() {
    let {
      badge,
      badgeStyle,
    } = this.props;

    return badge ? (
      <Badge
        amStyle={badgeStyle || 'alert'}
        rounded
      >
        {badge}
      </Badge>
    ) : null;
  }

  renderIcon() {
    let {
      icon,
      src,
      srcSelected,
      selected,
    } = this.props;

    return icon||src ? (
      <Icon name={icon} amSize="xl" src={selected&&srcSelected?srcSelected:src} key="tabbarIcon">
            {this.renderBadge()}
      </Icon>) : null
  }

  renderTitle() {
    let labelClassName = this.prefixClass('label');
    let {
      title,
    } = this.props;

    return title ? (
      <span
        className={labelClassName}
        key="tabbarTitle"
      >
         {title}
       </span>
    ) : null;
  }

  render() {
    let classSet = this.getClassSet(true);
    let {
      component: Component,
      className,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.badge;
    delete props.badgeStyle;
    delete props.eventKey;
    delete props.onAction;
    delete props.srcSelected;

    Component = this.props.href ? 'a' : Component;

    // TODO: how to display badge when icon not set?

    return (
      <Component
        {...props}
        className={cx(classSet, className, this.prefixClass('item'))}
      >
        {[
          this.renderIcon(),
          this.renderTitle(),
        ]}
      </Component>
    );
  }
}

TabBar.Item = ClassNameHoc(TabBarItem);

export default ClassNameHoc(TabBar);
