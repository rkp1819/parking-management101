import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR5KqN2bLHzQoZ6HlWkQVlkprTQAaqWV4",
  authDomain: "parking-management101.firebaseapp.com",
  databaseURL: "https://parking-management101.firebaseio.com",
  projectId: "parking-management101",
  storageBucket: "parking-management101.appspot.com",
  messagingSenderId: "127679383823",
  appId: "1:127679383823:web:8a31a592bedc19ebdd567a",
  measurementId: "G-T12WTCN8P9",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
// const twitterProvider = new firebase.auth.TwitterAuthProvider();

export { db, storage, auth, googleProvider };
