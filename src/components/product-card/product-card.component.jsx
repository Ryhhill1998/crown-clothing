import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  ProductCardContainer,
  Image,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => addItemToCart(product);

  return (
    <ProductCardContainer onClick={addToCartHandler}>
      <Image src={imageUrl} alt={name} />

      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button type="button" buttonType="inverted">
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
