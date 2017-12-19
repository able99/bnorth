import React from 'react';
import { Route } from 'bnorth/lib/base/router';


export default (
  <Route>
    <Route 
      key='/'
      title='首页'
      component={require('./pages/home')}
      container={require('./pages/_home')} >
    </Route>
  </Route>
)