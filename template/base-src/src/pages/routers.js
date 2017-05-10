import React from 'react';
import { Route,IndexRedirect} from 'react-router';

import { Config,ActionWraps,Actions,Apis,createAppRouter,createDefaultConnect,HookRouteCheckLogin } from '../bnorth/';

//========================
// hook
//========================
//========================
// config
Config.BaseUrl = 'http://127.0.0.1:8080/';

//========================
// style
//========================
require('../style/style');


//========================
// route
//========================
//==========================
// login
import LoginPage from './loginPage';
const LoginPageRouteParam = {
  key: "login",
  path: "login",
  component: createDefaultConnect(
    function(){
      let Wraps = [
        ActionWraps.actionsDataWrap('login',{
          initData: {
            userName: '',
            userPwd: '',
          },
        }),
      ];

      return{
        Wraps,
      }
    }
  )(LoginPage),
}

//==========================
// admin setting
import SettingPage from './settingPage';
const SettingRouteParam = {
  key: "setting",
  path: "setting",
  onEnter: HookRouteCheckLogin,
  component: createDefaultConnect()(SettingPage),
}

//==========================
// user home
import HomePage from './homePage';
const HomePageRouteParam = {
  key: "home",
  path: "home",
  component: createDefaultConnect()(HomePage),
}



//==========================
// route level
const route = (
<Route>
  <IndexRedirect key="IndexRedirect" to='home' />
  <Route {...LoginPageRouteParam}/>

  <Route {...HomePageRouteParam} >
  </Route>  
</Route>
)

export default createAppRouter(route);

