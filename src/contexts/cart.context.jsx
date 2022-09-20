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

const removeItem = (items, itemToRemove) => {
  const deepCopyItems = _.cloneDeep(items);
  return deepCopyItems.filter((item) => item.id !== itemToRemove.id);
};

const updateItem = (items, itemToUpdate, updateType) => {
  const deepCopyItems = _.cloneDeep(items);
  const foundItem = deepCopyItems.find((item) => item.id === itemToUpdate.id);
  updateType === "increase" ? foundItem.quantity++ : foundItem.quantity--;
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
  updateItemQuantity: () => {},
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

  const updateItemQuantity = (productToUpdate, updateType) =>
    setCartItems(updateItem(cartItems, productToUpdate, updateType));

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
