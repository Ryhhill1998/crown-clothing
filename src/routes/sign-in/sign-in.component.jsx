import "./sign-in.styles.scss";
import SignUpForm from "../../components/sign-up/sign-up-form.component";
import Button from "../../components/button/button.component";

import {
  //   auth,
  signInWithGooglePopup,
  //   signInWithGoogleRedirect,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
  //   useEffect(() => {
  //     (async () => {
  //       const response = await getRedirectResult(auth);
  //       if (!response) return;
  //       const { user } = response;
  //       await createUserDocFromAuth(user);
  //     })();
  //   }, []);

  const logInGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  };

  return (
    <div>
      <h1>Welcome to the sign in page</h1>
      <Button
        buttonType="google"
        buttonOptions={{
          onClick: logInGooglePopup,
        }}
      >
        Sign In with Google PopUp
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
