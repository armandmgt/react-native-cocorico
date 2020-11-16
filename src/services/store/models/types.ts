import { Models } from '@rematch/core';

import type { AuthModelType } from './authModel';
import type { FirestoreModelType } from './firestoreModel';
import type { MessagesModelType } from './messagesModel';
import type { OtherProfilesModelType } from './otherProfiles';
import type { SessionModelType } from './sessionModel';

export interface RootModel extends Models<RootModel> {
  firestore: FirestoreModelType;
  auth: AuthModelType;
  session: SessionModelType;
  messages: MessagesModelType;
  otherProfiles: OtherProfilesModelType;
}
