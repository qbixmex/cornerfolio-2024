import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import {
	usersRoutes,
	authRoutes,
	sectionTextRoutes,
	sectionImageRoutes,
	sectionImageTextRoutes,
	sectionEmbeddedMediaRoutes,
	sectionDividerRoutes,
	sectionColumnRoutes,
  sectionGalleryRoutes,
	seedRoutes,
	portfolioRoutes,
	licenseRoutes,
} from './routes';

//* Start Express
const app = express();

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//* File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

//*Cors
app.use(cors({ origin: "*" }));

//* Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/section-text', sectionTextRoutes);
app.use('/api/section-image', sectionImageRoutes);
app.use('/api/section-image-text', sectionImageTextRoutes);
app.use('/api/section-embedded-media', sectionEmbeddedMediaRoutes);
app.use('/api/section-divider', sectionDividerRoutes);
app.use('/api/section-column', sectionColumnRoutes);
app.use('/api/section-gallery',sectionGalleryRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/license', licenseRoutes);

export default app;
