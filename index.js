import express from "express";
import { dbConnection } from "./Database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors())

const port = 3000;
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));

bootstrap(app);
dbConnection();
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));
