import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';

function useRoutes() {
    return (
        <Switch>
            <Route path="/about" exact>
                <About/>
            </Route>
            <Route path="/catalog" exact>
                <Shop/>
            </Route>
            <Route path="/cart" exact>
                <Cart/>
            </Route >
            <Redirect to="/catalog" />
        </Switch>
    );
}

export default useRoutes;
