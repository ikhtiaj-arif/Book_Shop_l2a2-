import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import errorHandler from "./app/middlewears/ErrorHandler";
import router from "./app/routes";

const app = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(
  cors({
    origin: "https://book-shop-client-l2a4.vercel.app",
    credentials: true,
  })
);
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

//application routes
// app.use("/api", userRoutes);
// app.use("/api", AuthRoutes);
app.use("/api", router);

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);
app.use(errorHandler);

export default app;
