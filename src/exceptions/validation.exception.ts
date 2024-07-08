import { ValidationError } from "class-validator";
import HttpException from "./http.exception";
import { CustomError } from "../utils/error.code";

class ValidationException extends HttpException {
  public errors: ValidationError[];
  constructor(error: CustomError, errors: ValidationError[]) {
    super(400, error.MESSAGE);
    this.errors = errors;
  }
}

export default ValidationException;
