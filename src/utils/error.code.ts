/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
  EMPLOYEE_WITH_ID_NOT_FOUND: {
    CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
    MESSAGE: "Employee with given id not found",
  },
  DEPARTMENT_NOT_FOUND: {
    CODE: "DEPARTMENT_NOT_FOUND",
    MESSAGE: "Department not found",
  },
  DEPARTMENT_NOT_EMPTY: {
    CODE: "DEPARTMENT_NOT_EMPTY",
    MESSAGE: "Department not empty",
  },
  INVALID_CREDENTIALS: {
    CODE: "INVALID_CREDENTIALS",
    MESSAGE: "Invalid credentials",
  },
  VALIDATION_ERROR: {
    CODE: "VALIDATION_ERROR",
    MESSAGE: "Error while validating request body",
  },
  INCORRECT_PASSWORD: {
    CODE: "INCORRECT_PASSWORD",
    MESSAGE: "Incorrect password",
  },
  UNAUTHORIZED: {
    CODE: "UNAUTHORIZED",
    MESSAGE: "You are not authorized to perform this action",
  },
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
  CODE: string;
  MESSAGE: string;
}
