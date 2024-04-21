"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env_var_1 = __importDefault(require("env-var"));
// Load environment variables from .env file
// If the environment is development
if (process.env.NODE_ENV === "dev") {
    dotenv_1.default.config({ path: "./.env" });
}
// Load environment variables from .env.production file
// If the environment is production
if (process.env.NODE_ENV === 'production') {
    dotenv_1.default.config({ path: "./.env.production" });
}
exports.default = {
    PORT: env_var_1.default.get("PORT").default(4000).asPortNumber(),
    HOST: env_var_1.default.get("HOST").default("http://localhost").asString(),
    NODE_ENV: env_var_1.default.get("NODE_ENV").default("development").asString(),
    // TODO: PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString(),
    JWT_SECRET: env_var_1.default.get("JWT_SECRET").required().asString(),
    // TODO: WEB_SERVICE_URL: env.get('WEB_SERVICE_URL').required().asString(),
    MONGO_URL: env_var_1.default.get("MONGO_URL").required().asString(),
    MONGO_DB_NAME: env_var_1.default.get("MONGO_DB_NAME").required().asString(),
    MONGO_USERNAME: env_var_1.default.get("MONGO_USERNAME").required().asString(),
    MONGO_PASSWORD: env_var_1.default.get("MONGO_PASSWORD").required().asString(),
    CLOUDINARY_API_SECRET: env_var_1.default.get("CLOUDINARY_API_SECRET").required().asString(),
    CLOUDINARY_URL: env_var_1.default.get("CLOUDINARY_URL").required().asString(),
    // TODO: MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    // TODO: MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    // TODO: MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
};
//# sourceMappingURL=envs.js.map