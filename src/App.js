import React, { useEffect, useState } from "react";
import firebase from "firebase";
//Components
import AppBar from "./AppBar";
import AdvancedGrid from "./AdvancedGrid";
import Login from "./Login";
import EmailVerification from "./EmailVerification";
import ProfileStatistics from "./ProfileStatistics";
import ImageGrid from "./ImageGrid";
//Styles
import "./App.css";
//Keys and State variables
import { db, storage, auth, googleProvider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
//material-ui Dependencies
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  //backdrop styles
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  //mui styles
  const classes = useStyles();
  //local state variables
  const [{ user }, dispatch] = useStateValue();
  const [view, setView] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
      setView(true);
    });
  }, []);

  return view ? (
    user ? (
      user.emailVerified || user == "guest" ? (
        <div className="app">
          <AppBar />
          <AdvancedGrid />
          <ProfileStatistics />
          <ImageGrid />

          {/* testing stuff */}
        </div>
      ) : (
        <EmailVerification />
      )
    ) : (
      <div>
        <Login />
      </div>
    )
  ) : (
    <Backdrop className={classes.backdrop} open={!view}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default App;
