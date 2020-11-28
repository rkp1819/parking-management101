import React from "react";
import { auth } from "./firebase";

import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { actionTypes } from "./reducer.js";
import { useStateValue } from "./StateProvider";
import { Redirect } from "react-router-dom";

const sendVerificationLink = () => {
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      alert("Sent!" + "📧");
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  typography: {
    textRendering: "optimizeLegibility",
    color: "#2c2c2c",
    fontFamily: "Times New Roman, Times, serif",
    letterSpacing: "0.03em",
  },
}));

function EmailVerification() {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();

  const loginAsGuest = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: "guest",
    });
    return <Redirect to={"/"} />;
  };

  return (
    <div>
      <center>
        <Paper color="transparent" elevation={5} className={classes.paper}>
          <Typography variant="h4" className={classes.typography}>
            Dear user, Kindly verify email address to proceed.
            <br />
            Send verification Link Now{" "}
            <span>
              <Button
                color="primary"
                variant="outlined"
                onClick={sendVerificationLink}
              >
                verify email
              </Button>
            </span>
          </Typography>
        </Paper>
        <Paper color="transparent" elevation={5} className={classes.paper}>
          <Typography variant="h4" className={classes.typography}>
            Change in mind, You can login as a Guest.{" "}
            <span>
              <Button
                color="secondary"
                variant="outlined"
                onClick={loginAsGuest}
              >
                Guest
              </Button>
            </span>
            <br />
          </Typography>
        </Paper>
      </center>
    </div>
  );
}

export default EmailVerification;
