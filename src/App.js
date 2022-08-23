import "./App.css";
import Home from "./Home";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";
import Cart from "./Cart";
import { Routes, Route, Link } from "react-router-dom";
import { useCart } from "./CartContext";

function App() {
  const { getTotalCart } = useCart();
  const totalItem = getTotalCart();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <Link to="/cart">
          <button id="cart-btn">
            <span id="cart-count">{totalItem}</span>
          </button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shop/:id" element={<ItemDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App;
