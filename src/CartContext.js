import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function getItemQuantity(id) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id) {
    setCart((prevCart) => {
      if (prevCart.find((item) => item.id === id) == null) {
        return [...prevCart, { id, quantity: 1 }];
      } else {
        return prevCart.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    });
  }

  function decreaseItemQuantity(id) {
    setCart((prevCart) => {
      if (prevCart.find((item) => item.id === id)?.quantity === 1) {
        return prevCart.filter((item) => item.id !== id);
      } else {
        return prevCart.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  }

  function removeFromCart(id) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== id);
    });
  }

  function getTotalCart() {
    return cart.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cart,
        getTotalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
