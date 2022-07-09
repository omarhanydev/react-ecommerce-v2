import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";

const SignIn = () => {
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = createUserDocumentFromAuth(response.user);
      }
    },
    []
  );
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };
  const logGoogleUserRedirect = async () => {
    const { user } = await signInWithGoogleRedirect();
    const userDocRef = createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}></button>
      <button onClick={logGoogleUserRedirect}></button>
    </div>
  );
};

export default SignIn;
