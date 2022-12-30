import debugCreator from "debug";
import enviroment from "../loadEnviroment.js";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = debugCreator(`${enviroment.debug}database`);

const connectToDataBase = async (url: string) => {
  try {
    await mongoose.connect(url);
    mongoose.set("debug", process.env.DEBUG === "true");
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
    debug(chalk.green("Successfully connected to the database"));
  } catch {
    debug(chalk.red("Error connecting to the database"));
  }
};

export default connectToDataBase;
