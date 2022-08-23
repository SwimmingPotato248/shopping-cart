import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ItemDetail() {
  const { id } = useParams();
  const { increaseItemQuantity } = useCart();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  return (
    <div style={{ width: "800px" }}>
      <img src={product.image} alt="Product" height="200px"></img>
      <h1>Product: {product.title}</h1>
      <h2>Category: {product.category}</h2>
      <p>{product.description}</p>
      <button
        onClick={() => {
          increaseItemQuantity(id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
