import { React } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import ItemPage from './pages/ItemPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import RegistrationPage from './pages/RegistrationPage';
import Order from './pages/Order';

function useRoutes(role) {
  switch (role) {
    case 'USER':
      return (
        <Switch>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/catalog" exact>
            <Shop />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/item/:id">
            <ItemPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/registration" exact>
            <RegistrationPage />
          </Route>
          <Route path="/order/:id">
            <Order/>
          </Route>
          <Redirect to="/catalog" />
        </Switch>
      );
    case 'ADMIN':
      return (
        <Switch>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/catalog" exact>
            <Shop />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/item/:id">
            <ItemPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/registration" exact>
            <RegistrationPage />
          </Route>
          <Route path="/order/:id">
            <Order/>
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      );
    default:
      return (
        <Switch>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/catalog" exact>
            <Shop />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/item/:id">
            <ItemPage />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/registration" exact>
            <RegistrationPage />
          </Route>
          <Route path="/order/:id">
            <Order/>
          </Route>
          <Redirect to="/catalog" />
        </Switch>
      );
  }
}

export default useRoutes;
