import React from 'react';
import styles from './itemcontent.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions';

function ItemContent({ wear }) {
  const dispath = useDispatch();

  function addItemToCart(itemId) {
    dispath(addToCart(itemId));
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.imagesContainer}>
          {wear?.images !== undefined ? (
            wear.images.map((i, index) => <div key={index} style={{ backgroundImage: `url('../images/${i}')` }}></div>)
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            <h1>{wear.title}</h1>
          </div>
          <div className={styles.discription}>
            <p>{wear.discription}</p>
          </div>
          <div className={styles.category}>
            <p>Category: {wear.category}</p>
          </div>
          <div className={styles.price}>
            <p>
              {wear.price} {wear.currency}
            </p>
          </div>
          <button
            className={styles.orderButton}
            onClick={() => {
              addItemToCart(wear._id);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </main>
  );
}

export default ItemContent;
