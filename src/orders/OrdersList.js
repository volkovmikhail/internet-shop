import React, { Fragment } from 'react';
import styles from './orders.module.css';
import { Link } from 'react-router-dom';

export default function OrdersList({ orders, minimal }) {
  return (
    <div className={styles.orders}>
      {orders.map((order, i) => (
        <Link to={`/order/${order._id}`} key={i}>
          <div className={styles.order}>
            <h3>
              Код заказа: {order._id.substring(order._id.length - 8)} - {order.status}
            </h3>
            <div className={styles.orderInfo}>
              {minimal ? (
                ''
              ) : (
                <Fragment>
                  <div>Имя: {order.user[0].name}</div>
                  <div>Телефон: {order.user[0].phone}</div>
                  <div>Почта: {order.user[0].email}</div>
                  <div>Кол-во товаров: {order.data.length}</div>
                  <div>Адрес: {order.address}</div>
                </Fragment>
              )}
              <div style={minimal ? { marginTop: '0.5rem' } : {}}>
                <div>Дата заказа: {new Date(order.orderDate).toLocaleString('en-GB').replaceAll('/', '.')}</div>
                <div>На дату: {new Date(order.onDate).toLocaleDateString('en-GB').replaceAll('/', '.')}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {orders.length === 0 ? 'Пока заказов нету' : ''}
    </div>
  );
}
