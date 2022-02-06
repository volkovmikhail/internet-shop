import React, { useState, useContext } from 'react';
import styles from './addwear.module.css';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../AuthContext';
import { useAlert } from 'react-alert';

function AddWear({ wear }) {
  const alert = useAlert();
  const store = useSelector((s) => s);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const t = e.target;
    if (
      t.title.value.trim().length < 1 ||
      t.discription.value.trim().length < 1 ||
      t.price.value.trim().length < 1 ||
      t.images.files.length === 0
    ) {
      alert.error('Что-то не так с данными!');
      setIsLoading(false);
      return;
    }
    let category;
    if (t.categorySelect.value === 'custom') {
      if (t.category.value.trim().length < 1) return;
      category = t.category.value;
    } else {
      category = t.categorySelect.value;
    }
    const price = isNaN(parseFloat(t.price.value)) ? 0 : parseFloat(t.price.value);
    const quantity = isNaN(parseFloat(t.quantity.value)) ? 0 : parseFloat(t.quantity.value);
    const files = t.images.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    formData.append(`title`, t.title.value);
    formData.append(`discription`, t.discription.value);
    formData.append(`price`, price);
    formData.append(`quantity`, quantity);
    formData.append(`category`, category);
    formData.append(`currency`, t.currency.value);
    formData.append(`sex`, t.sex.value);
    const rawResponse = await fetch('/api/addwear', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log(formData);
    if (rawResponse.status !== 200) {
      alert('Somthing wrong');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    alert('success');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submit}>
        <h3>Добавить товар</h3>

        <label className={styles.label}>Название</label>
        <input type="text" name="title" className={styles.input} placeholder="Title" />

        <label className={styles.label}>Описание</label>
        <textarea name="discription" className={styles.input} />

        <label className={styles.label}>Цена</label>
        <input type="text" name="price" className={styles.input} placeholder="Price" />

        <label className={styles.label}>Валюта</label>
        <select className={styles.input} name="currency">
          <option value="BYN">BYN</option>
        </select>

        <label className={styles.label}>Мужское / Женское</label>
        <select className={styles.input} name="sex">
          <option value="1">Мужское</option>
          <option value="0">Женское</option>
        </select>

        <label className={styles.label}>Категория</label>
        <input type="text" name="category" className={styles.input} placeholder="Category" />

        <label className={styles.label}>Быстрый выбор существующей категории</label>
        <select className={styles.input} name="categorySelect">
          <option value="custom">Создать новую...</option>
          {store.catalog.map((w, index) => (
            <option key={index} value={w.category}>
              {w.category}
            </option>
          ))}
        </select>

        <label className={styles.label}>Количество на складе</label>
        <input type="text" name="quantity" className={styles.input} placeholder="Количество" />

        <label className={styles.label}>Картинки</label>
        <input type="file" style={{ marginTop: '20px' }} name="images" multiple={true} />

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? <div className={styles.loading}>Загрузка...</div> : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default AddWear;
