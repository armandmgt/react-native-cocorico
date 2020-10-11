import { init, RematchDispatch, RematchRootState } from '@rematch/core';

import models from './Models';
import { RootModel } from './Models/types';

const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export default store;
