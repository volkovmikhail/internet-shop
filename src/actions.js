import { FETCH_WEARS, ADD_TO_CART, DELETE_FROM_CART, FETCH_USERDATA } from './actionTypes';

export function fetchWears() {
  return async (dispatch) => {
    const data = await (await fetch('/api/wears')).json();
    dispatch({
      type: FETCH_WEARS,
      payload: data,
    });
  };
}

export function addToCart(id) {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: id,
    });
  };
}

export function deleteFromCart(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_FROM_CART,
      payload: id,
    });
  };
}

export function fetchUserData(token) {
  return async (dispatch) => {
    const data = await (
      await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    dispatch({
      type: FETCH_USERDATA,
      payload: data,
    });
  };
}
