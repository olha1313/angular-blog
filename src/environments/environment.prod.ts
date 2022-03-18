import { Environment } from './interface';
import { fbDbUrl, firebaseKey } from '../../api-keys';

export const environment: Environment = {
  production: true,
  apiKey: firebaseKey,
  fbDbUrl: fbDbUrl,
};
