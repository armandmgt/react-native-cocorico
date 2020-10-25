import authModel from './authModel';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  auth: authModel,
  session: sessionModel,
};

export default models;
