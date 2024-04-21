"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabase {
    static async connect({ URL, DBName }) {
        try {
            mongoose_1.default.connect(URL, {
                dbName: DBName,
            });
            console.log('MongoDB Connected Successfully 👍🎉');
            return true;
        }
        catch (error) {
            console.log('Mongo Connection Error');
            throw error;
        }
    }
    static async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log('MongoDB Disconnected Successfully 👍🎉');
            return true;
        }
        catch (error) {
            console.log('Mongo Disconnection Error');
            throw error;
        }
    }
}
exports.default = MongoDatabase;
//# sourceMappingURL=mongo-database.js.map