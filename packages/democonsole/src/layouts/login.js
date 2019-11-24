import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import logo from '../../res/logo.png';
import loginbg from "../../res/loginbg.svg"

let Component = props=>{
  return (
    <Panel bc-square-full bf-backgroundImage={[loginbg, {size: '100% 100%'}]}>
      <Panel bs-margin={80} bc-marginbc-padding-a- bc-text-align-center bc-flex-display-block bc-flex-justify-center bc-flex-align-center b-size="lg"> 
        <Panel component="img" alt="" src={logo} bs-height='1.2em' bc-margin-right-sm bc-border-set-bottom- />
        {process.bnorth.name}
      </Panel>
      <Panel bc-text-align-center bc-overflow-y-auto>
        <Panel bs-width={300} bc-display-inlineblock>{props.children._}</Panel>
      </Panel>
    </Panel>
  )
};


export default Component;