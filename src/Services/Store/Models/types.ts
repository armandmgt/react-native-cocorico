import { Models } from '@rematch/core';

import type { AuthModelType } from './authModel';
import type { ProfileModelType } from './profileModel';

export interface RootModel extends Models<RootModel> {
  auth: AuthModelType;
  profile: ProfileModelType;
}
