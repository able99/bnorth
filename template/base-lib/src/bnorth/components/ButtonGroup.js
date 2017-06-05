import React, {cloneElement} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ClassNameHoc from './hoc/ClassNameHoc';

class ButtonGroup extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    amStyle: PropTypes.string,
    amSize: PropTypes.string,
    hollow: PropTypes.bool,
    justify: PropTypes.bool,
    stacked: PropTypes.bool,
    split: PropTypes.bool,
  }

  static defaultProps = {
    classPrefix: 'btn-group',
  }

  renderGroup() {
    let {
      amStyle,
      amSize,
      hollow,
      split,
    } = this.props;

    let ret = [];
    (Array.isArray(this.props.children)?this.props.children:[this.props.children]).forEach((v,i)=>{
      if(i>0 && split) ret.push(<span key={'split'+i} className={this.prefixClass('split')} />);
      ret.push(
        cloneElement(v, Object.assign({
          key: 'button'+i,
          amStyle,
          amSize,
          hollow,
        }, v.props ))
      )
    });
    return ret;
  }

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      stacked,
      justify,
      ...props
    } = this.props;

    delete props.classPrefix;
    delete props.split;

    classSet[this.prefixClass('stacked')] = stacked;
    classSet[this.prefixClass('justify')] = justify;

    return (
      <div
        {...props}
        className={cx(className, classSet)}
      >
        {this.renderGroup()}
      </div>
    );
  }
}

export default ClassNameHoc(ButtonGroup);
