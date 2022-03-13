import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../actions';
import { AuthContext } from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import OrdersList from '../orders/OrdersList';

function Profile() {
  const { token, logout, role } = useContext(AuthContext);
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const [orders, setOrders] = useState(false);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
    fetch('/api/order/all/user', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message) {
          return;
        }
        setOrders(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logoutHandler() {
    logout();
    history.push('/catalog');
  }

  return (
    <div>
      <Header active="profile" />
      <h1 className="title" style={{ marginBottom: '50px' }}>
        Профиль
      </h1>
      <div className="container">
        <h2>Ваша личная информация:</h2>
        <p className="title">Имя: {user.name}</p>
        <p className="title">Email: {user.email}</p>
        <p className="title">Телефон: {user.phone || '-'}</p>
        <button className="logoutBtn" style={{ marginTop: '50px' }} onClick={logoutHandler}>
          Выйти
        </button>
        {role === 'ADMIN' ? (
          <Link to="/dashboard">
            <button className="logoutBtn" style={{ marginTop: '50px', marginLeft: '30px' }}>
              Панель администратора
            </button>
          </Link>
        ) : (
          ''
        )}
        <h2 style={{margin:'50px 0px'}}>
          Ваши заказы:
        </h2>
        {orders === false ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="loader"></div>
          </div>
        ) : (
          <OrdersList orders={orders} minimal={true} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
