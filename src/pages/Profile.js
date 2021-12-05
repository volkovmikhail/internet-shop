import React, { useContext, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../actions';
import { AuthContext } from '../AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Profile() {
  const { token, logout, role } = useContext(AuthContext);
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logoutHandler() {
    logout();
    history.push('/catalog');
  }

  return (
    <div>
      <Header active="profile" />
      <h1 className="title" style={{ marginBottom: '50px' }}>
        Profile
      </h1>
      <div className="container" style={{ height: '60vh' }}>
        <h2>Your personal data:</h2>
        <p className="title">Name: {user.name}</p>
        <p className="title">Lastname: {user.lastname}</p>
        <p className="title">Email: {user.email}</p>
        <button className="logoutBtn" style={{ marginTop: '50px' }} onClick={logoutHandler}>
          Log out
        </button>
        {role === 'ADMIN' ? (
          <Link to="/dashboard">
            <button className="logoutBtn" style={{ marginTop: '50px', marginLeft:'30px' }}>
              admin dashboard
            </button>
          </Link>
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
