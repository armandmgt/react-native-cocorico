import authModel from './authModel';
import firestoreModel from './firestoreModel';
import messagesModel from './messagesModel';
import otherProfilesModel from './otherProfiles';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  firestore: firestoreModel,
  auth: authModel,
  session: sessionModel,
  messages: messagesModel,
  otherProfiles: otherProfilesModel,
};

export default models;
