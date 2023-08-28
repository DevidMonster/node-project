"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const erroHandler_1 = require("./middlewares/erroHandler");
require("reflect-metadata");
const db_1 = require("./config/db");
const post_1 = __importDefault(require("./routes/post"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', post_1.default);
(0, db_1.appDataSoruce)();
app.use(erroHandler_1.errorHandler);
app.listen(process.env.PORT, () => {
    console.log("listening on port http://localhost:" + process.env.PORT);
});
