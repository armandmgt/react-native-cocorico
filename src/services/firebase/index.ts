/* eslint-disable import/no-duplicates */
import * as firebase from 'firebase';

import firebaseConfig from './firebaseConfig';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
