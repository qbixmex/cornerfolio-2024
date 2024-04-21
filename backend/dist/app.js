"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const licenseCheck_1 = require("./jobs/licenseCheck");
const routes_1 = require("./routes");
//* Start Express
const app = (0, express_1.default)();
//* Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
//* File Upload
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
}));
//*Cors
app.use((0, cors_1.default)({ origin: "*" }));
//* Routes
app.use('/api/users', routes_1.usersRoutes);
app.use('/api/auth', routes_1.authRoutes);
app.use('/api/section-text', routes_1.sectionTextRoutes);
app.use('/api/section-image', routes_1.sectionImageRoutes);
app.use('/api/section-image-text', routes_1.sectionImageTextRoutes);
app.use('/api/section-embedded-media', routes_1.sectionEmbeddedMediaRoutes);
app.use('/api/section-divider', routes_1.sectionDividerRoutes);
app.use('/api/section-column', routes_1.sectionColumnRoutes);
app.use('/api/section-gallery', routes_1.sectionGalleryRoutes);
app.use('/api/seed', routes_1.seedRoutes);
app.use('/api/portfolio', routes_1.portfolioRoutes);
app.use('/api/license', routes_1.licenseRoutes);
//* Check license expiration once a day
licenseCheck_1.dailyLicenseCheck;
exports.default = app;
//# sourceMappingURL=app.js.map