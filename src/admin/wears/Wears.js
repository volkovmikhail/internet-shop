import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../AuthContext';
import { fetchWears } from '../../actions';
import WearFrom from '../WearForm';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

function Wears() {
  const store = useSelector((s) => s);
  const [wears, setWears] = useState([...store.catalog]);
  const [articul, setArticul] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [id, setId] = useState('');
  //я заебался надо отдахнуть....
  useEffect(() => {
    dispatch(fetchWears());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteWear(id) {
    await fetch(`/api/wear/delete/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'DELETE',
    });
    await dispatch(fetchWears());
    alert.info('Товар удалён');
    setWears([...store.catalog.filter((i) => i._id !== id)]);
  }

  function search(e) {
    const value = e.target.value;
    setWears([...store.catalog.filter((i) => i._id.substring(i._id.length - 8).includes(value.toLowerCase().trim()))]);
    setArticul(value);
  }

  return (
    <div className="container">
      {id ? (
        <div>
          <button className="logoutBtn" onClick={() => setId('')}>
            Назад к списку
          </button>
          <WearFrom id={id} isUpdate={true} wears={store.catalog} />
        </div>
      ) : (
        <Fragment>
          <input
            type="text"
            className="input"
            style={{ marginBottom: '25px' }}
            placeholder="Поиск по артикулу"
            value={articul}
            onInput={search}
          />
          <table>
            <thead>
              <tr>
                <td>Артикул</td>
                <td>Название</td>
                <td>Цена</td>
                <td>Category</td>
                <td>М/Ж</td>
                <td>Кол-во</td>
                <td>Описание</td>
                <td>Редактировать</td>
                <td>Удалить</td>
              </tr>
            </thead>
            <tbody>
              {store.catalog.length === 0 ? (
                <div className="loader" />
              ) : (
                wears.map((w, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/item/${w._id}`}>{w._id.substring(w._id.length - 8)}</Link>
                      </td>
                      <td>{w.title}</td>
                      <td>
                        {w.price} {w.currency}
                      </td>
                      <td>{w.category}</td>
                      <td>{w.sex ? 'М' : 'Ж'}</td>
                      <td>{w.quantity}</td>
                      <td>{w.discription}</td>
                      <td>
                        <button className="logoutBtn" onClick={() => setId(w._id)}>
                          Редактировать
                        </button>
                      </td>
                      <td>
                        <button
                          className="logoutBtn"
                          onClick={() => {
                            deleteWear(w._id);
                          }}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}

export default Wears;
