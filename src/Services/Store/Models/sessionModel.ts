import { createModel } from '@rematch/core';

import { AuthStatus } from '@cocorico/Constants/types';

import { RootModel } from './types';

interface SessionState {
  authStatus: AuthStatus;
}

const INITIAL_STATE = {
  authStatus: 'LOADING',
};

const sessionModel = createModel<RootModel>()({
  state: INITIAL_STATE as SessionState,
  reducers: {
    setAuthStatus(state, payload: AuthStatus) {
      return { ...state, authStatus: payload };
    },
  },
});

export type SessionModelType = typeof sessionModel;
export default sessionModel;
