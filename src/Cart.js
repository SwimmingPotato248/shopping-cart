import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setIsLoading(false);
      });
  }, []);
  const { cart, increaseItemQuantity, decreaseItemQuantity, removeFromCart } =
    useCart();
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    if (cart.length !== 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [cart]);
  if (isEmpty) {
    return <h1>Cart is empty</h1>;
  }

  function getTotalCost() {
    let total = 0;
    cart.forEach((item) => {
      total +=
        item.quantity *
        products.find((product) => product.id === item.id)?.price;
    });
    return total.toFixed(2);
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

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
      <p>Total Cost: ${getTotalCost()}</p>
    </div>
  );
}
