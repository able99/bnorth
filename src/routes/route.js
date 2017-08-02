import React from 'react';
import { Route,IndexRedirect} from 'react-router';
import { createRouteProps } from '../bnorth';


const subs = {
  main: createRouteProps('main',{prefix:'mobile/main/'}).component,
  person: createRouteProps('person',{prefix:'mobile/person/'}).component,
};


export default (
  <Route>
    <IndexRedirect to="home" />
    <Route {...createRouteProps('login',{prefix:'mobile/login/'})}>
      <Route {...createRouteProps('resister',{prefix:'mobile/login/'})} />
      <Route {...createRouteProps('forget',{prefix:'mobile/login/'})} />
    </Route>

    <Route {...createRouteProps('home',{prefix:'mobile/home/',subs: subs, container:true})}>
      <IndexRedirect to="main" />
      <Route {...createRouteProps('main',{prefix:'mobile/main/',components: subs})}> </Route>
      <Route {...createRouteProps('person',{prefix:'mobile/person/',components: subs})}> </Route>
    </Route>
  </Route>
)
