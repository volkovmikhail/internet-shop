import React, { useEffect, useContext } from 'react';
import Catalog from '../catalog/Catalog';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { Context } from '../context';
import { FETCH_WEARS } from '../actions';

function Shop() {
    const { store, dispatch } = useContext(Context);
    useEffect(() => {
        async function fetchData() {
            const data = await (await fetch('/api/wears')).json();
            dispatch({
                type: FETCH_WEARS,
                payload: data,
            });
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Header active="catalog" />
            <h1 className="title">Catalog</h1>
            {store.catalog?.length ? (
                <Catalog wears={store.catalog} />
            ) : (
                <div className="loadingContainer">
                    <div className="loader"></div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Shop;
