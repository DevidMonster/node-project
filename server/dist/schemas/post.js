"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.postSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    subTitle: joi_1.default.string(),
    thumbnail: joi_1.default
        .string(),
    likes: joi_1.default.string(),
    content: joi_1.default.string().required(),
});
