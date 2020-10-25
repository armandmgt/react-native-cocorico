import { Models } from '@rematch/core';

import type { AuthModelType } from './authModel';
import type { SessionModelType } from './sessionModel';

export interface RootModel extends Models<RootModel> {
  auth: AuthModelType;
  session: SessionModelType;
}
