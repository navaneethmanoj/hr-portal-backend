import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";
import authorize from "../middleware/authorize.middleware";
import { RequestWithUser } from "../utils/RequestWithUser";
import IncorrectPasswordException from "../exceptions/incorrect-password.exception";
import { Role } from "../utils/role.enum";
import { ErrorCodes } from "../utils/error.code";
import UnauthorizedException from "../exceptions/unauthorized.exception";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.post("/login", this.loginEmployee);
    this.router.get("/", authorize, this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", authorize, this.createEmployee);
    this.router.put("/:id", authorize, this.updateEmployee);
    this.router.delete("/:id", authorize, this.deleteEmployee);
  }
  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.employeeService.loginEmployee(email, password);
      res.status(200).send({ data: token });
    } catch (err) {
      next(err);
    }
  };
  public getAllEmployees = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employees = await this.employeeService.getAllEmployees();
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );
      if (!employee) {
        const error = new HttpException(
          404,
          `No employee found with id:${req.params.id}`
        );
        throw error;
      }
      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };
  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        throw new ValidationException(ErrorCodes.VALIDATION_ERROR, errors);
      }
      const newEmployee = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.password,
        employeeDto.role,
        employeeDto.departmentId
      );
      res.status(201).send(newEmployee);
    } catch (err) {
      next(err);
    }
  };
  public updateEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      }
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        throw new ValidationException(ErrorCodes.VALIDATION_ERROR, errors);
      }
      const id = Number(req.params.id);
      const updatedEmployee = await this.employeeService.updateEmployee(
        id,
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.departmentId
      );
      res.status(200).send(updatedEmployee);
    } catch (err) {
      next(err);
    }
  };

  public deleteEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      }
      await this.employeeService.deleteEmployee(Number(req.params.id));
      res.status(204).send("");
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
