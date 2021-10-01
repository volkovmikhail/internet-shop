import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routers';

function App() {
    const router = useRoutes();
    return (
        <BrowserRouter>
            {router}
        </BrowserRouter>
    );
}

export default App;
