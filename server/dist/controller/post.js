"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePost = exports.patchPost = exports.getOne = exports.addPost = exports.getAll = void 0;
const Post_1 = require("../Entities/Post");
const tryCatch_1 = require("../utils/tryCatch");
const validate_1 = require("../services/validate");
const post_1 = require("../schemas/post");
const Comment_1 = require("../Entities/Comment");
exports.getAll = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.Post.find({
        relations: {
            comments: true,
            likes: true
        }
    });
    if (!posts || posts.length == 0) {
        res.status(404).json({
            error: "No posts found"
        });
    }
    return res.status(200).json({
        message: 'Get all results',
        posts
    });
}));
exports.addPost = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postSubmit = req.body;
    const valid = (0, validate_1.validate)(postSubmit, post_1.postSchema);
    if (valid) {
        yield Post_1.Post.insert(req.body);
    }
    return res.status(200).json({
        message: 'Add post successfully'
    });
}));
exports.getOne = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.Post.findOne({
        where: { id },
        relations: {
            comments: true,
            likes: true
        }
    });
    if (!post) {
        res.status(404).json({
            message: 'fetch failed',
            error: "No posts found"
        });
    }
    return res.status(200).json({
        message: 'Get result',
        post
    });
}));
exports.patchPost = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postSubmit = req.body;
    const id = req.params.id;
    const valid = (0, validate_1.validate)(postSubmit, post_1.postSchema);
    if (valid) {
        yield Post_1.Post.update(id, req.body);
    }
    const post = yield Post_1.Post.findOne({
        where: { id },
        relations: {
            comments: true,
            likes: true
        }
    });
    return res.status(200).json({
        message: 'Update post successfully',
        post
    });
}));
exports.removePost = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield Post_1.Post.findOne({
        where: { id },
        relations: {
            comments: true
        }
    });
    if (!post) {
        return res.status(404).json({
            message: 'No post found'
        });
    }
    for (const comment of post.comments) {
        yield Comment_1.Comment.remove(comment);
    }
    yield Post_1.Post.remove(post);
    return res.status(200).json({
        message: 'Remove post successfully'
    });
}));
