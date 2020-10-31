/* eslint-disable import/no-duplicates */
import * as firebase from 'firebase';
import * as Random from 'expo-random';
import Base64 from 'Base64';

import type { Profile } from '@cocorico/constants/types';

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
export const storage = firebase.storage();

interface FirebaseReturn {
  success: boolean;
  payload?: any;
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
      await auth.signOut();
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  askResetPassword: async (email: string): Promise<FirebaseReturn> => {
    try {
      await auth.sendPasswordResetEmail(email);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  register: async (
    email: string,
    password: string,
    profile: Profile,
  ): Promise<FirebaseReturn> => {
    try {
      const { firstName, lastName } = profile;
      const result = await auth.createUserWithEmailAndPassword(email, password);

      const doc = firestore.collection('users').doc(email);
      await doc.set({ firstName, lastName });

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
  saveProfile: async (
    email: string,
    profile: Profile,
  ): Promise<FirebaseReturn> => {
    try {
      const { firstName, lastName, genre, profilePic } = profile;
      let { profilePicUrl } = profile;

      if (profilePic) {
        console.log(profilePic.length);
        const response = await fetch(profilePic);
        const blob = await response.blob();
        const ref = storage.ref().child(`profileImages/${email}`);
        const uploadTask = ref.put(blob, { contentType: 'image/jpeg' });
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (
          snapshot,
        ) {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + '% done');
        });
        const snapshot = await uploadTask;
        profilePicUrl = await snapshot.ref.getDownloadURL();
        console.log(profilePicUrl);
      }

      const doc = firestore.collection('users').doc(email);
      await doc.set({ firstName, lastName, genre, profilePicUrl });

      return {
        success: true,
        payload: { ...profile, profilePicUrl },
      };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  },
});

export default Firebase;
