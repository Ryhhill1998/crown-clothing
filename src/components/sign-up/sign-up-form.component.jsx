import "./sign-up-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFIelds] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setAdditionalUserInfo } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFIelds(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFIelds({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setAdditionalUserInfo({ displayName });
      await createAuthUserWithEmailAndPassword(email, password);
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
