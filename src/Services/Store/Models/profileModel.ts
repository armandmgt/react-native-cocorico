import { createModel } from '@rematch/core';
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
    setNames(state, payload) {
      return { ...state, ...payload };
    },
  },
});

export type ProfileModelType = typeof profileModel;
export default profileModel;
