import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/index";
import ErrorsApp from "@shared/errors/ErrorsApp";

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.APP_PORT;

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ErrorsApp) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    error: "error",
    message: err.message,
  });
});

app.get("/", (_req, res) => res.send("Hello Infracommerce"));

app.listen(port, () => console.log(`Back-end started on localhost:${port}! 🚀`));
