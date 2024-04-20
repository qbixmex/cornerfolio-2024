import dotenv from "dotenv";
import env from "env-var";

// Load environment variables from .env file
// If the environment is development
if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: "./.env" });
}

// Load environment variables from .env.production file
// If the environment is production
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: "./.env.production" });
}

export default {
  PORT: env.get("PORT").default(4000).asPortNumber(),
  HOST: env.get("HOST").default("http://localhost").asString(),
  NODE_ENV: env.get("NODE_ENV").default("development").asString(),
  // TODO: PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString(),
  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  // TODO: WEB_SERVICE_URL: env.get('WEB_SERVICE_URL').required().asString(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USERNAME: env.get("MONGO_USERNAME").required().asString(),
  MONGO_PASSWORD: env.get("MONGO_PASSWORD").required().asString(),
  CLOUDINARY_API_SECRET: env.get("CLOUDINARY_API_SECRET").required().asString(),
  CLOUDINARY_URL: env.get("CLOUDINARY_URL").required().asString(),
  // TODO: MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  // TODO: MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  // TODO: MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
};
