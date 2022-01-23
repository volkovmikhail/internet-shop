import React, { useState } from 'react';
import styles from './catalog.module.css';
import Card from './card/Card.js';

function Catalog({ wears }) {
  //бля всю ночь это писать
  //я заебался
  //по факту это компонент контейнер, типо выводит много раз компонент карточка, пиздец
  //ладно приступим к фильтру товаров....
  const uniqueCategories = [...new Set(wears.map((wear) => wear.category))];
  const [state, setState] = useState(wears);

  function searchHandler(e) {
    const { value } = e.target;
    setState(wears.filter((wear) => wear.title.toUpperCase().includes(value.trim().toUpperCase())));
  }

  function categoryHandler(e) {
    const { value } = e.target;
    setState(value === 'all' ? wears : wears.filter((wear) => wear.category === value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <input type="text" className={styles.input} placeholder="Search" onInput={searchHandler} />
        <div>
          <div className={styles.category} onClick={() => categoryHandler({ target: { value: 'all' } })}>
            <p>Show all</p>
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
        <input type="text" className={styles.input} placeholder="Search" onInput={searchHandler} />
        <select className={styles.input} onChange={categoryHandler}>
          <option value="all">All categories</option>
          {uniqueCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
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
  );
}

export default Catalog;
