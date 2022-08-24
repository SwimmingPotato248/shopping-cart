import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ItemDetail() {
  const { id } = useParams();
  const { increaseItemQuantity } = useCart();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div style={{ maxWidth: "800px" }}>
        <img src={product.image} alt="Product" height="200px"></img>
        <h1>Product: {product.title}</h1>
        <h2>Category: {product.category}</h2>
        <p>{product.description}</p>
        <button
          className="add-btn"
          onClick={() => {
            increaseItemQuantity(product.id);
            navigate("../shop");
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
