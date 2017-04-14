import React, {
  PropTypes,
} from 'react';
import cx from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import Icon from './Icon';


const List = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    inset: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'list',
    };
  },

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      inset,
      ...props
    } = this.props;

    delete props.classPrefix;

    classSet[this.prefixClass('inset')] = inset;

    // TODO: 使用 ul 可能不是太好的选择，在一些需要定义 component 的场合缺乏灵活性
    return (
      <ul
        {...props}
        className={cx(classSet, className)}
      >
      </ul>
    );
  }
});

const ListItem = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['header', 'item']),
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
  },

  getDefaultProps() {
    return {
      classPrefix: 'item',
      role: 'item'
    };
  },

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
          name="right-nav"
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
  },

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
  },

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
  },

  renderAddon(type) {
    return this.props[type] ? (
      <div
        key={'item-' + type}
        className={this.prefixClass(type.toLowerCase())}
        style={type==="media"?{alignSelf: 'flex-start'}:null}
      >
        {this.props[type]}
      </div>
    ) : null;
  },

  renderArray(){
    let {
      href,
      linkComponent,
      flag,
    } = this.props;

    let unreadStyle = {
      position: 'absolute',
      marginTop: '-250%',
      width: '100%',
      textAlign: 'center',
    };

    return href || linkComponent ?(
        <Icon
          style={{position: 'relative'}}
          className={this.prefixClass('icon')}
          name="right-nav"
          key="itemChevron">
          {flag?(<div style={unreadStyle} className="text-alert typo-size-xxl">&bull;</div>):null}
        </Icon>
    ):null;
  },

  render() {
    let {
      className,
      role,
      subTitle,
      href,
      //media,
      children,
      linkComponent,
      linked,
      nested,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.title;
    delete props.after;
    delete props.linkProps;
    delete props.desc;
    delete props.flag;

    let itemChildren = [
      this.renderAddon('media'),
      this.renderMain(),
      this.renderArray(),
    ];
    let classSet = this.getClassSet();

    classSet[this.prefixClass(nested)] = nested;
    classSet[this.prefixClass('header')] = role === 'header';
    classSet[this.prefixClass('linked')] = href || linkComponent || linked;
    subTitle && (classSet[this.prefixClass('content')] = true);

    return (
      <li
        {...props}
        className={cx(classSet, className)}
      >
        {role === 'header' ? children :
          (href || linkComponent) ? this.wrapLink(itemChildren) : itemChildren}
      </li>
    );
  }
});

List.Item = ListItem;

export default List;

/**
 * TODO:
 * - 可选择列表（嵌套 radio/checkbox）图文混排的列表，
 *   考虑的创建可选择列表时根据 nested 属性自动生产 input，而不用再去嵌套 Field，
 *   以便图文混排选择实现。
 * - UE：用户如何知道这个列表是可以选择的（增加相应的提示文字？）
 * - 易用性：链接如何以更好的方式传入类似 react-router Link 这样的组件？
 */
