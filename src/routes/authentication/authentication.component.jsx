import "./authentication.styles.scss";
import SignUpForm from "../../components/sign-up/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";

// import {
//   //   auth,
//   signInWithGooglePopup,
//   //   signInWithGoogleRedirect,
//   createUserDocFromAuth,
// } from "../../utils/firebase/firebase.utils";

// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

const Authentication = () => {
  //   useEffect(() => {
  //     (async () => {
  //       const response = await getRedirectResult(auth);
  //       if (!response) return;
  //       const { user } = response;
  //       await createUserDocFromAuth(user);
  //     })();
  //   }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
