/* eslint-disable import/no-duplicates */
import * as firebase from 'firebase';

import type {
  AuthStatus,
  Profile,
  UserData,
  UserImages,
} from '@cocorico/constants/types';

import firebaseConfig from './firebaseConfig';
import { normalizeUser } from './firebaseUtils';

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
      const userDoc = firestore.collection('users').doc(email);
      await userDoc.set({ ...profile }, { merge: true });

      return {
        success: true,
        payload: profile,
      };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  },
  saveImages: async (
    email: string,
    userImages: UserImages,
  ): Promise<FirebaseReturn> => {
    try {
      const userDoc = firestore.collection('users').doc(email);
      const imageUrls = await Promise.all(
        userImages.pictures.map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();

          const storageKey = `profileImages/${email}/${index}.jpg`;
          const ref = storage.ref().child(storageKey);
          const snapshot = await ref.put(blob, { contentType: 'image/jpeg' });

          const imageUrl = await snapshot.ref.getDownloadURL();

          return imageUrl;
        }),
      );
      userDoc.set({ pictures: imageUrls }, { merge: true });

      return {
        success: true,
        payload: { pictures: imageUrls },
      };
    } catch (error) {
      return { success: false, error };
    }
  },
  subscribeAuth: (callback: (status: AuthStatus) => void): (() => void) => {
    return auth.onAuthStateChanged((authUser) => {
      if (authUser) callback('LOGGED_IN');
      else callback('LOGGED_OUT');
    });
  },
  subscribeCurrentUser: (callback: (user: UserData) => void): (() => void) => {
    const { currentUser } = auth;

    if (!currentUser || !currentUser.email) {
      throw new Error('currentUser.email missing');
    }

    const doc = firestore.collection('users').doc(currentUser.email);

    return doc.onSnapshot((snapshot) => {
      const data = snapshot.data()!;
      const normalizedUser = normalizeUser(doc.id, data);

      callback(normalizedUser);
    });
  },
  getMessages: async (): Promise<FirebaseReturn> => {
    const { currentUser } = auth;

    if (!currentUser || !currentUser.email) {
      throw new Error('currentUser.email missing');
    }

    try {
      const userDoc = await firestore
        .collection('users')
        .doc(currentUser.email)
        .get();
      const convRefs = await userDoc.data()?.conversations;
      let conversations;

      if (convRefs && convRefs.length !== 0) {
        conversations = await Promise.all(
          convRefs.map(async (convRef: any) => (await convRef.get()).data()),
        );
      }
      return { success: true, payload: conversations };
    } catch (error) {
      return { success: false, error };
    }
  },
  getOtherProfiles: async (currentUser: UserData): Promise<FirebaseReturn> => {
    const allDocs = await firestore.collection('users').get();
    const otherProfiles: UserData[] = [];

    try {
      allDocs.forEach((doc) => {
        const data = doc.data();
        if (doc.id === currentUser.id || currentUser.likes?.includes(doc.id))
          return;
        const normalizedUser = normalizeUser(doc.id, data);

        otherProfiles.push(normalizedUser);
      });

      return { success: true, payload: otherProfiles };
    } catch (error) {
      return { success: false, error };
    }
  },
  addLikeToProfile: async (newLikeId: string): Promise<void> => {
    const { currentUser } = auth;

    if (!currentUser || !currentUser.email) {
      throw new Error('currentUser.email missing');
    }

    console.log('addliketoprofile');
    const doc = firestore.collection('users').doc(currentUser.email);
    await doc.update({
      likes: firebase.firestore.FieldValue.arrayUnion(newLikeId),
    });
  },

  createConversation: async (userIds: string[]): Promise<void> => {
    console.log('Create Conversation for users :', userIds);
  },
});

export default Firebase;
