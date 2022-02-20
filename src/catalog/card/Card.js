import styles from './card.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalToCart from '../../modalSizesToCart/ModalToCart';

function Card({ url, title, price, currency, id, sizes }) {
  const store = useSelector((store) => store);
  const [countInCart, setStateCIC] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const inCart = store.cart.filter((e) => e._id === id);
    if (inCart.length) {
      setStateCIC(inCart.length);
    } else {
      setStateCIC(0);
    }
  }, [id, store.cart]);

  const toItemPage = (itemId) => {
    return `/item/${itemId}`;
  };

  return (
    <div className={styles.card}>
      <Link to={toItemPage(id)}>
        <div
          className={styles.cardImg}
          style={{
            backgroundImage: `url('${url}')`,
          }}
        ></div>
      </Link>
      <div className={styles.cardTitle}>
        <div className={styles.cardInfo}>
          <Link to={toItemPage(id)}>
            <div style={{ cursor: 'pointer' }}>
              <p>{title}</p>
              <p className={styles.price}>
                {price} {currency}
              </p>
            </div>
          </Link>
          <div className={styles.buttonsContainer}>
            {countInCart ? <span className={styles.inCart}>В корзине: {countInCart}</span> : ''}
            <button
              className={styles.orderButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
      <ModalToCart
        open={open}
        close={() => {
          setOpen(false);
        }}
        wear={{ sizes, _id: id }}
      />
    </div>
  );
}

export default Card;
