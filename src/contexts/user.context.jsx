import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  additionalUserInfo: {},
  setAdditionalUserInfo: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [additionalUserInfo, setAdditionalUserInfo] = useState({});
  const value = {
    currentUser,
    setCurrentUser,
    additionalUserInfo,
    setAdditionalUserInfo,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user, additionalUserInfo);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [additionalUserInfo]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
