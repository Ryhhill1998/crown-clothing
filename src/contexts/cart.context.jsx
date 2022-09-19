import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: {},
  setCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartItems: [],
    itemTotal: 0,
    open: false,
  });
  const value = { cart, setCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
