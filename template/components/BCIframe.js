import React from 'react';
import PropTypes from 'prop-types';

class BCIframe extends React.Component {
  static propTypes = {
    mode: PropTypes.oneOf(['embed', 'request']),
    autoSize: PropTypes.bool,
  }

  static defaultProps = {
    frameBorder:"no",
    marginWidth: "0", 
    marginHeight: "0",
    scrolling: "yes",  
    width: '100%',
    height: '100%',

    mode: 'embed',
    autoSize: false,
  }

  updateIframe(src) {
    if(this.props.mode === 'embed'){
      if(!this.refs.iframe)return;

      this.refs.iframe.src = this.props.src;

      if(this.props.autoSize){
        this.refs.iframe.onload = ()=>{
          this.refs.iframe.height = this.refs.iframe.contentWindow.document.body.scrollHeight;
        }
      }
    }else if(this.props.mode === 'request'){
      fetch(src)
      .then((res)=>{
        if (res.ok) {
          return res.text();
        }
      })
      .then((result)=>{
        if(!this.refs.iframe)return;

        if(this.props.autoSize){
          let style = "* {margin: 0;padding: 0;} body {overflow:auto;background:#ffffff;color:#959595;font-size:14px;} img {max-width: 100%;min-width: 100%;height: auto;width: auto;border: none;}";
          result=result.replace(/(<style .*>)[.\s\S]*(<\/style>[\s\S]*<\/head>)/,"$1"+style+"$2")
        }

        this.refs.iframe.contentWindow.document.write(result?result:"");

        if(this.props.autoSize){
          let counter = 0;
          let timer = window.setInterval(()=>{
            if(!this.refs.iframe || ++counter>300){
              clearInterval(timer);
              return;
            }
            let curFrameHeight = this.refs.iframe.contentWindow.document.body.scrollHeight;
            let curHeight = this.refs.iframe.height;
            if(curFrameHeight!==curHeight){
              this.refs.iframe.height = curFrameHeight;
            }
          },200);
        }
      })
      .catch((error)=>{
        this.refs.iframe.contentWindow.document.write('');
      })
    }else{
      
    }
  }

  componentDidMount() {
    if(this.props.src)this.updateIframe(this.props.src);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.src && (this.props.src !== nextProps.src)){
      this.updateIframe(nextProps.src);
      return true;
    }else{
      return false;
    }
    return;
    if(nextProps.src && (this.props.src !== nextProps.src)){
      fetch(nextProps.src)
      .then((res)=>{
        if (res.ok) {
          return res.text();
        }
      })
      .then((result)=>{
        if(!this.refs.iframe)return;
        let style = "* {margin: 0;padding: 0;} body {overflow:auto;background:#ffffff;color:#959595;font-size:14px;} img {max-width: 100%;min-width: 100%;height: auto;width: auto;border: none;}";
        result=result.replace(/(<style .*>)[.\s\S]*(<\/style>[\s\S]*<\/head>)/,"$1"+style+"$2")
        this.refs.iframe.contentWindow.document.write(result?result:"");

        let counter = 0;
        let timer = window.setInterval(()=>{
          if(!this.refs.iframe || ++counter>300){
            clearInterval(timer);
            return;
          }
          let curFrameHeight = this.refs.iframe.contentWindow.document.body.scrollHeight;
          let curHeight = this.refs.iframe.height;
          if(curFrameHeight!==curHeight){
            this.refs.iframe.height = curFrameHeight;
          }
        },200);
      })
      .catch((error)=>{
        this.refs.iframe.contentWindow.document.write('');
      })
      return true;
    }
    return false;
  }
  render() {
    let {
      ...props
    } = this.props;
    if(this.props.autoSize){
      props.scrolling = "no";
    }
    delete props.src;
    delete props.autoSize;
    delete props.mode;

    return (
      <iframe 
        {...props} 
        ref="iframe" />
    );
  }
}

export default BCIframe;
