import "express-async-errors"
import "dotenv/config";
import express, { Application, json } from "express";
import { emailAlreadyExistsMiddleware, handleError } from "./middlewares";
import { developersRouter, projectsRouter } from "./routes";

const app: Application = express();
app.use(json())

app.use('/developers', emailAlreadyExistsMiddleware, developersRouter)
app.use('/projects', projectsRouter)

app.use(handleError)

export default app;
