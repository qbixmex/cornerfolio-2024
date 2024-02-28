import envs from './config/envs';
import app from './app';
import mongoDatabase from './data/mongo/mongo-database';

const main = async () => {

  //* Database connection
  await mongoDatabase.connect({
    URL: envs.MONGO_URL,
    DBName: envs.MONGO_DB_NAME,
  });

  const PORT = envs.PORT;
  const HOST = envs.HOST;

  app.listen(PORT, () => {
    console.log(`Server is running at: ${HOST}:${PORT}`);
  });

};

( async () => main() )();
