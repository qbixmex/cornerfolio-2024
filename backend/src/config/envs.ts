import 'dotenv/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').default(3000).asPortNumber(),
  HOST: get('HOST').default('http://localhost').asString(),
  // TODO: PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  // TODO: JWT_SECRET: get('JWT_SECRET').required().asString(),
  // TODO: WEB_SERVICE_URL: get('WEB_SERVICE_URL').required().asString(),
  // TODO: MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USERNAME: get('MONGO_USERNAME').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
  // TODO: MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  // TODO: MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  // TODO: MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
};
