import express from "express";
import { loadAllTasks } from "../../controllers/tasksController/tasksController.js";
import routes from "../../server/routes/routes.js";

// eslint-disable-next-line new-cap
const tasksRotuer = express.Router();

tasksRotuer.get(routes.loadTasks, loadAllTasks);

export default tasksRotuer;
