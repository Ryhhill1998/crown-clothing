import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutCard from "../../components/checkout-card/checkout-card.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      {cartItems.map((item) => (
        <CheckoutCard key={item.id} item={item} />
      ))}
      <span className="total">{`Total: $${cartTotal}`}</span>
    </div>
  );
};

export default Checkout;
