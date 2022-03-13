import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contacts}>
          <div>
            <a href="https://volkovmikhail.github.io/links.html">
              <p className={styles.footerText}>Автор проекта: Волков Михаил Юрьевич 39ТП</p>
            </a>
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
