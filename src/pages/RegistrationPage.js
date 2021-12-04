import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Registration from '../registration/Registration';

function RegistrationPage() {
  return (
    <div>
      <Header active="login" />
      <Registration />
    </div>
  );
}

export default RegistrationPage;
