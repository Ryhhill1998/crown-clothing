import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutCard = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;

  const { removeItemFromCart, decreaseItemQuantity, addItemToCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(item);

  const decreaseQuantityHandler = () => decreaseItemQuantity(item);
  const increaseQuantityHandler = () => addItemToCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img className="item-image" src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseQuantityHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutCard;
