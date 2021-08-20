import firebase from "firebase/app";
import "firebase/auth";

//init firebase
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});
//init the auth service
export const auth = app.auth();
export default app;
