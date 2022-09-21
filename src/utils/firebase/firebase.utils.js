import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
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

// ---------- SIGN IN AUTHENTICATION ---------- //
const auth = getAuth(firebaseApp);

// google sign in
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = async () =>
  await signInWithRedirect(auth, googleProvider);

// facebook sign in
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup",
});

export const signInWithFacebookPopup = async () =>
  await signInWithPopup(auth, facebookProvider);

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

// ---------- SIGN UP AUTHENTICATION ---------- //
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

// update user display name
export const updateUserDisplayName = async (user, displayName) =>
  await updateProfile(user, { displayName });

// ---------- SIGN OUT AUTHENTICATION ---------- //
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err.message);
  }
};

// auth state changed listener
export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  onAuthStateChanged(auth, callback);
};

// ---------- DATABASE MAINTENANCE ---------- //
export const db = getFirestore(firebaseApp);

export const createUserDocFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;

  console.log("Creating user doc");

  console.log(additionalInfo);

  const userDocRef = doc(db, "users", userAuth.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
      console.log("created doc");
    } catch (e) {
      console.error("Error adding document: ", e.message);
    }
  }
};

export const getUserDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
