import React, { useState } from 'react';
import styles from './registration.module.css';
import { Link, useHistory } from 'react-router-dom';

// eslint-disable-next-line no-useless-escape
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Registration() {
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastame] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const history = useHistory();

  async function submit(e) {
    setIsLoading(true);
    e.preventDefault();
    const rawResponse = await fetch('/api/auth/reg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, lastname }),
    });
    if (rawResponse.status === 400) {
      alert('Somthing wrong, maybe this email already exist');
      setIsLoading(false);
      return;
    }
    alert('Registration was successful');
    history.push('/login');
  }

  function emailHandler(e) {
    setEmail(e.target.value);
    validate(name, lastname, e.target.value, password, confirm);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
    validate(name, lastname, email, e.target.value, confirm);
  }

  function nameHandler(e) {
    setName(e.target.value);
    validate(e.target.value, lastname, email, password, confirm);
  }

  function lastnnameHandler(e) {
    setLastame(e.target.value);
    validate(name, e.target.value, email, password, confirm);
  }

  function confirmHandler(e) {
    setConfirm(e.target.value);
    validate(name, lastname, email, password, e.target.value);
  }

  function validate(n, ln, em, pw, conf) {
    if (n.length < 3 || !em.match(regexEmail) || ln.length < 3 || pw.length < 8 || conf !== pw) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={submit}>
        <h3>Registration</h3>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          className={styles.input}
          placeholder="Your name"
          id="name"
          value={name}
          onInput={nameHandler}
        />

        <label htmlFor="lastname" className={styles.label}>
          Last name
        </label>
        <input
          type="text"
          name="lastname"
          className={styles.input}
          placeholder="Your last name"
          id="lastname"
          value={lastname}
          onInput={lastnnameHandler}
        />

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          className={styles.input}
          placeholder="Email"
          id="email"
          value={email}
          onInput={emailHandler}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Password"
          id="password"
          value={password}
          onInput={passwordHandler}
        />

        <label htmlFor="confirm" className={styles.label}>
          Confirm password
        </label>
        <input
          type="password"
          className={styles.input}
          placeholder="Confirm your password"
          id="confirm"
          value={confirm}
          onInput={confirmHandler}
        />
        <button className={styles.button} type="submit" disabled={disabled}>
          {isLoading ? <div className={styles.loading}>Loading...</div> : 'Submit'}
        </button>
        <Link to="/login">
          <button className={styles.buttonReg}>Log in</button>
        </Link>
      </form>
    </div>
  );
}

export default Registration;
