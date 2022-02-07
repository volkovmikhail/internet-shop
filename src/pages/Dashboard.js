import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Wears from '../admin/wears/Wears';
import Orders from '../admin/orders/Orders';
import WearFrom from '../admin/WearForm';
import { useSelector } from 'react-redux';

function Dashboard() {
  const [state, setState] = useState('add');
  const store = useSelector((store) => store);

  function switchComponent(state) {
    switch (state) {
      case 'add':
        return <WearFrom id={null} isUpdate={false} wears={store.catalog} />;
      case 'wears':
        return <Wears />;
      case 'orders':
        return <Orders />;
      default:
        return;
    }
  }
  return (
    <div>
      <Header active="" />
      <h1 className="title">Dashboard</h1>
      <div className="container" style={{ display: 'flex', columnGap: '20px', marginBottom: '50px' }}>
        <button className="logoutBtn" onClick={() => setState('add')}>
          add wear
        </button>
        <button className="logoutBtn" onClick={() => setState('wears')}>
          manage wears
        </button>
        <button className="logoutBtn" onClick={() => setState('orders')}>
          orders
        </button>
      </div>
      {switchComponent(state)}
      <Footer />
    </div>
  );
}

export default Dashboard;
