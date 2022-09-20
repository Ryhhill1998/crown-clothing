import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => addItemToCart(product);

  return (
    <div className="product-card-container" onClick={addToCartHandler}>
      <img src={imageUrl} alt={`${name}`} />

      <div className="footer">
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <Button type="button" buttonType="inverted">
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
