import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'

export default ()=>{
  return (
    <View>
      <Panel main>
        plugins
        <span dangerouslySetInnerHTML={{__html:'<svg><use xlink:href="#icon-heart"></use></svg>'}}/>
      </Panel>
    </View>
  );
};