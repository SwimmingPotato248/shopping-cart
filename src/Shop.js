import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Shop() {
  const [items, setItems] = useState([]);
  const { increaseItemQuantity } = useCart();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  if (items === []) return <h1>Loading</h1>;

  return (
    <div className="container">
      {items?.map((item) => {
        return (
          <div key={item.id} className="item-card">
            <div>
              <img src={item.image} alt="Item" height="100px" />
            </div>
            <div className="item-card-body">
              <p>{item.title}</p>
              <p>$ {item.price}</p>
              <Link to={`/shop/${item.id}`}>View more</Link>
              <button
                className="add-btn"
                onClick={() => {
                  increaseItemQuantity(item.id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
