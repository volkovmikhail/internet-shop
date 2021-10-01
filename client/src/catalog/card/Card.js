import React from 'react';
import styles from './card.module.css';

function Card({url, title, price, currency}) {
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
                        <p className={styles.price}>{price} {currency}</p>
                    </div>
                    <button className={styles.orderButton}>ORDER</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
