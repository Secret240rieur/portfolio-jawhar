import React from "react";
import "./App.css";
import { Router } from "./pages/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useAuthUser } from "@react-query-firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCE8sicmNEmJGVqgOHmZlt5cnGF0BIuMRY",
  authDomain: "portfolio-28ccf.firebaseapp.com",
  projectId: "portfolio-28ccf",
  storageBucket: "portfolio-28ccf.appspot.com",
  messagingSenderId: "926754564760",
  appId: "1:926754564760:web:a08b3ce430f787a9f7beed",
  measurementId: "G-QMJ5QL1T9L",
};

const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
export const firestore = getFirestore(firebase);
export const auth = getAuth(firebase);

const queryClient = new QueryClient();

export const EmailContext = React.createContext<string | undefined | null>(
  null
);

function App() {
  const user = useAuthUser(["user"], auth);

  // if (user.isLoading) {
  //   return <div />;
  // }

  // if (user.data) {
  //   return <div>Welcome {user.data.displayName}!</div>;
  // }
  // const user = useAuthUser(["user"], auth, {
  //   onSuccess(user) {
  //     if (user) {
  //       console.log("User is authenticated!", user);
  //     }
  //   },
  //   onError(error) {
  //     console.error("Failed to subscribe to users authentication state!");
  //   },
  // });

  // if (user.isLoading) {
  //   return <div />;
  // }

  // if (user.data) {
  //   return <div>Welcome {user.data.displayName}!</div>;
  // }

  // return <div>Not signed in.</div>;

  return (
    // <QueryClientProvider client={queryClient}>
    <EmailContext.Provider value={user.data?.email}>
      <div className="App">
        <Router />
      </div>
    </EmailContext.Provider>
    // </QueryClientProvider>
  );
}

export default App;
