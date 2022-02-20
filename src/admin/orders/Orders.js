import React, { useState, useContext, useEffect } from 'react';
import styles from './orders.module.css';
import { AuthContext } from '../../AuthContext';

function Orders() {
  const [state, setState] = useState(null);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch('/api/orders', {
          method: 'GET',
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
      ).json();
      setState(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      {state ? (
        <table>
          <thead>
            <tr>
              <td>User</td>
              <td>Date</td>
              <td>Purchases</td>
            </tr>
          </thead>
          <tbody>
            {state.map((order, index) => {
              let total = 0;
              return (
                <tr key={index}>
                  <td>
                    {order.user[0]._id}
                    <br />
                    {order.user[0].name + ' ' + order.user[0].lastname}
                    <br />
                    {order.user[0].email}
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default Orders;
