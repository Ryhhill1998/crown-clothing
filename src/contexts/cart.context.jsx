import { useEffect } from "react";
import { createContext, useState } from "react";

import _ from "lodash";

const addItem = (items, itemToAdd) => {
  const deepCopyItems = _.cloneDeep(items);
  const foundItem = deepCopyItems.find((item) => item.id === itemToAdd.id);
  foundItem
    ? foundItem.quantity++
    : deepCopyItems.push({ ...itemToAdd, quantity: 1 });
  return deepCopyItems;
};

const removeItem = (items, itemToRemove) =>
  _.cloneDeep(items).filter((item) => item.id !== itemToRemove.id);

const decreaseItem = (items, itemToDecrease) => {
  const deepCopyItems = _.cloneDeep(items);
  const foundItem = deepCopyItems.find((item) => item.id === itemToDecrease.id);
  foundItem.quantity--;
  if (foundItem.quantity === 0) {
    return removeItem(deepCopyItems, foundItem);
  }
  return deepCopyItems;
};

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  decreaseItemQuantity: () => {},
  cartItemCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(count);
    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addItem(cartItems, productToAdd));

  const removeItemFromCart = (productToRemove) =>
    setCartItems(removeItem(cartItems, productToRemove));

  const decreaseItemQuantity = (productToDecrease) =>
    setCartItems(decreaseItem(cartItems, productToDecrease));

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
