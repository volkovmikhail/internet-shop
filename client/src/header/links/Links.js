import React from 'react';
import styles from './Links.module.css';

function Menu({ active }) {
    const link = (l) => {
        window.location.href = l;
    };

    return (
        <div className={`${styles.links} ${styles.visibleBigScreen}`}>
            <div
                onClick={() => {
                    link('/about');
                }}
                className={active === 'about' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
            >
                <h4>About us</h4>
            </div>
            <div
                onClick={() => link('/catalog')}
                className={active === 'catalog' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
            >
                <h4>Catalog</h4>
            </div>
            <div
                onClick={() => link('/cart')}
                className={active === 'cart' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
            >
                <div href="/" className={styles.cartLink}>
                    <div className={styles.cartImage} style={{ backgroundImage: `url("/images/assets/cart.svg")` }} />
                    <span className={styles.badge}>3</span>
                </div>
            </div>
        </div>
    );
}

export default Menu;
