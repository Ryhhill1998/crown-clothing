import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  Image,
  Name,
  Quantity,
  Arrow,
  Price,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutCard = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;

  const { removeItemFromCart, decreaseItemQuantity, addItemToCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(item);

  const decreaseQuantityHandler = () => decreaseItemQuantity(item);
  const increaseQuantityHandler = () => addItemToCart(item);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image className="item-image" src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={decreaseQuantityHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseQuantityHandler}>&#10095;</Arrow>
      </Quantity>
      <Price className="price">{price}</Price>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutCard;
