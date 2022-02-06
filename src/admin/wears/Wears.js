import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../AuthContext';
import { fetchWears } from '../../actions';
import WearFrom from '../WearForm';

function Wears() {
  const store = useSelector((s) => s);
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
    dispatch(fetchWears());
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
        <table>
          <thead>
            <tr>
              <td>id</td>
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
              store.catalog.map((w, index) => {
                return (
                  <tr key={index}>
                    <td>{w._id}</td>
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
                      <button className="logoutBtn" onClick={() => deleteWear(w._id)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wears;
