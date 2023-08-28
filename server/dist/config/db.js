"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSoruce = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../Entities/Post");
const Comment_1 = require("../Entities/Comment");
const User_1 = require("../Entities/User");
const appDataSoruce = () => {
    try {
        const database = new typeorm_1.DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            database: 'mysql_project',
            password: "Devidmonster@1234",
            synchronize: true,
            logging: true,
            entities: [Post_1.Post, Comment_1.Comment, User_1.User]
        });
        database.initialize();
        console.log('connect to database successfully');
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.appDataSoruce = appDataSoruce;
