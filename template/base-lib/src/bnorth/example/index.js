import React from 'react';
import { render } from 'react-dom'
import { Route,IndexRedirect} from 'react-router';
import { PageHoc,createAppRouter,stateHoc } from '../';

//require('./style_default');
require('../styles/index.scss');

//==============================
// example
//==============================
import APage from './pages/aPage';
const APageRouteParam = {
  key: "a",
  path: "a",
  component: stateHoc()(PageHoc(APage)),
}

import BPage from './pages/bPage';
const BPageRouteParam = {
  key: "b",
  path: "b",
  component: stateHoc()(PageHoc(BPage)),
}

import CPage from './pages/cPage';
const CPageRouteParam = {
  key: "c",
  path: "c",
  component: stateHoc()(PageHoc(CPage)),
}

const TabComponents = {
  taba: APageRouteParam.component,
  tabb: BPageRouteParam.component,
};
const TabARouteParam = {
  key: "taba",
  path: "taba",
  components: TabComponents,
};
const TabBRouteParam = {
  key: "tabb",
  path: "tabb",
  components: TabComponents,
};

import ComponentListPage from './pages/componentListPage';
const ComponentListPageRouteParam = {
  key: "componentlist",
  path: "componentlist",
  container: Object.keys(TabComponents),
  component: stateHoc()(PageHoc(ComponentListPage)),
}

const router = createAppRouter(
  <Route>
    <IndexRedirect key="IndexRedirect" to="componentlist" />
    <Route {...ComponentListPageRouteParam}>
    	<Route {...APageRouteParam} >
    		<Route {...CPageRouteParam} />
    	</Route>
    	<Route {...TabARouteParam} >
    		<Route {...CPageRouteParam} />
    	</Route>
    	<Route {...TabBRouteParam} />
    </Route>
  </Route>
)

//========================
// render
//========================`
let rootElement = document.getElementById('root')
render(router,rootElement);
