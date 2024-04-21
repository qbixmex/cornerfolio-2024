"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileMiddleware = (request, response, next) => {
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({ error: 'No files were uploaded !' });
    }
    if (!request.files.image) {
        return response.status(400).json({ error: 'No file was uploaded !' });
    }
    next();
};
exports.default = fileMiddleware;
//# sourceMappingURL=file.middleware.js.map