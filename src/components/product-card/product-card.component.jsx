import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  return (
    <div className="product-card-container">
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
