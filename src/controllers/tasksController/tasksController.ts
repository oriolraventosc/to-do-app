import type { Request, Response, NextFunction } from "express";
import Task from "../../database/models/tasks/tasks.js";
import CustomError from "../../server/customError/customError.js";
import debugCreator from "debug";
import enviroment from "../../loadEnviroment.js";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}controller:tasks`);

export const loadAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      const customError = new CustomError(
        "There are no tasks",
        204,
        "There are no tasks"
      );
      next(customError);
      return;
    }

    res.status(200).json({ toDo: tasks });
    debug(chalk.blue(`${tasks.length} tasks found!`));
  } catch {
    const customError = new CustomError(
      "Error loading tasks",
      500,
      "Error loading tasks"
    );
    next(customError);
  }
};
