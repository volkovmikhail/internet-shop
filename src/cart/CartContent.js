import React from 'react';
import CartItem from './item/CartItem';

function CartContent({ cart, isDisableDelete }) {
  const tmpArray = [];

  function itemCheck(item) {
    if (tmpArray.indexOf(item._id + item.size) === -1) {
      tmpArray.push(item._id + item.size);
      return true;
    }
    return false;
  }

  const deepCopy = JSON.parse(JSON.stringify(cart));
  const uniqueCartItems = deepCopy.filter((item) => itemCheck(item));
  const copyCart = uniqueCartItems.map((wear) => {
    const doublicateCount = cart.filter((initWear) => initWear._id === wear._id && initWear.size === wear.size).length;
    if (doublicateCount !== 1) {
      wear.count = doublicateCount;
    }
    return wear;
  });

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      {copyCart.map((wear, index) => {
        return (
          <CartItem
            id={wear._id}
            index={index}
            key={index}
            url={wear.images[0]}
            title={wear.title}
            price={wear.price}
            currency={wear.currency}
            size={wear.size}
            count={wear.count}
            isDisableDelete={isDisableDelete}
          />
        );
      })}
    </div>
  );
}

export default CartContent;
