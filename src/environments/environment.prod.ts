import { Environment } from './interface';
import { firebaseKey } from '../../api-keys';

export const environment: Environment = {
  production: true,
  apiKey: firebaseKey
};
