const express = require("express");
import { NextFunction, Request, Response } from "express";
import employeeRouter from "./router/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import HttpException from "./exceptions/http.exception";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/employees", employeeRouter);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hello world");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  app.listen(PORT, (req: Request, res: Response) => {
    console.log(`Server running at  http://localhost:${PORT}`);
  });
})();
