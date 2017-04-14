import React from 'react';
import { Route,IndexRedirect} from 'react-router';

//========================
// route
//========================

import { AppRouterCreator } from '../bnorth/app/app';

import HomePage from './homePage';
import HomeContainer from './homeContainer';


const routers = [
  <IndexRedirect key="IndexRedirect" to="home" />,
  <Route key="home" path="home" component={HomeContainer(HomePage)}>
  </Route>,
];



export default AppRouterCreator(routers);

