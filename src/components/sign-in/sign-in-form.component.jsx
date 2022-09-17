import { useState, useContext } from "react";
import {
  auth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFIelds] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

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
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(user);
      setCurrentUser(user);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/user-not-found")
        alert("A user with that email cannot be found");
      if (err.code === "auth/wrong-password") alert("Incorrect password");
      console.error(err.message);
    }
  };

  const logInGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  };

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
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
