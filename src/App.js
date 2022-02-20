import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routers';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './AuthContext';

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    reducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
} else {
  store = createStore(reducer, compose(applyMiddleware(thunk)));
}

function App() {
  const { login, logout, token, role, ready } = useAuth();
  const router = useRoutes(role);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ login, logout, token, role, ready }}>
        <BrowserRouter>{router}</BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
