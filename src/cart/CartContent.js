import React from "react";
import CartItem from "./item/CartItem";

function CartContent({ cart }) {
    return (
        <div className="container" style={{ display: "flex", flexDirection: "column" }}>
            {cart.map((wear,index) => {
                return (
                    <CartItem
                        id={wear._id}
                        key={index}
                        url={wear.images[0]}
                        title={wear.title}
                        price={wear.price}
                        currency={wear.currency}
                        count={wear.count}
                    />
                );
            })}
        </div>
    );
}

export default CartContent;
