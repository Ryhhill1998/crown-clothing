import "./sign-in.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  getUserDocs,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
    await getUserDocs();
  };

  return (
    <div>
      <h1>Welcome to the sign in page</h1>
      <button onClick={logInGoogleUser}>Sign In with Google PopUp</button>
    </div>
  );
};

export default SignIn;
