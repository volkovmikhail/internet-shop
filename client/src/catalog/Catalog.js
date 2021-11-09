import React from 'react';
import styles from './catalog.module.css';
import Card from './card/Card.js';

function Catalog({ wears }) {
    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                {wears.map((wear, index) => {
                    return (
                        <Card
                            key={index}
                            id={wear._id}
                            url={wear.image}
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
