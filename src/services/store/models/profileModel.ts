import { Alert } from 'react-native';

import { createModel } from '@rematch/core';

import { auth, firestore } from '@cocorico/services/firebase';

import { RootModel } from './types';

interface ProfileState {
  firstname: string;
  lastname: string;
}

const profileModel = createModel<RootModel>()({
  state: {
    firstname: '',
    lastname: '',
  } as ProfileState,
  reducers: {
    setNames(state, payload: { firstname: string; lastname: string }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    async createUser(payload: { password: string }, state) {
      const { password } = payload;
      const {
        auth: { email },
        profile: { firstname, lastname },
      } = state;
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        const doc = firestore.collection('users').doc(email);
        await doc.set({ firstname, lastname });
      } catch (err) {
        Alert.alert(err);
      }
    },
  },
});

export type ProfileModelType = typeof profileModel;
export default profileModel;
