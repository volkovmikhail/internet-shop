import React, { useEffect, useState } from 'react';
import Catalog from '../catalog/Catalog';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWears } from '../actions';

function Shop() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [sex, setSex] = useState(1);
  useEffect(() => {
    dispatch(fetchWears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex]);

  function changeSex(sex) {
    setSex(sex);
  }

  return (
    <div>
      <Header active="catalog" />
      <div className="title">
        <div
          className={`text ${sex ? '' : 'activeText'}`}
          onClick={() => {
            changeSex(0);
          }}
        >
          Женщинам
        </div>
        <div
          className={`text ${sex ? 'activeText' : ''}`}
          onClick={() => {
            changeSex(1);
          }}
        >
          Мужчинам
        </div>
      </div>
      {store.catalog?.length ? (
        <Catalog wears={store.catalog.filter((w) => w.sex === sex)} sex={sex} />
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
