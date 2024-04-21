"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = void 0;
const path_1 = __importDefault(require("path"));
const loadImage = (files, folder = '', validExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp']) => {
    return new Promise((resolve, reject) => {
        const image = files.image;
        //* If the image is not valid, we reject the promise with an error message.
        if (Array.isArray(image)) {
            return reject('Multiple files are not supported !');
        }
        //* File extension validation
        const nameSplitted = image.name.split('.');
        const nameWithoutExtension = nameSplitted.slice(0, -1).join('.');
        const extension = nameSplitted[nameSplitted.length - 1];
        //* If the extension is not valid, we reject the promise with an error message.
        if (!validExtensions.includes(extension)) {
            return reject(`[${extension}] is not a valid file extension !, valid extensions: ${validExtensions.join(', ')}`);
        }
        //* Rename file
        const imageName = nameWithoutExtension
            + '_'
            + new Date().toISOString()
            + '.'
            + extension;
        //* Path to save file
        const uploadPath = path_1.default.join(__dirname, `../uploads/${folder}/${imageName}`);
        //* Move file to uploads folder
        image.mv(uploadPath, (error) => {
            //* If we have an error, we reject the promise with the error message.
            if (error) {
                reject(error);
            }
            //* If we don't have any error, we resolve the promise with the temporary name.
            resolve(imageName);
        });
    });
};
exports.loadImage = loadImage;
//# sourceMappingURL=upload-image.js.map