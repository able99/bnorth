import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Icon from './Icon';
import ComponentConfig from './config.js';


class List extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    inset: PropTypes.bool,
    separatorInset: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'list',
  }

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      separatorInset,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.separatorInset;
    delete props.inset;

    classSet[this.prefixClass('separator-inset')] = separatorInset;

    // TODO: 使用 ul 可能不是太好的选择，在一些需要定义 component 的场合缺乏灵活性
    return (
      <ul
        {...props}
        className={cx(classSet, className)}
      >
      </ul>
    );
  }
}

class ListItem extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    part: PropTypes.oneOf(['header', 'item']),
    title: PropTypes.node,
    subTitle: PropTypes.node,
    href: PropTypes.string,
    linked: PropTypes.bool, // linked flag for custom href like route Link
    linkComponent: PropTypes.any,
    linkProps: PropTypes.object,
    media: PropTypes.node,
    after: PropTypes.node,
    desc: PropTypes.node,
    nested: PropTypes.oneOf(['input', 'radio', 'checkbox']), // nested field
  }

  static defaultProps = {
    classPrefix: 'item',
    part: 'item'
  }

  renderTitleRow() {
    let {
      title,
      subTitle,
      href,
      linkComponent,
    } = this.props;

    let itemTitle = title ? (
      <div
        key="itemTitle"
        className={cx(this.prefixClass('title'))}
      >
        {title}
      </div>
    ) : null;

    let titleChildren = [
      itemTitle,
      this.renderAddon('after'),
      false && (href || linkComponent) ? (
        <Icon
          className={this.prefixClass('icon')}
          name={ComponentConfig.icons.rightNav}
          key="itemChevron" />
      ) : null,
    ];

    return subTitle ? (
      <div
        className={this.prefixClass('title-row')}
        key="itemTitleRow" >
        {titleChildren}
      </div>
    ) : titleChildren;
  }

  renderMain() {
    let {
      media,
      subTitle,
      desc,
      children
    } = this.props;
    let titleRow = this.renderTitleRow();
    let notJustTitle = media || subTitle || desc || children;

    // remove wrapper if without media/subTitle/children
    return notJustTitle ? (
      <div
        key="itemMain"
        className={this.prefixClass('main')}
      >
        {titleRow}
        {this.renderAddon('subTitle')}
        {this.renderAddon('desc')}
        {children}
      </div>
    ) : titleRow;
  }

  wrapLink(children) {
    let {
      linkComponent,
      linkProps,
      href,
      target,
    } = this.props;

    return linkComponent ?
      React.createElement(linkComponent, linkProps, children) : (
      <a
        href={href}
        target={target}
      >
        {children}
      </a>);
  }

  renderAddon(type) {
    return this.props[type] ? (
      <div
        key={'item-' + type}
        className={this.prefixClass(type.toLowerCase())}
      >
        {this.props[type]}
      </div>
    ) : null;
  }

  renderArray(){
    let {
      href,
      linkComponent,
      flag,
    } = this.props;

    return (
      href || linkComponent ?(
        <Icon
          style={{position: 'relative'}}
          className={this.prefixClass('icon')}
          name={ComponentConfig.icons.rightNav}
          key="itemChevron">
          {flag?(
          <div className={this.prefixClass('flag')}>&bull;</div>)
          :null}
        </Icon>
      ):null
    );
  }

  render() {
    let {
      className,
      part,
      subTitle,
      href,
      children,
      linkComponent,
      linked,
      nested,
      noPadding,
      alignTop,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.title;
    delete props.after;
    delete props.linkProps;
    delete props.desc;
    delete props.flag;
    delete props.media;

    let itemChildren = [
      this.renderAddon('media'),
      this.renderMain(),
      this.renderArray(),
    ];
    let classSet = this.getClassSet();

    classSet[this.prefixClass(nested)] = nested;
    classSet[this.prefixClass('noPadding')] = noPadding;
    classSet[this.prefixClass('align-top')] = alignTop;
    classSet[this.prefixClass('header')] = part === 'header';
    classSet[this.prefixClass('linked')] = href || linkComponent || linked;
    subTitle && (classSet[this.prefixClass('content')] = true);

    return (
      <li
        {...props}
        className={cx(classSet, className)}
      >
        {part === 'header' ? children :
          (href || linkComponent) ? this.wrapLink(itemChildren) : itemChildren}
      </li>
    );
  }
}

List.Item = ClassNameHoc(ListItem);
export default ClassNameHoc(List);
