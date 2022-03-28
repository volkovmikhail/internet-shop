import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import OrdersList from '../../orders/OrdersList';

function Orders() {
  const [state, setState] = useState(null);
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const [date, setdate] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch('/api/order/all', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
      ).json();
      setState(data);
      setOrders(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchHandler(code, valueMonth, valueStatus) {
    setdate(valueMonth);
    setCode(code);
    setStatus(valueStatus);
    setOrders(
      state
        .filter((o) => {
          if (!valueMonth) {
            return true;
          }
          const date = new Date(o.orderDate);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const eventDate = valueMonth.split('-');
          return year === Number(eventDate[0]) && month === Number(eventDate[1]);
        })
        .filter((o) => o._id.substring(o._id.length - 8).includes(code.toLowerCase().trim()))
        .filter((o) => {
          if (!valueStatus) {
            return true;
          }
          return o.status === valueStatus;
        })
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '25px', display: 'flex' }}>
        <input
          type="text"
          className="input"
          placeholder="Поиск по коду"
          value={code}
          onInput={(e) => searchHandler(e.target.value, date, status)}
        />
        <div style={{ width: '25px' }}></div>
        <input
          className="input"
          type="month"
          value={date}
          onInput={(e) => searchHandler(code, e.target.value, status)}
        />
        <div style={{ width: '25px' }}></div>
        <select
          style={{ maxWidth: '320px' }}
          onChange={(e) => searchHandler(code, date, e.target.value)}
          className="input"
          value={status}
        >
          <option value="">Все статусы</option>
          <option value="В обработке">В обработке</option>
          <option value="В пути">В пути</option>
          <option value="Доставлен">Доставлен</option>
        </select>
      </div>
      {state ? <OrdersList orders={orders} /> : <div className="loader"></div>}
    </div>
  );
}

export default Orders;
