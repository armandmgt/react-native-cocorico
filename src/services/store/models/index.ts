import { RootModel } from './types';
import authModel from './authModel';
import profileModel from './profileModel';

const models: RootModel = {
  auth: authModel,
  profile: profileModel,
};

export default models;
