import { createModel } from '@rematch/core';

import { AuthStatus } from '@cocorico/constants/types';

import { RootModel } from './types';

interface AuthState {
  email?: string;
  authStatus: AuthStatus;
}

const INITIAL_STATE: AuthState = {
  authStatus: 'LOADING',
};

const authModel = createModel<RootModel>()({
  state: INITIAL_STATE,
  reducers: {
    setAuthStatus(state, payload: AuthStatus) {
      return { ...state, authStatus: payload };
    },
    setEmail(state, email: string) {
      return { ...state, email };
    },
  },
});

export type AuthModelType = typeof authModel;
export default authModel;
