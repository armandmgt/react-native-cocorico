import { createModel } from '@rematch/core';

import { UserData } from '@cocorico/constants/types';

import { RootModel } from './types';

interface OtherProfilesState {
  list: UserData[];
}

const INITIAL_STATE: OtherProfilesState = {
  list: [],
};

const otherProfilesModel = createModel<RootModel>()({
  state: INITIAL_STATE,
  reducers: {
    setList(state, payload: UserData[]) {
      return { ...state, list: payload };
    },
    popFirstElement(state) {
      const [, ...newList] = state.list;

      return { ...state, list: newList };
    },
  },
});

export type OtherProfilesModelType = typeof otherProfilesModel;
export default otherProfilesModel;
