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

interface FirebaseReturn {
  payload?: any;
  success: boolean;
  error?: Error;
}

const Firebase = Object.freeze({
  doesUserExist: async (email: string): Promise<boolean> => {
    const doc = await firestore.collection('users').doc(email).get();

    return doc.exists;
  },
  login: async (email: string, password: string): Promise<FirebaseReturn> => {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      return {
        success: true,
        payload: result,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  logout: async (): Promise<FirebaseReturn> => {
    try {
      const result = await auth.signOut();
      return {
        success: true,
        payload: result,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
});

export default Firebase;
