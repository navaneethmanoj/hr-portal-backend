import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", this.createEmployee);
    this.router.put("/:id", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
  }
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
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        throw new ValidationException(400, "Validation Failed", errors);
      }
      const newEmployee = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address
      );
      res.status(201).send(newEmployee);
    } catch (err) {
      next(err);
    }
  };
  public updateEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        throw new ValidationException(400, "Validation Failed", errors);
      }
      // const { name, email, age, address } = req.body;
      const id = Number(req.params.id);
      const updatedEmployee = await this.employeeService.updateEmployee(
        id,
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address
      );
      res.status(200).send(updatedEmployee);
    } catch (err) {
      next(err);
    }
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.employeeService.deleteEmployee(Number(req.params.id));
      res.status(204).send("");
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
