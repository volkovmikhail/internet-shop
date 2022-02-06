import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contacts}>
          <div>
            <p className={styles.footerText}>Контактный телефон: +375445553344</p>
            <p className={styles.footerText}>Адрес: ул. Пушкина 184</p>
            <a href="mailto:volkov.electronics@gmail.com">
              <p className={styles.footerText}>Электронная почта: volkov.electronics@gmail.com</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
