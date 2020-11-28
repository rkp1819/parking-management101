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
import { Redirect } from "react-router-dom";
import { actionTypes } from "./reducer.js";
import { useStateValue } from "./StateProvider";
import { db, storage, auth, googleProvider } from "./firebase";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  signin_root_parent: {},
  signin_root: {
    position: "absolute !important",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  gButton: {
    margin: theme.spacing(1, 0, 2),
  },
  copyright: {
    color: "white",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function Copyright() {
    const [{ user }, dispatch] = useStateValue();
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.copyright}
        align="center"
      >
        {"Copyright © "}
        <Link
          color="inherit"
          onClick={() => {
            dispatch({
              type: actionTypes.SET_USER,
              user: "guest",
            });
          }}
        >
          LikhitPhotography
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <div className={classes.signin_root_parent}>
      <Container className={classes.signin_root} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={signIn} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <div className={classes.gButton} onClick={props.googleLogin}>
              <GoogleButton />
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
