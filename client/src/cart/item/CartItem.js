import React, { useContext } from 'react';
import styles from './cartitem.module.css';
import { Context } from '../../cartContext';

function CartItem({ url, title, price, currency, id, count }) {
    const { setCart } = useContext(Context);

    function deleteCartItem(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let newCart = [];
        cart.forEach((i) => {
            if (i._id === itemId) {
                if (i.count === 1) {
                    return;
                }
                i.count--;
                newCart.push(i);
            } else {
                newCart.push(i);
            }
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(JSON.parse(localStorage.getItem('cart')));
    }

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.mainInfo}>
                    <div
                        className={styles.cardImg}
                        style={{
                            backgroundImage: `url('./images/${url}')`,
                        }}
                    ></div>
                    <div className={styles.cardInfo}>
                        <div className={styles.cartText}>
                            <p>{title} - </p>
                            <div className={styles.cartText}>
                                <p className={styles.price}>
                                    {price} {currency}
                                </p>
                                <p>x{count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className={styles.deleteButton}
                    onClick={() => {
                        deleteCartItem(id);
                    }}
                >
                    X
                </button>
            </div>
            <hr />
        </div>
    );
}

export default CartItem;
