"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    return res.status(400).json({
        message: 'Error processing request',
        error: error.message
    });
};
exports.errorHandler = errorHandler;
