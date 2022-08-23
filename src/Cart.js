import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  const { cart } = useCart();

  return (
    <div>
      {cart.map((cartItem) => {
        const product = products.find((e) => e.id === cartItem.id);
        if (product === undefined) {
          return null;
        }
        return (
          <div className="cart-item-card" key={product.id}>
            <img src={product.image} alt="product" height="75px"></img>
            <p>{product.title}</p>
            <p>x{cartItem.quantity}</p>
            <p>$ {cartItem.quantity * product.price}</p>
          </div>
        );
      })}
    </div>
  );
}
