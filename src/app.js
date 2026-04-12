import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit: "16kb"})); // Middleware- we mostly use app.use() to configure middlewares.

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));   // cors({options})

app.use(express.urlencoded(extended= true, limit= "16kb"));   // urlencoded tells app the values of encoded chars(%,_, etc.) in the url

app.use(express.static("public"));


export default app;