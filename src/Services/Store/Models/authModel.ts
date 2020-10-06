import { createModel } from '@rematch/core';
import { AuthStatus } from '../../../Constants/types';
import { RootModel } from './types';

interface AuthState {
  email?: string;
  status: AuthStatus;
}

const INITIAL_STATE: AuthState = {
  status: 'LOADING',
};

const authModel = createModel<RootModel>()({
  state: INITIAL_STATE,
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
