import envs from './config/envs';
import app from './app';

const main = async () => {

  // TODO: Add database connection here !

  const PORT = envs.PORT;
  const HOST = envs.HOST;

  app.listen(PORT, () => {
    console.log(`Server is running at: ${HOST}:${PORT}`);
  });

};

( async () => main() )();
