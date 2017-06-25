import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyANeS3nvKCxUrwwY6ZIipdOtelu20zzfUw",
  authDomain: "curish-c6e6f.firebaseapp.com",
  databaseURL: "https://curish-c6e6f.firebaseio.com",
  projectId: "curish-c6e6f",
  storageBucket: "curish-c6e6f.appspot.com",
  messagingSenderId: "796380206376"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;