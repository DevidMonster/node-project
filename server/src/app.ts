import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { errorHandler } from "./middlewares/erroHandler";
import "reflect-metadata"
import { appDataSoruce } from "./config/db";
import postRouter from './routes/post'

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', postRouter)

appDataSoruce()

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("listening on port http://localhost:" + process.env.PORT);
});
