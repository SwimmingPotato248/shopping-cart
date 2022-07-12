import React from "react";
import "./product.css";

export default function Product({ id, title, description, image, price }) {
  return (
    <div className="product">
      <div className="product-info">
        <h3>Title: {title}</h3>
        <div>Description: {description}</div>
        <div>Price: {price}</div>
      </div>
      <img src={image} alt="Product"></img>
    </div>
  );
}
