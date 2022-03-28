import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../actions';
import { AuthContext } from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import OrdersList from '../orders/OrdersList';
import Modal from 'react-responsive-modal';
import { useAlert } from 'react-alert';

function Profile() {
  const { token, logout, role } = useContext(AuthContext);
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const [orders, setOrders] = useState(false);
  const [open, setOpen] = useState(false);
  const alert = useAlert();
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
  }, [open]);

  function logoutHandler() {
    logout();
    history.push('/catalog');
  }

  async function submitEdit(e) {
    e.preventDefault();
    const { name, email, phone } = e.target;
    setOpen(false);
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    let status;
    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((json) => {
        if (status === 200) {
          alert.success(json.message);
          dispatch(fetchUserData(token));
        } else {
          alert.error(json.message);
        }
      });
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
        <button
          className="logoutBtn"
          style={{ marginLeft: '30px', marginTop: '50px' }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Редактировать
        </button>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          center
        >
          <h2 style={{ margin: '30px' }}>Редактировать данные</h2>
          <form onSubmit={submitEdit}>
            <br />
            <p>
              Имя: <input className="input" type="text" name="name" defaultValue={user.name} />
            </p>
            <br />
            <p>
              Enail: <input className="input" type="email" name="email" id="" defaultValue={user.email} />
            </p>
            <br />
            <p>
              Телефон: <input className="input" type="text" name="phone" defaultValue={user.phone} />
            </p>
            <br />
            <br />
            <button className="logoutBtn" type="submit">
              Сохранить
            </button>
          </form>
        </Modal>
        {role === 'ADMIN' ? (
          <Link to="/dashboard">
            <button className="logoutBtn" style={{ marginTop: '50px', marginLeft: '30px' }}>
              Панель администратора
            </button>
          </Link>
        ) : (
          ''
        )}
        <h2 style={{ margin: '50px 0px' }}>Ваши заказы:</h2>
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
