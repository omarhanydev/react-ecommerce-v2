import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjJ2tTgYqvrIl1RmTuTW98GUhwslS7Nf4",
  authDomain: "react-crwn-db-dd7dc.firebaseapp.com",
  projectId: "react-crwn-db-dd7dc",
  storageBucket: "react-crwn-db-dd7dc.appspot.com",
  messagingSenderId: "490608180145",
  appId: "1:490608180145:web:93e3b38891379b87659b90",
  measurementId: "G-E36GGJZNNC",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);

    // if user data doesn't exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.error('error creating user', error.message);
        }
    }

    // return data if exists / created

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
};