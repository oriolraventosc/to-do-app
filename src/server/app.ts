import morgan from "morgan";
import express from "express";
import cors from "cors";
import { generalError, unknownEndpoint } from "./middlewares/error.js";
import routes from "./routes/routes.js";
import tasksRotuer from "../routers/tasksRouter/tasksRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(routes.tasks, cors(), tasksRotuer);

app.use(unknownEndpoint);

app.use(generalError);

export default app;
