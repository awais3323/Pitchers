import express, { Application } from "express";
import cors from "cors"
const bodyParser = require('body-parser');
export const app: Application = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());