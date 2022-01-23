import React, { useEffect } from 'react';
import Catalog from '../catalog/Catalog';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWears } from '../actions';

function Shop() {
  const dispatch = useDispatch();
  const store = useSelector(store=>store);
  useEffect(() => {
    dispatch(fetchWears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header active="catalog" />
      <h1 className="title">Каталог</h1>
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
