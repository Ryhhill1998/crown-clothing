import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ hideCart }) => {
  return (
    <div className={`cart-dropdown-container ${hideCart ? "hidden" : ""}`}>
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
