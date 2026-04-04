import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign up using email and pass
  const signupUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in using email and pass
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google login
  const provider = new GoogleAuthProvider();
  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //   logout user
  const logOut = () => {
    return signOut(auth);
  };

  //   update user profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const forgetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        // Fetch the role from your MongoDB
        try {
          const res = await fetch(
            `http://localhost:3000/users/${currentUser.email}`,
          );
          const dbData = await res.json();

          // Merge Firebase user with MongoDB role
          setUser({ ...currentUser, ...dbData });
        } catch (err) {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    signupUser,
    signinUser,
    signinWithGoogle,
    logOut,
    updateUser,
    setUser,
    user,
    loading,
    forgetPass,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
