import React from 'react';
import { useState } from 'react';
import styles from './Header.module.css';
import BurgerMenu from './burgerMenu/BurgerMenu';
import Links from './links/Links';

function Header({ active }) {
  const [menuState, setMenuState] = useState(false);

  const openMenu = (e) => {
    setMenuState(!menuState);
  };

  return (
    <div>
      <BurgerMenu active={active} state={menuState} />
      <div className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <h1>Clothes</h1>
          </div>
          <Links active={active} />
          <div className={styles.burgerMenu}>
            <div
              onClick={openMenu}
              style={{
                backgroundImage: `url("../images/assets/Hamburger.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '50px',
                height:'50px',
                alignSelf:'center'
              }}
              className={styles.linkItem}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
