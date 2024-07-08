import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { ValidationError } from "class-validator";
import ValidationException from "../exceptions/validation.exception";

const formatValidationError = (errors: ValidationError[]): string[] => {
  let errorMessages = [];
  for (let error of errors) {
    if (error.children.length) {
      errorMessages.push(...formatValidationError(error.children));
    }
    if (error.constraints) {
      Object.values(error.constraints).forEach((message) => {
        errorMessages.push(message);
      });
    }
  }
  return errorMessages;
};

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message: string = error.message || "Something went wrong";
    if (error instanceof ValidationException) {
      const status: number = error.status || 400;
      const errorMessages = formatValidationError(error.errors);
      let respbody = { message: message, errors: errorMessages };
      res.status(status).json(respbody);
    } else if (error instanceof HttpException) {
      const status: number = error.status || 500;
      let respbody = { message: message };
      res.status(status).json(respbody);
    } else {
      console.error(error.stack);
      res.status(500).send({ error: error.message });
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
