import cors from "cors";
import express, { Request, Response } from "express";
import errorHandler from "./app/middlewears/ErrorHandler";
import { AuthRoutes } from "./app/modules/Auth/auth.route";

import { userRoutes } from "./app/modules/user/user.routes";

const app = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", userRoutes);
app.use("/api", AuthRoutes);

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);
app.use(errorHandler);

export default app;
