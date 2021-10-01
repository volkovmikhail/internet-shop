import React from 'react';
import styles from './BurgerMenu.module.css';

function Menu({ active, state }) {
    const link = (l) => {
        window.location.href = l;
    };

    return (
        <div className={state ? `${styles.links} ${styles.down}` : `${styles.links} ${styles.up}`}>
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
                <h4>Cart</h4>
            </div>
        </div>
    );
}

export default Menu;
