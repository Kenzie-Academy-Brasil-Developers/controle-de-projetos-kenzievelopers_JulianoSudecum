import "dotenv/config";
import "express-async-errors"
import express, { Application, json } from "express";
import { emailAlreadyExistsMiddleware, handleError } from "./middlewares";
import { developersRouter, projectsRouter } from "./routes";

const app: Application = express();
app.use(express.json())

app.use('/developers', emailAlreadyExistsMiddleware, developersRouter)
app.use('/projects', projectsRouter)

app.use(handleError)

export default app;
