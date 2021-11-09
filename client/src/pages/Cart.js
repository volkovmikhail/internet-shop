import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartContent from '../cart/CartContent';
import { Context } from '../cartContext';

function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

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
        <Context.Provider value={{setCart}}>
            <div>
                <Header active="cart" />
                <h1 className="title">cart</h1>
                {cart?.length ? <CartContent cart={cart} /> : <h1 className="loadingContainer">Cart is empty</h1>}
                <h1 className="title">total: {total(cart)}</h1>
                <Footer />
            </div>
        </Context.Provider>
    );
}

export default Cart;
