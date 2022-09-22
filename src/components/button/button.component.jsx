import {
  BaseButton,
  GoogleSignInButton,
  FacebookSignInButton,
  InvertedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  facebook: "facebook-sign-in",
  inverted: "inverted",
};

const getButton = (type = BUTTON_TYPE_CLASSES.base) => {
  const buttonTypes = {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.facebook]: FacebookSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  };

  console.log(type);
  console.log(buttonTypes[type]);

  return buttonTypes[type];
};

const Button = ({ children, buttonType, buttonOptions }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...buttonOptions}>{children}</CustomButton>;
};

export default Button;
