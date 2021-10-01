import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Cart() {
    return (
        <div>
            <Header active="cart" />
            <h1 className="title">cart</h1>

            <Footer />
        </div>
    );
}

export default Cart;
