import { createModel } from '@rematch/core';

import { AuthStatus, UserData } from '@cocorico/constants/types';

import { RootModel } from './types';

interface AuthState {
  authStatus: AuthStatus;
  user: UserData | null;
}

const INITIAL_STATE: AuthState = {
  authStatus: 'LOADING',
  user: null,
};

const authModel = createModel<RootModel>()({
  state: INITIAL_STATE,
  reducers: {
    setAuthStatus(state, payload: AuthStatus) {
      return { ...state, authStatus: payload };
    },
    setUser(state, payload: UserData) {
      return { ...state, user: payload };
    },
  },
});

export type AuthModelType = typeof authModel;
export default authModel;
