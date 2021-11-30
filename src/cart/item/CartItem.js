import React from 'react';
import styles from './cartitem.module.css';
import {useDispatch} from 'react-redux';
import {deleteFromCart} from '../../actions';

function CartItem({ url, title, price, currency, id, count }) {
    const dispatch = useDispatch();
    function deleteCartItem(itemId) {
        dispatch(deleteFromCart(itemId));
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
                    &#10006;
                </button>
            </div>
            <hr />
        </div>
    );
}

export default CartItem;
