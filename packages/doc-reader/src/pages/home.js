import React from 'react';
import View from '@bnorth/components/lib/View';
import Panel from '@bnorth/components/lib/Panel';
import Menu from '../components/menu';
import Md from '../components/md';
import Json from '../components/json';


let Component = props=>{
  let { app, stateData, stateRaw } = props;
  return (
    <View bc-bg-color-white bc-padding-a->
      <Panel main>
        {stateData.type==='menu'?<Menu app={app} data={stateRaw}/>:null}
        {stateData.type==='md'?<Md app={app} data={stateRaw}/>:null}
        {stateData.type==='json'?<Json app={app} data={stateRaw}/>:null}
      </Panel>
    </View>
  )
}

Component.controller = (app,page)=>{
  let { route:{params:{src}} } = page.props;
  let url = '../data/';
  let type;

  if(src&&src.endsWith('.md')) {
    type = 'md';
    url += src;
  }else if(src&&src.endsWith('.json')) {
    type = 'json';
    url += src;
  }else {
    type = 'menu';
    url += 'menu.json';
  }
  
  return {
    stateData: {
      initialization: {
        type
      },
    },
    stateRaw: {
      initialization: '',
      options: {responseType: 'text'},
      fetchOnStart: true,
      state: app.Request,
      url,
    }
  }
}

export default Component;