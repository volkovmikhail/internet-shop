import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ItemContent from '../itemContent/ItemContent';

function ItemPage() {
    const [state, setState] = useState({});

    useEffect(() => {
        setItemData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getItemIdFromUrl() {
        const id = window.location.pathname.split('/');
        return id[id.length - 1];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function setItemData() {
        const data = await (await fetch(`/api/wear/${getItemIdFromUrl()}`)).json();
        setState(data[0]);
    }

    return (
        <div>
            <Header active="" />
            {state?.message !== 'item not found' ? <ItemContent wear={state} /> : <h1 className="loadingContainer">Item not found</h1>}
            <Footer />
        </div>
    );
}

export default ItemPage;
