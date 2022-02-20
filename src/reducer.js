import { ADD_TO_CART, CLEAR_CART, DELETE_FROM_CART, FETCH_USERDATA, FETCH_WEARS } from './actionTypes';

const initState = {
  catalog: [],
  cart: [],
  user: {},
};

export default function reducer(store = initState, action) {
  switch (action.type) {
    case FETCH_WEARS:
      return {
        ...store,
        catalog: [...action.payload],
      };
    case ADD_TO_CART:
      let newItem = store.catalog.filter((i) => i._id === action.payload.id);
      newItem[0].size = action.payload.size;
      const cart = store.cart;
      if (cart) {
        return {
          ...store,
          cart: [newItem[0], ...cart],
        };
      } else {
        return {
          ...store,
          cart: [newItem[0]],
        };
      }
    case DELETE_FROM_CART:
      let newCart = [...store.cart];
      newCart.splice(action.payload, 1);
      return {
        ...store,
        cart: newCart,
      };
    case FETCH_USERDATA:
      return {
        ...store,
        user: action.payload,
      };
    case CLEAR_CART:
      return {
        ...store,
        cart: [],
      };
    default:
      return store;
  }
}
