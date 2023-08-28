import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { errorHandler } from "./middlewares/erroHandler";

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }))

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log("listening on port http://localhost:" + process.env.PORT);
});
