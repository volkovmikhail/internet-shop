import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ItemContent from '../itemContent/ItemContent';
import { useDispatch } from 'react-redux';
import { fetchWears } from '../actions';

function ItemPage() {
  const [state, setState] = useState({});
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setItemData();
    dispatch(fetchWears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getItemIdFromUrl() {
    const id = window.location.pathname.split('/');
    return id[id.length - 1];
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function setItemData() {
    const raw = await fetch(`/api/wear/${getItemIdFromUrl()}`);
    setStatus(raw.status);
    const data = await raw.json();
    setState(data);
    await fetch(`/api/wear/popularity?id=${getItemIdFromUrl()}&popularity=1`, { method: 'PATCH' });
  }

  function html() {
    switch (status) {
      case 200:
        if (state.data) {
          return <ItemContent wear={state.data[0]} />;
        } else {
          return (
            <div className="loadingContainer">
              <div className="loading">Загрузка...</div>
            </div>
          );
        }
      case 404:
        return (
          <div className="loadingContainer">
            <h1>Товар не найден</h1>
          </div>
        );
      case 0:
        return (
          <div className="loadingContainer">
            <div className="loading">Загрузка...</div>
          </div>
        );
      default:
        return (
          <div className="loadingContainer">
            <h1>Товар не найден</h1>
          </div>
        );
    }
  }

  return (
    <div>
      <Header active="" />
      {html()}
      <Footer />
    </div>
  );
}

export default ItemPage;
