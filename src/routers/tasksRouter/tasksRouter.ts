import express from "express";
import {
  addTask,
  deleteTask,
  loadAllTasks,
} from "../../controllers/tasksController/tasksController.js";
import routes from "../../server/routes/routes.js";

// eslint-disable-next-line new-cap
const tasksRouter = express.Router();

tasksRouter.get(routes.loadTasks, loadAllTasks);
tasksRouter.post(routes.addTask, addTask);
tasksRouter.delete(routes.deleteTask, deleteTask);

export default tasksRouter;
