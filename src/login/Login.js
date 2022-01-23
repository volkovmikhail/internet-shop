import React, { useState, useContext } from 'react';
import styles from './login.module.css';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

// eslint-disable-next-line no-useless-escape
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);

  async function submit(e) {
    setIsLoading(true);
    e.preventDefault();
    const rawResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await rawResponse.json();
    if (rawResponse.status === 400) {
      alert('Wrong email or password');
      setIsLoading(false);
      return;
    }
    login(data.token, data.role);
    history.push('/catalog');
  }

  function emailHandler(e) {
    setEmail(e.target.value);
    const em = e.target.value;
    if (password.length < 8 || !em.match(regexEmail)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    //console.log(disabled, password.length, email.match(regexEmail));
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
    const pw = e.target.value;
    if (pw.length < 8 || !email.match(regexEmail)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    //console.log(disabled, password.length, email.match(regexEmail));
  }

  return (
    <div className={styles.main}>
      {/* <div className={styles.background}>
        <div className={styles.shape}></div>
        <div class={styles.shape}></div>
      </div> */}
      <form className={styles.form} onSubmit={submit}>
        <h3>Вход</h3>
        <label htmlFor="email" className={styles.label}>
          Эл. почта
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
          Пароль
        </label>
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Введиет пароль"
          id="password"
          value={password}
          onInput={passwordHandler}
        />
        <button className={styles.button} type="submit" disabled={disabled}>
          {isLoading ? <div className={styles.loading}>Загрузка...</div> : 'Войти'}
        </button>
        <Link to="/registration">
          <button className={styles.buttonReg}>Регистрация</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
