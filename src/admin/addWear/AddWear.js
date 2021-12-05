import React, { useState } from 'react';
import styles from './addwear.module.css';

function AddWear() {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function submit(e) {
    setIsLoading(true);
    e.preventDefault();
    const rawResponse = await fetch('/api/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (rawResponse.status === 400) {
      alert('Somthing wrong, maybe this email already exist');
      setIsLoading(false);
      return;
    }
    alert('Registration was successful');
  }

  function validate(e) {
    console.log(e.target.files);
  }

  return (
    <div className="container">
      <form onSubmit={submit}>
        <h3>Add wear</h3>

        <label className={styles.label}>Title</label>
        <input type="text" name="name" className={styles.input} placeholder="Title" />

        <label className={styles.label}>Discription</label>
        <textarea name="discription" className={styles.input} placeholder="Discription" />

        <label className={styles.label}>Price</label>
        <input type="text" name="price" className={styles.input} placeholder="Price" />

        <label className={styles.label}>Currency</label>
        <select className={styles.input}>
          <option value="BYN">BYN</option>
        </select>

        <label className={styles.label}>Category</label>
        <input type="text" name="category" className={styles.input} placeholder="Category" />

        <label className={styles.label}>Category</label>
        <select className={styles.input}>
          <option value="custom">Custom...</option>
        </select>

        <label className={styles.label}>Images</label>
        <input type="file" style={{ marginTop: '20px' }} name="images" multiple={true} onChange={validate} />

        <button className={styles.button} type="submit" disabled={disabled}>
          {isLoading ? <div className={styles.loading}>Loading...</div> : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default AddWear;
