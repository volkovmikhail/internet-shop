import React, { useContext } from 'react';
import styles from './card.module.css';
import { Context } from '../../context';

function Card({ url, title, price, currency, id }) {
    const { store } = useContext(Context);

    function addToCart(itemId) {
        let newItem = store.catalog.filter((i) => i._id === itemId);
        let cart = JSON.parse(localStorage.getItem('cart'));
        let isFind = false;
        if (cart) {
            const newCart = cart.map((i) => {
                let newI = i;
                if (i._id === newItem[0]._id) {
                    newI.count = newI.count + 1;
                    isFind = true;
                }
                return newI;
            });
            if (isFind) {
                localStorage.setItem('cart', JSON.stringify([...newCart]));
            } else {
                newItem[0].count = 1;
                localStorage.setItem('cart', JSON.stringify([newItem[0], ...newCart]));
            }
        } else {
            newItem[0].count = 1;
            localStorage.setItem('cart', JSON.stringify([newItem[0]]));
        }
    }

    return (
        <div className={styles.card}>
            <div
                className={styles.cardImg}
                style={{
                    backgroundImage: `url('./images/${url}')`,
                }}
            ></div>
            <div className={styles.cardTitle}>
                <div className={styles.cardInfo}>
                    <div>
                        <p>{title}</p>
                        <p className={styles.price}>
                            {price} {currency}
                        </p>
                    </div>
                    <button
                        className={styles.orderButton}
                        onClick={() => {
                            addToCart(id);
                        }}
                    >
                        ORDER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
