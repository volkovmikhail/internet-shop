import React, { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "./routers";
import { Context } from "./context";
import reducer from "./reducer";

function App() {
    const router = useRoutes();
    const [store, dispatch] = useReducer(reducer, {
        catalog: []
    });
    return (
        <Context.Provider value={{ store, dispatch }}>
            <BrowserRouter>{router}</BrowserRouter>
        </Context.Provider>
    );
}

export default App;
