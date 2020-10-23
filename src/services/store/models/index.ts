import authModel from './authModel';
import profileModel from './profileModel';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  auth: authModel,
  profile: profileModel,
  session: sessionModel,
};

export default models;
