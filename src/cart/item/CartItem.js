import { React } from 'react';
import styles from './cartitem.module.css';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../actions';

function CartItem({ url, title, price, currency, index, size }) {
  const dispatch = useDispatch();
  function deleteCartItem(itemId) {
    dispatch(deleteFromCart(itemId));
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card}>
        <div className={styles.mainInfo}>
          <div
            className={styles.cardImg}
            style={{
              backgroundImage: `url('${url}')`,
            }}
          ></div>
          <div className={styles.cardInfo}>
            <div className={styles.cartText}>
              <p>{title} </p>
              <p>( размер: {size} ) - </p>
              <div className={styles.cartText}>
                <p className={styles.price}>
                  {price} {currency}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => {
            deleteCartItem(index);
          }}
        >
          &#10006;
        </button>
      </div>
      <hr />
    </div>
  );
}

export default CartItem;
