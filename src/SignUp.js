import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleButton from "./GoogleButton";
import { actionTypes } from "./reducer.js";
import { useStateValue } from "./StateProvider";
import { db, storage, auth, googleProvider } from "./firebase";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  signup_root: {
    position: "absolute !important",
    left: "50%",
    top: "50%",
    transform: `translate(-50%,${
      window.screen.height > window.screen.width ? "-40%" : "-50%"
    })`,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    background: `-webkit-linear-gradient(90deg,
      rgb(255, 255, 255, 0.8) 50%,
      rgb(255, 255, 255, 0.6) 80%)`,
    borderRadius: "1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  gButton: {
    margin: theme.spacing(1, 0, 2),
  },
  on_click_link: {
    cursor: "pointer",
  },
  copyright: {
    color: "white",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [{ user }, dispatch] = useStateValue();

  const loginAsGuest = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: "guest",
    });
    return <Redirect to={"/"} />;
  };

  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.copyright}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          className={classes.on_click_link}
          onClick={() => {
            dispatch({
              type: actionTypes.SET_USER,
              user: "guest",
            });
          }}
        >
          Parking Management
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const signUp = (event) => {
    //SignUP
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          console.log(authUser);
          dispatch({
            type: actionTypes.SET_USER,
            user: authUser,
          });

          db.collection("clients")
            .where("email", "==", authUser.user.email)
            .get()
            .then((snapshot) => {
              if (snapshot.exists) {
                console.log("user in db: " + authUser.user);
                dispatch({
                  type: actionTypes.SET_USER,
                  user: {
                    ...authUser.user,
                  },
                });
              } else {
                db.collection("clients")
                  .doc()
                  .set({
                    email: authUser.user.email,
                    displayName: authUser.user.displayName,
                    photoUrl: authUser.user.photoURL,
                  })
                  .then(() => {
                    console.log("updating user in db: " + authUser.user);
                    dispatch({
                      type: actionTypes.SET_USER,
                      user: {
                        ...authUser.user,
                      },
                    });
                  });
              }
            });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container className={classes.signup_root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={signUp}
          method="post"
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  let val = e.target.value;
                  setFirstName(val);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => {
                  let val = e.target.value;
                  setLastName(val);
                }}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                onChange={(e) => {
                  let val = e.target.value;
                  setEmail(val);
                }}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  let val = e.target.value;
                  setPassword(val);
                }}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <div className={classes.gButton} onClick={props.googleLogin}>
            <GoogleButton />
          </div>

          <Grid container>
            <Grid item xs>
              <Link
                onClick={loginAsGuest}
                className={classes.on_click_link}
                variant="body2"
              >
                Login as a Guest!
              </Link>
            </Grid>

            <Grid item xs>
              <Link href="/" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
