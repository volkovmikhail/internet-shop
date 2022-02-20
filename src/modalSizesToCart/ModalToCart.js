import { React, useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import styles from './modalorder.module.css';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions';

const ModalToCart = ({ open, close, wear }) => {
  useEffect(() => {
    setOpen(open);
  }, [open]);
  const dispath = useDispatch();
  const alert = useAlert();
  const [isOpen, setOpen] = useState(false);
  const onCloseModal = () => close();
  const store = useSelector((store) => store);
  const [active, setActive] = useState(''); //active size!

  function toCart(id) {
    if (!active) {
      alert.error('Необходимо выбрать размер');
      return;
    }
    const cartCount = store.cart.filter((i) => i._id === id).length;
    const totalQuantity = store.catalog.find((i) => i._id === id).quantity;
    if (totalQuantity <= cartCount) {
      alert.error('Вы не можете заказать товар в таком количестве');
      return;
    }
    dispath(addToCart(id, active));
    alert.success('Товар добавлен в корзину!');
    close();
  }

  return (
    <Modal open={isOpen} onClose={onCloseModal} center>
      <div className={styles.main}>
        <h2 style={{ marginTop: '2rem' }}>Выбрать размер:</h2>
        <div className={styles.container}>
          {wear.sizes.map((s, i) => (
            <div
              className={`${styles.size} ${active === s ? styles.active : ''}`}
              onClick={() => {
                setActive(s);
              }}
              key={i}
            >
              {s}
            </div>
          ))}
        </div>
        <button onClick={() => toCart(wear._id)} className="logoutBtn">
          Добавить в корзину
        </button>
      </div>
    </Modal>
  );
};

export default ModalToCart;
