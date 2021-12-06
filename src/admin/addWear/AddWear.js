import React, { useState, useContext } from 'react';
import styles from './addwear.module.css';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../AuthContext';

function AddWear() {
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
      alert('Somthing wrong with data');
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
    const files = t.images.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images`, files[i]);
    }
    formData.append(`title`, t.title.value);
    formData.append(`discription`, t.discription.value);
    formData.append(`price`, price);
    formData.append(`category`, category);
    formData.append(`currency`, t.currency.value);
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
    <div className="container">
      <form onSubmit={submit}>
        <h3>Add wear</h3>

        <label className={styles.label}>Title</label>
        <input type="text" name="title" className={styles.input} placeholder="Title" />

        <label className={styles.label}>Discription</label>
        <textarea name="discription" className={styles.input} placeholder="Discription" />

        <label className={styles.label}>Price</label>
        <input type="text" name="price" className={styles.input} placeholder="Price" />

        <label className={styles.label}>Currency</label>
        <select className={styles.input} name="currency">
          <option value="BYN">BYN</option>
        </select>

        <label className={styles.label}>Category</label>
        <input type="text" name="category" className={styles.input} placeholder="Category" />

        <label className={styles.label}>Category</label>
        <select className={styles.input} name="categorySelect">
          <option value="custom">Custom...</option>
          {store.catalog.map((w, index) => (
            <option key={index} value={w.category}>
              {w.category}
            </option>
          ))}
        </select>

        <label className={styles.label}>Images</label>
        <input type="file" style={{ marginTop: '20px' }} name="images" multiple={true} />

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? <div className={styles.loading}>Loading...</div> : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default AddWear;
