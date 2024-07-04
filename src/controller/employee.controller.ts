import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";
import EmployeeService from "../service/employee.service";
import express from "express";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { error } from "console";
import { validate } from "class-validator";

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
    res: express.Response
  ) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
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
        console.log(errors[0].children);
        throw new HttpException(400, JSON.stringify(errors));
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
    res: express.Response
  ) => {
    const { name, email, age, address } = req.body;
    const id = Number(req.params.id);
    const updatedEmployee = await this.employeeService.updateEmployee(
      id,
      name,
      email,
      age,
      address
    );

    res.status(200).send(updatedEmployee);
  };
  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    await this.employeeService.deleteEmployee(Number(req.params.id));
    res.status(204).send("");
  };
}

export default EmployeeController;
