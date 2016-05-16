import SiteLayout from './components/pages/SiteLayout';
import AppContainer from './containers/AppContainer';

import Splash from './components/pages/Splash';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Welcome from './components/pages/Welcome';
import Settings from './components/pages/Settings';

const addAuthRequirement = ({ location }, replace, callback) => {
  location.state = { requiresAuth: true }; // eslint-disable-line
  callback();
};

const appRoute = {
  path: 'app',
  onEnter: addAuthRequirement,
  component: AppContainer,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'welcome', component: Welcome },
    { path: 'settings', component: Settings },
  ],
};

const routes = [
  {
    path: '/',
    component: SiteLayout,
    indexRoute: { component: Splash },
    childRoutes: [
      { path: 'login', component: Login },
      appRoute,
    ],
  },
];

export default routes;
