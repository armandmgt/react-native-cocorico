import { createModel } from '@rematch/core';

import Firebase from '@cocorico/services/firebase';

import { AuthStatus } from '@cocorico/constants/types';

import { RootModel } from './types';

interface FirestoreState {
  subscriptions: { [key: string]: () => void };
}

const INITIAL_STATE: FirestoreState = {
  subscriptions: {},
};

const firestoreModel = createModel<RootModel>()({
  state: INITIAL_STATE,
  reducers: {
    saveSubscription(state, payload: { target: string; cleaner: () => void }) {
      const { target, cleaner } = payload;

      return {
        ...state,
        subscriptions: { ...state.subscriptions, [target]: cleaner },
      };
    },
  },
  effects: (dispatch) => ({
    subscribeAuth() {
      const {
        firestore: { unsubscribeAll },
        auth: { setAuthStatus },
      } = dispatch;
      const callback = (status: AuthStatus) => {
        if (status === 'LOGGED_IN') this.subscribeCurrentUser();
        else if (status === 'LOGGED_OUT') unsubscribeAll();
        setAuthStatus(status);
      };

      Firebase.subscribeAuth(callback);
    },
    subscribeCurrentUser() {
      const {
        firestore: { saveSubscription },
        auth: { setUser },
      } = dispatch;

      saveSubscription({
        target: 'currentUser',
        cleaner: Firebase.subscribeCurrentUser(setUser),
      });
    },
    unsubscribe(payload: { target: string }, root) {
      const {
        firestore: { subscriptions },
      } = root;
      const { target } = payload;

      const cleaner = subscriptions[target];
      if (cleaner) cleaner();
    },
    unsubscribeAll(_, root) {
      const {
        firestore: { subscriptions },
      } = root;

      Object.values(subscriptions).forEach((cleaner) => {
        if (cleaner) cleaner();
      });
    },
    async getMessages() {
      const {
        messages: { setConversationsList },
      } = dispatch;

      const response = await Firebase.getMessages();

      if (response.success) {
        const { payload } = response;

        if (payload) {
          setConversationsList(
            payload.map((conv: any) => {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              const { last_message, participants } = conv;
              return { lastMessage: last_message, participants };
            }),
          );
        }
      }
    },
  }),
});

export type FirestoreModelType = typeof firestoreModel;
export default firestoreModel;
