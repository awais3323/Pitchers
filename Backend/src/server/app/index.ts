import express, { Application } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
export const app: Application = express()

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
