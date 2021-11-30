import styles from './card.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions';
import { Link } from 'react-router-dom';

function Card({ url, title, price, currency, id }) {
  const dispath = useDispatch();

  function addItemToCart(itemId) {
    dispath(addToCart(itemId));
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
            backgroundImage: `url('./images/${url}')`,
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
          <button
            className={styles.orderButton}
            onClick={() => {
              addItemToCart(id);
            }}
          >
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
