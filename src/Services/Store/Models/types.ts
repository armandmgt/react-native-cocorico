import { Models } from '@rematch/core';
import type { CustomModelType } from './customModel';

export interface RootModel extends Models<RootModel> {
  custom: CustomModelType;
}
