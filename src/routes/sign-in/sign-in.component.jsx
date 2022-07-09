import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>google sign in</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
