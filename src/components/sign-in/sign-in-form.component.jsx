import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithFacebookPopup,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFIelds] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFIelds(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFIelds({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/user-not-found")
        alert("A user with that email cannot be found");
      if (err.code === "auth/wrong-password") alert("Incorrect password");
      console.error(err.message);
    }
  };

  const logInGooglePopup = async () => await signInWithGooglePopup();

  const logInFacebookPopup = async () => await signInWithFacebookPopup();

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <h3>Sign in with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            name: "email",
            onChange: handleChange,
            value: email,
            type: "email",
            required: true,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            name: "password",
            onChange: handleChange,
            minLength: "6",
            value: password,
            type: "password",
            required: true,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            buttonOptions={{
              onClick: logInGooglePopup,
            }}
          >
            <span>
              <FontAwesomeIcon icon={faGoogle} /> Sign In
            </span>
          </Button>
          <Button
            type="button"
            buttonType="facebook"
            buttonOptions={{
              onClick: logInFacebookPopup,
            }}
          >
            <span>
              <FontAwesomeIcon icon={faFacebook} /> Sign In
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
