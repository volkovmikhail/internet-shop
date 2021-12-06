import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../AuthContext';
import { fetchWears } from '../../actions';

function Wears() {
  const store = useSelector((s) => s);
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
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
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>Title</td>
            <td>Price</td>
            <td>Currency</td>
            <td>Category</td>
            <td>discription</td>
            <td>Delete</td>
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
                  <td>{w.price}</td>
                  <td>{w.currency}</td>
                  <td>{w.category}</td>
                  <td>{w.discription}</td>
                  <td>
                    <button className="logoutBtn" onClick={() => deleteWear(w._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Wears;
