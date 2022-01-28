import React, { useState } from 'react';
import styles from './catalog.module.css';
import Card from './card/Card.js';
import { useDispatch } from 'react-redux';
import { setWears } from '../actions';

function Catalog({ wears }) {
  //бля всю ночь это писать
  //я заебался
  const uniqueCategories = [...new Set(wears.map((wear) => wear.category))].sort();
  const [state, setState] = useState(wears);
  const dispatch = useDispatch();

  function searchHandler(e) {
    const { value } = e.target;
    setState(wears.filter((wear) => wear.title.toUpperCase().includes(value.trim().toUpperCase())));
  }

  function categoryHandler(e) {
    const { value } = e.target;
    setState(value === 'all' ? wears : wears.filter((wear) => wear.category === value));
  }

  function filterHandler(e) {
    const arr = state;
    switch (e.target.value) {
      case 'pop':
        break;
      case 'lowToHight':
        for (let i = 0, endI = arr.length - 1; i < endI; i++) {
          for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j].price > arr[j + 1].price) {
              let swap = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = swap;
            }
          }
        }
        dispatch(setWears(arr));
        break;
      case 'highToLow':
        for (let i = 0, endI = arr.length - 1; i < endI; i++) {
          for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j].price < arr[j + 1].price) {
              let swap = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = swap;
            }
          }
        }
        dispatch(setWears(arr));
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <input type="text" className={styles.input} placeholder="Поиск по названию" onInput={searchHandler} />
        <div>
          <div className={styles.category} onClick={() => categoryHandler({ target: { value: 'all' } })}>
            <p>Все категории</p>
          </div>
          {uniqueCategories.map((c, i) => {
            return (
              <div className={styles.category} key={i} onClick={() => categoryHandler({ target: { value: c } })}>
                <p>{c}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.filter}>
        <input type="text" className={styles.input} placeholder="Поиск по названию" onInput={searchHandler} />
        <select className={styles.input} onChange={categoryHandler}>
          <option value="all">Все категории</option>
          {uniqueCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.cardsAndFilters}>
        <div className={styles.filterSelect}>
          <select className={styles.input} style={{ maxWidth: '200px' }} onChange={filterHandler}>
            <option value="pop" defaultValue>
              По популярности
            </option>
            <option value="lowToHight">По возрастанию цены</option>
            <option value="highToLow">По убыванию цены</option>
          </select>
        </div>
        <div className={styles.cardContainer}>
          {state.map((wear, index) => {
            return (
              <Card
                key={index}
                id={wear._id}
                url={wear.images[0]}
                title={wear.title}
                price={wear.price}
                currency={wear.currency}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
