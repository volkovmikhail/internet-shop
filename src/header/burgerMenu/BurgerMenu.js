import React from 'react';
import styles from './BurgerMenu.module.css';
import { Link } from 'react-router-dom';

function Menu({ active, state }) {
  return (
    <div className={state ? `${styles.links} ${styles.down}` : `${styles.links} ${styles.up}`}>
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
        <h4>Cart</h4>
      </Link>
    </div>
  );
}

export default Menu;
