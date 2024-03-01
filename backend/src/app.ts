import express from 'express';
import morgan from 'morgan';
import { usersRoutes, authRoutes,sectionTextRoutes ,sectionImageRoutes,sectionEmbeddedMediaRoutes} from './routes';

//* Start Express
const app = express();

//* Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(morgan('dev'));

//* Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/section-text', sectionTextRoutes);
app.use('/api/section-image', sectionImageRoutes);
app.use('/api/section-embedded-media', sectionEmbeddedMediaRoutes);

export default app;
