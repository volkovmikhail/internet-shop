import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Links.module.css';
import { useSelector } from 'react-redux';

function Menu({ active }) {
  const store = useSelector((state) => state);

  const getCartItemsCount = (cart) => {
    let sum = 0;
    cart.forEach((item) => (sum += item.count));
    return sum;
  };

  return (
    <div className={`${styles.links} ${styles.visibleBigScreen}`}>
      <Link
        to="/about"
        className={active === 'about' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
      >
        <h4>About us</h4>
      </Link>
      <Link
        to="/catalog"
        className={active === 'catalog' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
      >
        <h4>Catalog</h4>
      </Link>
      <Link to="/cart" className={active === 'cart' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}>
        <div className={styles.cartLink}>
          <div className={styles.cartImage} style={{ backgroundImage: `url("/images/assets/cart.svg")` }} />

          {getCartItemsCount(store.cart) === 0 ? (
            <span />
          ) : (
            <span className={styles.badge}>{getCartItemsCount(store.cart)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Menu;
