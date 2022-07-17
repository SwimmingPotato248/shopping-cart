import React, { useEffect, useState } from "react";
import Product from "./Product";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [inputCount, setInputCount] = useState([{ id: 0, count: 0 }]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }

    getProducts();
  }, []);

  useEffect(() => {
    const newCart = products.map((product) => {
      return { product: product, itemCount: 0 };
    });
    setCart(newCart);
  }, [products]);

  useEffect(() => {
    const newCount = products.map((product) => {
      return { id: product.id, count: 1 };
    });
    setInputCount(newCount);
    console.log(newCount);
  }, [products]);

  function handleValue(id) {
    const item = inputCount.find((product) => product.id === id);
    if (!item) {
      return 1;
    }
    return item.count;
  }

  function handleChange(evt) {
    const newCount = inputCount.map((e) => {
      if (e.id === parseInt(evt.target.name)) {
        return {
          id: parseInt(evt.target.name),
          count: parseInt(evt.target.value),
        };
      }
      return e;
    });
    console.log(newCount);
    setInputCount(newCount);
  }

  function handleClick(evt) {
    const newCart = cart.map(e => {
      if (e.product.id === parseInt(evt.target.name)) {
        const count = handleValue(e.product.id);
        const newCount = e.itemCount + count
        return { product: e.product, itemCount: newCount }
      }
      return e
    })
    setCart(newCart)
    console.log(newCart)
  }

  return (
    <div className="App">
      <div className="products-container">
        {products.map((e) => {
          return (
            <div key={e.id}>
              <Product
                title={e.title}
                description={e.description}
                image={e.image}
                price={e.price}
              />
              <label htmlFor="quantity">Qty</label>
              <input
                type="number"
                min={1}
                value={handleValue(e.id)}
                name={e.id}
                onChange={handleChange}
              ></input>
              <button name={e.id} onClick={handleClick}>Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
