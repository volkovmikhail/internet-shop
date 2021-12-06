import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contacts}>
          <div>
            <p>Phone: +375445553344</p>
            <p>Address: ул. Пушкина 184</p>
            <a href="mailto:volkov.electronics@gmail.com">
              <p>email: volkov.electronics@gmail.com</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
