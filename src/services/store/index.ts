import { init, RematchDispatch, RematchRootState } from '@rematch/core';

import models from './models';
import { RootModel } from './models/types';

const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export default store;
