import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routers';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

function App() {
  const router = useRoutes();

  return (
    <Provider store={store}>
      <BrowserRouter>{router}</BrowserRouter>
    </Provider>
  );
}

export default App;
