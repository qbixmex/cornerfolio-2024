import mongoose from "mongoose";

type Options = {
  URL: string;
  DBName: string;
};

class MongoDatabase {
  static async connect({ URL, DBName }: Options) {
    try {
      mongoose.connect(URL, {
        dbName: DBName,
      });
      console.log('MongoDB Connected Successfully 👍🎉');
      return true;
    } catch (error) {
      console.log('Mongo Connection Error');
      throw error;
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB Disconnected Successfully 👍🎉');
      return true;
    } catch (error) {
      console.log('Mongo Disconnection Error');
      throw error;
    }
  }
}

export default MongoDatabase;
