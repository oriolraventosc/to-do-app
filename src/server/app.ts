import morgan from "morgan";
import express from "express";
import cors from "cors";
import { generalError, unknownEndpoint } from "./middlewares/error.js";
import routes from "./routes/routes.js";
import tasksRouter from "../routers/tasksRouter/tasksRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(routes.tasks, cors(), tasksRouter);

app.use(unknownEndpoint);

app.use(generalError);

export default app;
