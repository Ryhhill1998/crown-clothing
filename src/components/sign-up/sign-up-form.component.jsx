import "./sign-up-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFIelds] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFIelds(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFIelds({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) alert("Passwords do not match!");

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      user.displayName = displayName;
      console.log(user);
      await createUserDocFromAuth(user);
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user. Email already in use");
      }
      alert(err.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <h3>Sign up with your email and password</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          inputOptions={{
            name: "displayName",
            onChange: handleChange,
            value: displayName,
            type: "text",
            required: true,
          }}
        />
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
        <FormInput
          label="Confirm password"
          inputOptions={{
            name: "confirmPassword",
            onChange: handleChange,
            minLength: "6",
            value: confirmPassword,
            type: "password",
            required: true,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
