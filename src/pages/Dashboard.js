import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AddWear from '../admin/addWear/AddWear';

function Dashboard() {
  return (
    <div>
      <Header active="" />
      <h1 className="title">Dashboard</h1>
      <AddWear />
      <Footer />
    </div>
  );
}

export default Dashboard;
