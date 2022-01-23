import React, { useContext } from 'react';
import styles from './BurgerMenu.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function Menu({ active, state }) {
  const { token } = useContext(AuthContext);
  return (
    <div className={state ? `${styles.links} ${styles.down}` : `${styles.links} ${styles.up}`}>
      {/* <Link
        to="/about"
        className={active === 'about' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
      >
        <h4>About us</h4>
      </Link> */}
      <Link
        to="/catalog"
        className={active === 'catalog' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
      >
        <h4>Каталог</h4>
      </Link>
      <Link to="/cart" className={active === 'cart' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}>
        <h4>Корзина</h4>
      </Link>
      {token ? (
        <Link
          to="/profile"
          className={active === 'profile' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
        >
          <h4>Профиль</h4>
        </Link>
      ) : (
        <Link
          to="/login"
          className={active === 'login' ? styles.linkItem + ' ' + styles.activeLinkItem : styles.linkItem}
        >
          <h4>Войти</h4>
        </Link>
      )}
    </div>
  );
}

export default Menu;
