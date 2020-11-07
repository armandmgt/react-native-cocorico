import authModel from './authModel';
import firestoreModel from './firestoreModel';
import messagesModel from './messagesModel';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  firestore: firestoreModel,
  auth: authModel,
  session: sessionModel,
  messages: messagesModel,
};

export default models;
