import React, { useState } from 'react';
import styles from './registration.module.css';
import { Link, useHistory } from 'react-router-dom';

// eslint-disable-next-line no-useless-escape
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(\+375|80)(29|25|44|33|17)(\d{3})(\d{2})(\d{2})$/;

function Registration() {
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastame] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
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
      body: JSON.stringify({ email, password, name, lastname, phone }),
    });
    if (rawResponse.status === 400) {
      alert('Somthing wrong, maybe this email already exist');
      setIsLoading(false);
      return;
    }
    alert('Registration was successful');
    history.push('/login');
  }

  function phoneHandler(e) {
    const p = e.target.value.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '');
    setPhone(p);
    validate(name, lastname, email, password, confirm, p);
  }

  function emailHandler(e) {
    setEmail(e.target.value);
    validate(name, lastname, e.target.value, password, confirm, phone);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
    validate(name, lastname, email, e.target.value, confirm, phone);
  }

  function nameHandler(e) {
    setName(e.target.value);
    validate(e.target.value, lastname, email, password, confirm, phone);
  }

  function lastnnameHandler(e) {
    setLastame(e.target.value);
    validate(name, e.target.value, email, password, confirm, phone);
  }

  function confirmHandler(e) {
    setConfirm(e.target.value);
    validate(name, lastname, email, password, e.target.value, phone);
  }

  function validate(n, ln, em, pw, conf, ph) {
    if (
      n.length < 3 ||
      !em.match(regexEmail) ||
      ln.length < 3 ||
      pw.length < 8 ||
      conf !== pw ||
      !ph.match(phoneRegex)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={submit}>
        <h3>Регистрация</h3>
        <label htmlFor="name" className={styles.label}>
          Имя
        </label>
        <input
          type="text"
          name="name"
          className={styles.input}
          placeholder="Ваше имя"
          id="name"
          value={name}
          onInput={nameHandler}
        />

        <label htmlFor="lastname" className={styles.label}>
          Фамилия
        </label>
        <input
          type="text"
          name="lastname"
          className={styles.input}
          placeholder="Ваша фамилия"
          id="lastname"
          value={lastname}
          onInput={lastnnameHandler}
        />

        <label htmlFor="phone" className={styles.label}>
          Телефон
        </label>
        <input
          type="tel"
          name="phone"
          className={styles.input}
          placeholder="Ваш номер телефона"
          id="phone"
          value={phone}
          onInput={phoneHandler}
        />

        <label htmlFor="email" className={styles.label}>
          Эл. почта
        </label>
        <input
          type="text"
          name="email"
          className={styles.input}
          placeholder="Ваша эл. почта"
          id="email"
          value={email}
          onInput={emailHandler}
        />

        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Пароль"
          id="password"
          value={password}
          onInput={passwordHandler}
        />

        <label htmlFor="confirm" className={styles.label}>
          Подтвердите пароль
        </label>
        <input
          type="password"
          className={styles.input}
          placeholder="Подтвердите ваш пароль"
          id="confirm"
          value={confirm}
          onInput={confirmHandler}
        />
        <button className={styles.button} type="submit" disabled={disabled}>
          {isLoading ? <div className={styles.loading}>Загрузка...</div> : 'Отправить'}
        </button>
        <Link to="/login">
          <button className={styles.buttonReg}>Войти</button>
        </Link>
      </form>
    </div>
  );
}

export default Registration;
