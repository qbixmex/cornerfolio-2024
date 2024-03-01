import express from 'express';
import morgan from 'morgan';
import { usersRoutes, authRoutes } from './routes';
import cors from "cors";

//* Start Express
const app = express();

//* Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(morgan('dev'));

//* Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);


//*Cors
app.use(cors({ origin: "*" }));

export default app;
