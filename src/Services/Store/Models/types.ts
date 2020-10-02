import { Models } from '@rematch/core';
import type { SessionModelType } from './sessionModel';
import type { AuthModelType } from './authModel';
import type { ProfileModelType } from './profileModel';

export interface RootModel extends Models<RootModel> {
  session: SessionModelType;
  auth: AuthModelType;
  profile: ProfileModelType;
}
