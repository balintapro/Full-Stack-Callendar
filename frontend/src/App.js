import React, { useContext, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import GlobalContext from './context/GlobalContext';
import EventModal from './event/components/EventModal';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './style.css';
const Auth = React.lazy(() => import('./user/pages/Auth'));
const Calendar = React.lazy(() => import('./event/pages/Calendar'));

function App() {

  // Az átláthatóság miatt érdemes lenne a react komponenseket .jsx kiterjesztéssel használni a többi helper stb maradhat sima js
  // git-et használd többet, most 3 kommit van, de biztos rengeteget dolgoztál ezzel, nézz rá erre, hogyan érdemes https://www.conventionalcommits.org/en/v1.0.0/
  // ebben a stílusban ment az én kommitom is msot. :)
  // vsCode-hoz meg ott a git graph és gyönyörűen látni fogod mi hol van

  // Nagy naptárt állítja, Modelt állítja
  const { showEventModal } = useContext(GlobalContext);
  // ide kell a token még
  const { login, logout, userId, token } = useAuth();

  let authSwitch = true;
  let routes;

  /*
  use authSwitch to test different routes: possible values: true, false, "token"
  FOR THE REAL USING HERE YOU MUST WRITE "token" IN IF STATEMENT
  IF YOU WANT SEE THE AUTH PAGE WRITE "false" IN TEST MODE
  IF YOU WANT SEE THE CALENDAR PAGE WRITE "false" IN TEST MODE

  majd nézd meg, valami ilyen megoldás praktikusabb lehet

  */

  if (authSwitch === true) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Calendar />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else if (authSwitch === false) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else if (authSwitch === "token") {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
        <Redirect to="/" />
      </Switch>
    );
  }

  useEffect(() => {
    let size = window.innerHeight / 12;
    let modalsize = size / 3;
    let r = document.querySelector(':root');

    r.style.setProperty('--screen', `${size}px`);
    r.style.setProperty('--modal', `${modalsize}px`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div id="content-grid">
          <MainNavigation />
          {showEventModal && <EventModal />}

          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner></LoadingSpinner>
              </div>
            }
          >
            {routes}
          </Suspense>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
