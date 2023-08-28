"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controller/post");
const route = express_1.default.Router();
route.get('/posts', post_1.getAll);
route.get('/posts/:id', post_1.getOne);
route.post('/posts', post_1.addPost);
route.patch('/posts/:id', post_1.patchPost);
route.delete('/posts/:id', post_1.removePost);
exports.default = route;
