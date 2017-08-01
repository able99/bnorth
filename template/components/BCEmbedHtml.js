import React from 'react';

class BCEmbedHtml extends React.Component {
  static propTypes = {
    
  }

  static defaultProps = {
    frameBorder:"no",
    marginWidth: "0", 
    marginHeight: "0",
    scrolling: "no",  
    width: '100%',
    height: '100%',
  }

  shouldComponentUpdate(nextProps, nextState) {
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
    delete props.src;

    return (
      <iframe 
        {...props} 
        ref="iframe" />
    );
  }
}

export default BCEmbedHtml;
