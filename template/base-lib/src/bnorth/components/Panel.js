import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Button from './Button';

class Panel extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    mode: PropTypes.oneOf(["ratio","line"]),
    param: PropTypes.number,
    expand: PropTypes.bool,
    expandText: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    folder: PropTypes.bool,
    folderText: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
  }

  static defaultProps = {
    classPrefix: 'panel',
    component: 'div',
    mode: null,
    param: 1,
    expand: false,
    expandText: '>>',
    folder: false,
    folderText: '<<',
  }

  constructor(props) {
    super(props);
    this.state = {
      isFolded: true,
    };
  }

  handleOnFolderSwitch() {
    let {
      isFolded,
    } = this.state;

    this.setState({isFolded:!isFolded});
  }

  removeUnknownProps(props) {
    delete props.classPrefix;
    delete props.expand;
    delete props.expandText;
    delete props.folder;
    delete props.folderText;
    delete props.param;
    return props;
  }

  renderWithLine() {
    let classSet = this.getClassSet();

    let {
      className,
      children,
      containerStyle,
      containerClassName,
      param,
      expand,
      expandText,
      folder,
      folderText,
      block,
      linked,
      component: Component,
      ...props,
    } = this.props;

    let {
      isFolded,
    } = this.state;

    let line = Math.min(Math.ceil(param),3);

    return (
      <Component 
        className={cx(classSet,this.prefixClass('line'),containerClassName,{[this.prefixClass('linked')]:linked||this.props.onClick})} 
        style={containerStyle}
      >
        <div 
          className={cx(
            this.prefixClass('line-content'),
            isFolded?("text-truncate"+line):null,
            className
          )}
          {...this.removeUnknownProps(props)}
        >
          {children}
        </div>
        {(expand&&isFolded)||(!isFolded&&folder)?
          <div className={this.prefixClass('line-expand')}>
            <Button plain onClick={this.handleOnFolderSwitch.bind(this)}>{isFolded?expandText:folderText}</Button>
          </div>
        :null}
      </Component>
    )
  }

  renderWithRatio() {
    let classSet = this.getClassSet();

    let {
      className,
      children,
      containerStyle,
      containerClassName,
      param,
      block,
      linked,
      component: Component,
      ...props,
    } = this.props;

    let styleInner = {
      paddingBottom: (param*100)+'%',
    };

    return (
      <Component 
        className={cx(classSet,this.prefixClass('ratio'),containerClassName,{[this.prefixClass('linked')]:linked||this.props.onClick})} 
        style={containerStyle}
      >
        <div 
          className={cx(this.prefixClass('ratio-inner'))} 
          style={styleInner} 
        >
          <div 
            className={cx(this.prefixClass('ratio-content'),className)}
            {...this.removeUnknownProps(props)}
          >
            {children}
          </div>
        </div>
      </Component>
    )
  }

  renderWithCustom() {
    let classSet = this.getClassSet();

    let {
      className,
      children,
      block,
      linked,
      component: Component,
      ...props,
    } = this.props;

    classSet[this.prefixClass('block')] = block;

    return (
      <Component className={cx(classSet,this.prefixClass('custom'),className,{[this.prefixClass('linked')]:linked||this.props.onClick})} {...this.removeUnknownProps(props)}>
        {children}
      </Component>
    )
  }

  render() {
    let {
      mode
    } = this.props;

    switch(mode){
      case 'line':
        return this.renderWithLine();
      case 'ratio':
        return this.renderWithRatio();
      default:
        return this.renderWithCustom();
    }
  }
}

export default ClassNameHoc(Panel);
