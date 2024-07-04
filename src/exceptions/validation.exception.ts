import { ValidationError } from "class-validator";

class ValidationException extends Error {
  public status: number;
  public errors: ValidationError[];
  constructor(status: number, message: string, errors: ValidationError[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export default ValidationException;
