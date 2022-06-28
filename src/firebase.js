import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgNd87W092g_64krndm-zRVorh6qc2SLA",
  authDomain: "clone-b13d8.firebaseapp.com",
  projectId: "clone-b13d8",
  storageBucket: "clone-b13d8.appspot.com",
  messagingSenderId: "506068898694",
  appId: "1:506068898694:web:593811bea7c446d8915207",
  measurementId: "G-2Q27PGC3F6"
};

const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=app.auth();

export {auth};
export default db;
