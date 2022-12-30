import dotenv from "dotenv";
dotenv.config();

const enviroment = {
  port: 4001,
  url: process.env.MONGODB_URL,
  debug: process.env.DEBUG,
};

export default enviroment;
