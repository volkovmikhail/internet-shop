import React, { useEffect, useState, useContext } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartContent from '../cart/CartContent';
import { AuthContext } from '../AuthContext';
import { useAlert } from 'react-alert';

export default function Order() {
  const [state, setstate] = useState(null);
  const { token, role } = useContext(AuthContext);
  const [relode, setRe] = useState(true);
  const alert = useAlert();
  const id = window.location.pathname.split('/')[2];
  useEffect(() => {
    fetch(`/api/order/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res.order.data.forEach((d) => {
          for (let i = 0; i < res.wears.length; i++) {
            if (res.wears[i]._id === d.wearId) {
              res.wears[i].size = d.size;
            }
          }
        });
        setstate(res);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relode]);

  function setStatusHandler(e) {
    const value = e.target.value;
    if (!value) {
      return;
    }
    const body = new FormData();
    body.append('id', id);
    body.append('status', value);
    fetch('/api/order', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    e.target.value = '';
    alert.info('статус обновлён');
    setRe(!relode);
  }

  return (
    <div>
      <Header active="profile" />
      {state ? (
        <div>
          <h1 className="title">Заказ: {state.order._id.substring(state.order._id.length - 8)}</h1>
          <div className="container" style={{ marginBottom: '1rem' }}>
            <p>
              Имя зкаказчика: <b>{state.user.name}</b>
            </p>
            <p>
              Телефон: <b>{state.user.phone ? state.user.phone : '-'}</b>
            </p>
            <p>
              Эл.почта: <b>{state.user.email}</b>
            </p>
            <p>
              Адрес: <b>{state.order.address}</b>
            </p>
            <p>
              Дата заказа: <b>{new Date(state.order.orderDate).toLocaleString('en-GB').replaceAll('/', '.')}</b>
            </p>
            <p>
              Заказ на дату: <b>{new Date(state.order.onDate).toLocaleString('en-GB').replaceAll('/', '.')}</b>
            </p>
            <p>
              Количество товаров: <b>{state.order.data.length}</b>
            </p>
            <p>
              Сумма: <b>{state.sum} BYN</b>
            </p>
            <p>
              Статус: <b>{state.order.status}</b>
            </p>
            {role === 'ADMIN' ? (
              <select style={{ maxWidth: '320px' }} onChange={setStatusHandler} className="input">
                <option value="">Выбрать статус</option>
                <option value="В обработке">В обработке</option>
                <option value="В пути">В пути</option>
                <option value="Доставлен">Доставлен</option>
              </select>
            ) : (
              ''
            )}
          </div>
          <CartContent isDisableDelete={true} cart={state.wears} />
        </div>
      ) : (
        <div className="loadingContainer">
          <div className="loader"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}
