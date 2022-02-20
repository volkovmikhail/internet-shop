import { FETCH_WEARS, ADD_TO_CART, DELETE_FROM_CART, FETCH_USERDATA, CLEAR_CART } from './actionTypes';

export function fetchWears() {
  return async (dispatch) => {
    const data = await (await fetch('/api/wears')).json();
    dispatch({
      type: FETCH_WEARS,
      payload: data,
    });
  };
}

export function setWears(wears) {
  return (dispatch) => {
    dispatch({
      type: FETCH_WEARS,
      payload: wears,
    });
  };
}

export function addToCart(id, size) {
  return (dispatch) => {
    fetch(`/api/wear/popularity?id=${id}&popularity=${2}`, { method: 'PATCH' });
    dispatch({
      type: ADD_TO_CART,
      payload: { id, size },
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

export function clearCart() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
}
