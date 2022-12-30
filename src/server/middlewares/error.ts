import enviroment from "../../loadEnviroment.js";
import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import debugCreator from "debug";
import type CustomError from "../customError/customError.js";

const debug = debugCreator(`${enviroment.debug}middlewares`);

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
  debug(chalk.red("Endpooint not found"));
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`Error ${error.message}`));
  const status = error.state ?? 500;
  const message = error.customMessage || "Opps...General Error";

  res.status(status).json({ error: message });
  next();
};
