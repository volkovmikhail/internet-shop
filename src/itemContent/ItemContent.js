import React from 'react';
import styles from './itemcontent.module.css';

function ItemContent({ wear }) {
    return (
        <main>
            <div className={styles.container}>
                <div className={styles.imagesContainer}>
                    {wear?.images !== undefined ? (
                        wear.images.map((i, index) => (
                            <div key={index} style={{ backgroundImage: `url('../images/${i}')` }}></div>
                        ))
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
                <div className={styles.infoContainer}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. In doloribus repellendus nesciunt minus
                    voluptates, eligendi molestias ea porro quia perferendis beatae nulla ducimus, natus velit expedita
                    similique? Quaerat, amet unde.
                </div>
            </div>
        </main>
    );
}

export default ItemContent;
