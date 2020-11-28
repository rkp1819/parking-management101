import React, { useState } from "react";
import "./Login.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db, storage, auth, googleProvider } from "./firebase";

import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const googleLogin = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        db.collection("clients")
          .where("email", "==", result.user.email)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              dispatch({
                type: actionTypes.SET_USER,
                user: {
                  ...result.user,
                  email: result.user.email,
                  displayName: result.user.displayName,
                  photoUrl: result.user.photoURL,
                },
              });
            } else {
              db.collection("clients")
                .doc()
                .set({
                  email: result.user.email,
                  displayName: result.user.displayName,
                  photoUrl: result.user.photoURL,
                })
                .then(
                  dispatch({
                    type: actionTypes.SET_USER,
                    user: {
                      ...result.user,
                      email: result.user.email,
                      displayName: result.user.displayName,
                      photoUrl: result.user.photoURL,
                    },
                  })
                );
            }
          });
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp googleLogin={googleLogin} />
          </Route>
          <Route path="/">
            <SignIn googleLogin={googleLogin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Login;
