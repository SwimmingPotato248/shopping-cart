import React, { useEffect, useState } from "react";
import Product from "./Product";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  return <div className="App">
    {console.log(products)}
    {products.map((e) => {
      return <Product key={e.id} title={e.title} description={e.description} image={e.image} price={e.price} />
    })}
  </div>
}

export default App;
