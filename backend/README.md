# Conerfolio APP Backend

## Initial Setup

### Install Dependencies

```bash
npm install
```

### Create Environment Variables File

```bash
cp .env.template .env
```

Now you can edit your environment variables when you add or update a new one.

```ini
# Example
PORT=3500
HOST=https//some_real_domain.com/
PORT=3000
HOST=http://localhost

MONGO_URL=mongodb://your_user_name:your_password@localhost:27017
MONGO_DB_NAME=YOUR_DATABASE_NAME
MONGO_USERNAME=your_user_name
MONGO_PASSWORD=your_password
```

In this project we are using the package ```env-var``` so every time we add a new environment variable we also add it here ```src/config/envs.ts```:

**By using this package benefits are:**

- Data types
- Autocompletion
- Validation


```ts
import 'dotenv/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').default(3000).asPortNumber(),
  HOST: get('HOST').default('http://localhost').asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USERNAME: get('MONGO_USERNAME').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
};
```

## Start docker image "development mode"

```bash
npm run docker:up
```

## Start the server "development mode"

```bash
npm run dev
```

## Compile and build for production

```bash
npm run build
```

## Run production mode

**NOTE: You must compile before using this command**

```bash
npm run start
```