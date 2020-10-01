import * as firebase from 'firebase';

// Optionally import the services that you want to use
import 'firebase/auth';
// import "firebase/database";
import 'firebase/firestore';
import 'firebase/functions';
// import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBI8Jfx1PxmVugevMNeH3DI2cxSjigOLTM',
  authDomain: 'cocorico-c7133.firebaseapp.com',
  databaseURL: 'https://cocorico-c7133.firebaseio.com',
  projectId: 'cocorico-c7133',
  storageBucket: 'cocorico-c7133.appspot.com',
  messagingSenderId: '20901951452',
  appId: '1:20901951452:web:d67205df4484d6786e8119',
  measurementId: 'G-H350MP78JE'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
