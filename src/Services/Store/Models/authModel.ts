import { createModel } from '@rematch/core';
import { RootModel } from './types';

type AuthStatus = 'LOGGED_OUT' | 'LOGGED_IN';

interface AuthState {
  email?: string;
  status: AuthStatus;
}

const authModel = createModel<RootModel>()({
  state: {
    email: undefined,
    status: 'LOGGED_OUT',
  } as AuthState,
  reducers: {
    setStatus(state, status: AuthStatus) {
      return { ...state, status };
    },
    setEmail(state, email: string) {
      return { ...state, email };
    },
  },
});

export type AuthModelType = typeof authModel;
export default authModel;
