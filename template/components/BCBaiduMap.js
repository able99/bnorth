import React from 'react';

function installPlayerScript({ context, onLoadCallback, scriptSrc, uniqueScriptId }) {
  const jwPlayerScript = context.createElement('script');
  jwPlayerScript.id = uniqueScriptId;
  jwPlayerScript.src = scriptSrc;
  jwPlayerScript.onload = onLoadCallback;

  context.head.appendChild(jwPlayerScript);
}

function getCurriedOnLoad(existingScript, callback) {
  const previousOnload = existingScript.onload || (() => {});
  const curriedOnLoad = () => {
    previousOnload();
    callback();
  };

  return curriedOnLoad;
}

class Marker  extends React.Component {
  render() {
    return null;
  }
}

class BCBaiduMap extends React.Component {
  static propTypes = {
    
  }

  static defaultProps = {
    containerId: 'baidu-map-container',
    scriptId: 'baidu-map-script',
    scriptSrc: 'http://api.map.baidu.com/getscript?v=2.0&services=&t=20170717103214&ak=',
    lisence: 'm5XE4QTL8tKQPTY9mZc47h9hNFGIXEjH',
    centerX: 123.38,
    centerY: 41.80,
    zoom: 14,
  }

  constructor(props) {
    super(props);

    this.state = {
    };

    this.overlays = {};
    this.centerX = 0;
    this.centerY = 0;
    this.zoom = 0;
    this.loadRetry = 10;
  }

  componentDidMount() {
    const isScriptLoaded = !!window.BMap;
    if (isScriptLoaded) {
      this._initialize();
      return;
    }

    const existingScript = document.getElementById(this.props.scriptId);

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: this._initialize.bind(this),
        scriptSrc: this.props.scriptSrc+this.props.lisence,
        uniqueScriptId: this.props.scriptId,
      });
    } else {
      existingScript.onload = getCurriedOnLoad(existingScript, this._initialize.bind(this));
    }
  }

  _initialize() {
    if(!window.BMap){
      if(this.loadRetry--)setTimeout(()=>this._initialize(),500);
      return;
    }
    this.bmap = window.BMap;
    this.map = new window.BMap.Map(this.props.containerId);

    this.initialize();
  }

  initialize() {
    this.renderMap();
    this.renderOverlay();
  }

  renderMap() {
    if(this.props.centerX!==this.centerX||this.props.centerY!==this.centerY||this.props.zoom!==this.zoom){
      let loc = [this.props.centerX, this.props.centerY];
      let bpoint = new this.bmap.Point(loc[0],loc[1]);
      this.map.centerAndZoom(bpoint, this.props.zoom);

      this.centerX = this.props.centerX;
      this.centerY = this.props.centerY;
      this.zoom = this.props.zoom;
    }
  }

  renderOverlay() {
    if(!this.map) return;
    let overlays = Array.isArray(this.props.children)?this.props.children:[this.props.children];

    Object.keys(this.overlays).forEach((v)=>{
      if(!overlays.find((vv)=>{return v===vv.key})){
        this.map.removeOverlay(this.overlays[v]); 
        delete this.overlays[v];   
      }
    });

    overlays.forEach((v)=>{
      if(this.overlays[v.key]) return;
      if(v.type===Marker){
        let overlay = this.renderMarker(v.key,v);
        if(overlay) this.overlays[v.key] = overlay;
      }
    });
  }

  renderMarker(key,item) {
    if(!item.props.x||!item.props.y)return;
    let marker = new this.bmap.Marker(new this.bmap.Point(item.props.x, item.props.y),{title: item.props.title});
    marker.addEventListener("click", ()=>{     
     item.props.onClick&&item.props.onClick();
    });
    this.map.addOverlay(marker);
    return marker;
  }

  render() {
    this.renderOverlay();

    return (
      <div className={this.props.className}  style={this.props.style} id={this.props.containerId} />
    );
  }
}

BCBaiduMap.Marker = Marker;

export default BCBaiduMap;
