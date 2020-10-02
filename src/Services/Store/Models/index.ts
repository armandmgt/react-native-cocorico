import { RootModel } from './types';
import sessionModel from './sessionModel';
import authModel from './authModel';
import profileModel from './profileModel';

const models: RootModel = {
  session: sessionModel,
  auth: authModel,
  profile: profileModel,
};

export default models;
