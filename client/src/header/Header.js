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
        <div className={styles.header}>
            <BurgerMenu active={active} state={menuState} />
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <h1>LOGO</h1>
                </div>
                <Links active={active} />
                <div className={styles.burgerMenu}>
                    <div onClick={openMenu} className={styles.linkItem}>
                        <h4>-</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
