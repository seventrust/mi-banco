import express from "express";
import { bodyParser } from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.url);
app.use(cors({ origin: true }));

//Las rutas
