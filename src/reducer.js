import { ADD_TO_CART, DELETE_FROM_CART, FETCH_WEARS } from './actionTypes';

const initState = {
  catalog: [],
  cart: [],
};

export default function reducer(store = initState, action) {
  switch (action.type) {
    case FETCH_WEARS:
      return {
        ...store,
        catalog: [...action.payload],
      };
    case ADD_TO_CART:
      let newItem = store.catalog.filter((i) => i._id === action.payload);
      let cart = store.cart;
      let isFind = false;
      if (cart) {
        const newCart = cart.map((i) => {
          let newI = i;
          if (i._id === newItem[0]._id) {
            newI.count = newI.count + 1;
            isFind = true;
          }
          return newI;
        });
        if (isFind) {
          return {
            ...store,
            cart: newCart,
          };
        } else {
          newItem[0].count = 1;
          return {
            ...store,
            cart: [newItem[0], ...newCart],
          };
        }
      } else {
        newItem[0].count = 1;
        return {
          ...store,
          cart: [newItem[0]],
        };
      }
    case DELETE_FROM_CART:
      let ccart = store.cart;
      let newCart = [];
      ccart.forEach((i) => {
        if (i._id === action.payload) {
          if (i.count === 1) {
            return;
          }
          i.count--;
          newCart.push(i);
        } else {
          newCart.push(i);
        }
      });
      return {
        ...store,
        cart: newCart,
      };
    default:
      return store;
  }
}
