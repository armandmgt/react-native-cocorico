import { createModel } from '@rematch/core';

import { AppStatus } from '@cocorico/constants/types';

import { RootModel } from './types';

interface SessionState {
  appStatus: AppStatus;
}

const INITIAL_STATE = {
  appStatus: 'LOADING',
};

const sessionModel = createModel<RootModel>()({
  state: INITIAL_STATE as SessionState,
  reducers: {
    setAppStatus(state, payload: AppStatus) {
      return { ...state, appStatus: payload };
    },
  },
});

export type SessionModelType = typeof sessionModel;
export default sessionModel;
