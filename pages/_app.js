import "../styles/globals.css";
import { auth, db } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth"
import SignIn from "../components/SignInForm";
import Loading from "../components/Loading";
import firebase from "firebase/compat/app";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function MyApp({ Component, pageProps }) {
 

  // useAuthState returns array of 3, first is user, second is loading, third is error
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const c = collection(db, "users");

      setDoc(
        doc(c, user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true } // update fields if exists
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <SignIn />;

  return <Component {...pageProps} />;
}

export default MyApp;
