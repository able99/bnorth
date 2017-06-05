import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';
import Button from './Button';

class Panel extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string,PropTypes.func,PropTypes.element]),
    mode: PropTypes.oneOfType(["ratio","line"]),
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

  renderWithLine() {
    let classSet = this.getClassSet();

    let {
      className,
      children,
      param,
      expand,
      expandText,
      folder,
      folderText,
      block,
      component: Component,
    } = this.props;

    let {
      isFolded,
    } = this.state;

    classSet[this.prefixClass('block')] = block;

    let line = Math.min(Math.ceil(param),3);

    return (
      <Component className={cx(classSet,this.prefixClass('line'),className)}>
        <div className={cx(this.prefixClass('line-content'),isFolded?("text-truncate"+line):null)}>
          {children}
        </div>
        {(expand&&isFolded)||(!isFolded&&folder)?
          <div className={this.prefixClass('line-expand')}>
            <Button link onClick={this.handleOnFolderSwitch.bind(this)}>{isFolded?expandText:folderText}</Button>
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
      param,
      block,
      component: Component,
    } = this.props;

    classSet[this.prefixClass('block')] = block;

    let style = {
      paddingBottom: (param*100)+'%',
    };

    return (
      <Component className={cx(classSet,this.prefixClass('ratio'),className)}>
        <div className={this.prefixClass('ratio-inner')} style={style} >
          <div className={this.prefixClass('ratio-content')}>{children}</div>
        </div>
      </Component>
    )
  }

  renderWithNormal() {
    let classSet = this.getClassSet();

    let {
      className,
      children,
      block,
      component: Component,
    } = this.props;

    classSet[this.prefixClass('block')] = block;

    return (
      <Component className={cx(classSet,this.prefixClass('normal'),className)}>
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
        return this.renderWithNormal();
    }
  }
}

export default ClassNameHoc(Panel);
