import type { Request, Response, NextFunction } from "express";
import Task from "../../database/models/tasks/tasks.js";
import CustomError from "../../server/customError/customError.js";
import debugCreator from "debug";
import enviroment from "../../loadEnviroment.js";
import chalk from "chalk";
import type { TaskStructure } from "../../types/types.js";

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

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { description } = req.body as TaskStructure;
  try {
    if (!description) {
      const customError = new CustomError(
        "Missing information",
        400,
        "Missing information"
      );
      next(customError);
      return;
    }

    const taskToAdd = {
      description,
      status: false,
    };

    const task = await Task.create(taskToAdd);

    res.status(201).json(task);
    debug(chalk.blue("Task added!"));
  } catch {
    const customError = new CustomError(
      "Error creating the task",
      500,
      "Error creating the task"
    );
    next(customError);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) {
      const customError = new CustomError(
        "Task not found",
        204,
        "Task not found"
      );
      next(customError);
      return;
    }

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully!" });
    debug(chalk.blueBright("Task deleted successfully!"));
  } catch {
    const customError = new CustomError(
      "Error deleting the task",
      500,
      "Error deleting the task"
    );
    next(customError);
  }
};
