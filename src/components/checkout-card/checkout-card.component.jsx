import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-card.styles.scss";

const CheckoutCard = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;

  const { removeItemFromCart, updateItemQuantity } = useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(item);

  const updateItemHandler = (event) => {
    const updateType = event.target.className;
    updateItemQuantity(item, updateType);
  };

  return (
    <div className="checkout-card-container">
      <img className="item-image" src={imageUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <span className="quantity">
        <button className="decrease" onClick={updateItemHandler}>
          {"<"}
        </button>
        {quantity}
        <button className="increase" onClick={updateItemHandler}>
          {">"}
        </button>
      </span>
      <span className="price">{price}</span>
      <button className="remove-item" onClick={removeItemHandler}>
        X
      </button>
    </div>
  );
};

export default CheckoutCard;
