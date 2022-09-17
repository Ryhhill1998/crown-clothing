import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLCGag6nMFNbIbdb22caLliv6Fr60rjH8",
  authDomain: "crown-clothing-db-dbef4.firebaseapp.com",
  projectId: "crown-clothing-db-dbef4",
  storageBucket: "crown-clothing-db-dbef4.appspot.com",
  messagingSenderId: "784840246338",
  appId: "1:784840246338:web:3d0965ed0ef32ffebc19db",
};

const firebaseApp = initializeApp(firebaseConfig);

// Login authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = async () =>
  signInWithRedirect(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

// Database maintenance
export const db = getFirestore(firebaseApp);

export const createUserDocFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    const docRef = await addDoc(collection(db, "users"), {
      displayName,
      email,
      createdAt,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e.message);
  }
};

export const getUserDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
