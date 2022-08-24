import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  const { cart, increaseItemQuantity, decreaseItemQuantity, removeFromCart } =
    useCart();

  return (
    <div>
      {cart.map((cartItem) => {
        const product = products.find((e) => e.id === cartItem.id);
        if (product === undefined) {
          return null;
        }
        return (
          <div className="cart-item-card" key={product.id}>
            <img src={product.image} alt="product" width="75px"></img>
            <div className="cart-item-card-body">
              <p>{product.title}</p>
              <div className="btn-group">
                <button
                  onClick={() => {
                    decreaseItemQuantity(cartItem.id);
                  }}
                >
                  -
                </button>
                <p>x{cartItem.quantity}</p>
                <button
                  onClick={() => {
                    increaseItemQuantity(cartItem.id);
                  }}
                >
                  +
                </button>
              </div>
              <p>Item cost: ${cartItem.quantity * product.price}</p>
            </div>
            <button
              className="remove-from-cart-btn"
              onClick={() => {
                removeFromCart(cartItem.id);
              }}
            >
              Remove from cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
