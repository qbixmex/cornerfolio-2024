"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = __importDefault(require("./config/envs"));
const app_1 = __importDefault(require("./app"));
const mongo_database_1 = __importDefault(require("./data/mongo/mongo-database"));
const main = async () => {
    //* Database connection
    await mongo_database_1.default.connect({
        URL: envs_1.default.MONGO_URL,
        DBName: envs_1.default.MONGO_DB_NAME,
    });
    const PORT = envs_1.default.PORT;
    const HOST = envs_1.default.HOST;
    const ENVIRONMENT = envs_1.default.NODE_ENV;
    app_1.default.listen(PORT, () => {
        console.log(`Server is running at: ${HOST}:${PORT}`);
        console.log(`Environment: ${ENVIRONMENT}`);
    });
};
(async () => main())();
//# sourceMappingURL=server.js.map