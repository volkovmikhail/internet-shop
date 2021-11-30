import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartContent from '../cart/CartContent';
import { useSelector } from 'react-redux';

function Cart() {
  const store = useSelector((state) => state);
  function total(cart) {
    if (!cart) {
      return 0;
    }
    let total = 0;
    cart.forEach((i) => {
      total += i.count * i.price;
    });
    return total;
  }

  return (
    <div>
      <Header active="cart" />
      <h1 className="title">cart</h1>
      {store.cart?.length ? <CartContent cart={store.cart} /> : <h1 className="loadingContainer">Cart is empty</h1>}
      {store.cart?.length ? <h1 className="title">total: {total(store.cart)}</h1> : null}
      <Footer />
    </div>
  );
}

export default Cart;
