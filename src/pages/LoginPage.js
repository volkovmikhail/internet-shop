import React from 'react';
import Header from '../header/Header';
import Login from '../login/Login';

function Dashboard() {
  return (
    <div>
      <Header active="login" />
      <Login />
    </div>
  );
}

export default Dashboard;
