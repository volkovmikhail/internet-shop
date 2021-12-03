import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import ItemPage from './pages/ItemPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';

function useRoutes(role) {
  switch (role) {
    case 'USER':
      console.log('user');
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
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Redirect to="/catalog" />
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
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Redirect to="/catalog" />
        </Switch>
      );
  }
}

export default useRoutes;
