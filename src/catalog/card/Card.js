import styles from './card.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../actions';
import { Link } from 'react-router-dom';

function Card({ url, title, price, currency, id }) {
  const dispath = useDispatch();
  const store = useSelector((store) => store);
  const [countInCart, setStateCIC] = useState(0);

  useEffect(() => {
    const inCart = store.cart.filter((e) => e._id === id);
    if (inCart.length) {
      setStateCIC(inCart[0].count);
    } else {
      setStateCIC(0);
    }
  }, [id, store.cart]);

  function addItemToCart(itemId) {
    fetch(`/api/wear/popularity?id=${itemId}&popularity=${2}`, { method: 'PATCH' });
    dispath(addToCart(itemId));
  }

  function deleteItemFromCart(itemId) {
    dispath(deleteFromCart(itemId));
  }

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
          {countInCart ? (
            <div className={styles.buttonsContainer}>
              <button
                className={styles.countControllButtons}
                onClick={() => {
                  deleteItemFromCart(id);
                }}
              >
                -
              </button>
              <span className={styles.countInCart}>{countInCart}</span>
              <button
                className={styles.countControllButtons}
                onClick={() => {
                  addItemToCart(id);
                }}
              >
                +
              </button>
            </div>
          ) : (
            <div className={styles.buttonsContainer}>
              <button
                className={styles.orderButton}
                onClick={() => {
                  addItemToCart(id);
                }}
              >
                В корзину
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
