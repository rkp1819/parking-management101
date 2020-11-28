import React, { useState } from "react";
import "./Login.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db, storage, auth, googleProvider } from "./firebase";

import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { MergeType } from "@material-ui/icons";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const googleLogin = (userRole) => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        db.collection("clients")
          .where("email", "==", result.user.email)
          .get()
          .then((snapshot) => {
            if (snapshot.exits) {
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
        if (typeof userRole == "string") {
          db.collection("user_role")
            .doc(result.user.uid)
            .set({ uid: result.user.uid, role: userRole }, { merge: true });
        }
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
