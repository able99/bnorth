import React from 'react';
import { Route,IndexRedirect} from 'react-router';
import { createRouteProps } from './bnorth';


const subs = {
  main: createRouteProps('main',{prefix:'mobile/main/'}).component,
  pool: createRouteProps('pool',{prefix:'mobile/pool/'}).component,
  leagues: createRouteProps('leagues',{prefix:'mobile/league/'}).component,
  services: createRouteProps('services',{prefix:'mobile/service/'}).component,
  person: createRouteProps('person',{prefix:'mobile/person/'}).component,
};

const details = [
  <Route {...createRouteProps('article/:article',{prefix:'mobile/pool/'})} />,
  <Route {...createRouteProps('pioneer/:pioneer',{prefix:'mobile/pool/'})} />,
  <Route {...createRouteProps('league/:league',{prefix:'mobile/league/'})} />,
  <Route {...createRouteProps('service/:service',{prefix:'mobile/service/'})} />,
  <Route {...createRouteProps('enterprise/:enterprise',{prefix:'mobile/enterprise/'})} />,
  <Route {...createRouteProps('tutor/:tutor',{prefix:'mobile/tutor/'})} />,
  <Route {...createRouteProps('roadshow/:roadshow',{prefix:'mobile/roadshow/'})} />,
  <Route {...createRouteProps('activity/:activity',{prefix:'mobile/activity/'})} />,
];


export default (
  <Route>
    <IndexRedirect to="home" />
    <Route {...createRouteProps('login',{prefix:'mobile/login/'})}>
      <Route {...createRouteProps('resister',{prefix:'mobile/login/'})} />
      <Route {...createRouteProps('forget',{prefix:'mobile/login/'})} />
    </Route>

    <Route {...createRouteProps('home',{prefix:'mobile/home/',subs: subs, container:true})}>
    	<IndexRedirect to="main" />
    	<Route {...createRouteProps('main',{prefix:'mobile/main/',components: subs})}>
        {details}
      </Route>

      <Route {...createRouteProps('pool',{prefix:'mobile/pool/',components: subs})}>
        <Route {...createRouteProps('article/:article',{prefix:'mobile/pool/'})} />
        <Route {...createRouteProps('pioneer/:pioneer',{prefix:'mobile/pool/'})} />
        <Route {...createRouteProps('talent/:talent',{prefix:'mobile/pool/'})} public />
      </Route>

      <Route {...createRouteProps('leagues',{prefix:'mobile/league/',components: subs})}>
        <Route {...createRouteProps('league/:league',{prefix:'mobile/league/'})} />
      </Route>

      <Route {...createRouteProps('services',{prefix:'mobile/service/',components: subs})}>
         <Route {...createRouteProps('service/:service',{prefix:'mobile/service/'})} />
      </Route>

    	<Route {...createRouteProps('person',{prefix:'mobile/person/',components: subs})}>
        <Route {...createRouteProps('memberinfo',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('person-info',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('password',{prefix:'mobile/login/'})} />
        <Route {...createRouteProps('mytalent',{prefix:'mobile/person/'})}>
          <Route {...createRouteProps('talent/:talent',{prefix:'mobile/pool/'})} />
        </Route>
        <Route {...createRouteProps('myrecruit',{prefix:'mobile/person/'})}>
          <Route {...createRouteProps('applyrecruit/:applyrecruit',{prefix:'mobile/person/'})} />
        </Route>
        <Route {...createRouteProps('news',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('credit',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('mytutor',{prefix:'mobile/person/'})}>
          <Route {...createRouteProps('tutor/:tutor',{prefix:'mobile/tutor/'})} />
        </Route>
        <Route {...createRouteProps('favorite',{prefix:'mobile/person/'})}>
          {details}
        </Route>
        <Route {...createRouteProps('myapply',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('myapplys',{prefix:'mobile/person/'})}>
          <Route {...createRouteProps('recruit/:recruit',{prefix:'mobile/recruit/'})} />
        </Route>
        <Route {...createRouteProps('myproject',{prefix:'mobile/person/'})} />
        <Route {...createRouteProps('mypioneer',{prefix:'mobile/person/'})} />
      </Route>
    </Route>

    <Route {...createRouteProps('enterprises',{prefix:'mobile/enterprise/'})}>
      <Route {...createRouteProps('enterprise/:enterprise',{prefix:'mobile/enterprise/'})} />
    </Route>
    <Route {...createRouteProps('tutors',{prefix:'mobile/tutor/'})}>
      <Route {...createRouteProps('tutor/:tutor',{prefix:'mobile/tutor/'})} />
    </Route>
    <Route {...createRouteProps('roadshows',{prefix:'mobile/roadshow/'})}>
      <Route {...createRouteProps('roadshow/:roadshow',{prefix:'mobile/roadshow/'})} />
    </Route>
    <Route {...createRouteProps('activitys',{prefix:'mobile/activity/'})}>
      <Route {...createRouteProps('activity/:activity',{prefix:'mobile/activity/'})} />
    </Route>
    <Route {...createRouteProps('recruits',{prefix:'mobile/recruit/'})}>
      <Route {...createRouteProps('recruit/:recruit',{prefix:'mobile/recruit/'})} public />
    </Route>

    <Route {...createRouteProps('league/:league',{prefix:'mobile/league/'})} />
  </Route>
)
