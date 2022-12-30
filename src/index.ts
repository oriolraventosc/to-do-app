import enviroment from "./loadEnviroment.js";
import connectToDataBase from "./database/index.js";
import startServer from "./server/index.js";

await startServer(enviroment.port);
await connectToDataBase(enviroment.url);
