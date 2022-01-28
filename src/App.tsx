// eslint-disable-next-line no-use-before-define
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConfigurationFunnel from './components/funnels/Configuration.funnel';
import Home from './components/views/home';
import Landing from './components/views/landing/Landing';
import AdminLogin from './components/views/login/AdminLogin';
import UserLogin from './components/views/login/UserLogin';

const App: React.FC = (): JSX.Element => (
  <Router>
    <Switch>
      <Route path="/configuration">
        <ConfigurationFunnel />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/login/admin">
        <AdminLogin />
      </Route>
      <Route path="/login/user">
        <UserLogin />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Router>
);
export default App;
