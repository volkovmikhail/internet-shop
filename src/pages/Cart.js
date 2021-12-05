import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartContent from '../cart/CartContent';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../AuthContext';
import { clearCart } from '../actions';

function Cart() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [isLodaing, setLoading] = useState(false);
  const history = useHistory();
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

  async function checkout() {
    if (!token) {
      history.push('/login');
      return;
    }
    setLoading(true);
    const raw = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(store.cart),
    });
    if (raw.status === 200) {
      alert('The order is placed, the manager will contact you via email');
    } else {
      alert('Somthing wrong, try again');
      setLoading(false);
      return;
    }
    setLoading(false);
    dispatch(clearCart());
    history.push('/catalog');
  }

  return (
    <div>
      <Header active="cart" />
      <h1 className="title">cart</h1>
      {store.cart?.length ? <CartContent cart={store.cart} /> : <h1 className="loadingContainer">Cart is empty</h1>}
      {store.cart?.length ? (
        <div>
          <h1 className="title">total: {total(store.cart)}</h1>
          <div className="container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="logoutBtn" style={{ width: '200px' }} onClick={checkout} disabled={isLodaing}>
              CHECKOUT
            </button>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}

export default Cart;
