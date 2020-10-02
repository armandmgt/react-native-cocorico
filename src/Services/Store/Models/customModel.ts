import { createModel } from '@rematch/core';
import { RootModel } from './types';

const customModel = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment(state, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number, state) {
      console.log('This is current root state', state);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.custom.increment(payload);
    },
  }),
});

export type CustomModelType = typeof customModel;
export default customModel;
