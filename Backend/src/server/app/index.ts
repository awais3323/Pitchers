import express, { Application } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieparser from "cookie-parser"
export const app: Application = express()


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser())
