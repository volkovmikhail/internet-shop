import React, { useEffect, useState } from 'react';
import Catalog from '../catalog/Catalog';
import Footer from '../footer/Footer';
import Header from '../header/Header';

function Shop() {
    const [wears, setWears] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const data = await (await fetch('/api/wears')).json();
            //console.log(data);
            setWears(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header active="catalog" />
            <h1 className="title">Catalog</h1>
            {wears.length ? (
                <Catalog wears={wears} />
            ) : (
                <div className="loadingContainer">
                    <h1>Loading...</h1>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Shop;