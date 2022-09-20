import { createContext, useState } from "react";

const addCartItem = (items, itemToAdd) => {
  const cartItems = [...items];
  const foundItem = cartItems.find((item) => item.id === itemToAdd.id);
  foundItem
    ? foundItem.quantity++
    : cartItems.push({ ...itemToAdd, quantity: 1 });
  return cartItems;
};

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
  increaseCartItemCount: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    increaseCartItemCount();
  };

  const increaseCartItemCount = () => setCartItemCount(cartItemCount + 1);

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
