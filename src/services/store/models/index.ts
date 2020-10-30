import authModel from './authModel';
import firestoreModel from './firestoreModel';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  firestore: firestoreModel,
  auth: authModel,
  session: sessionModel,
};

export default models;
