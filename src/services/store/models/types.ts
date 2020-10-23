import { Models } from '@rematch/core';

import type { AuthModelType } from './authModel';
import type { ProfileModelType } from './profileModel';
import type { SessionModelType } from './sessionModel';

export interface RootModel extends Models<RootModel> {
  auth: AuthModelType;
  profile: ProfileModelType;
  session: SessionModelType;
}
