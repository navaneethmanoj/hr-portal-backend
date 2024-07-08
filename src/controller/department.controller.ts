import EntityNotFoundException from "../exceptions/entity-not-found.exception";
import DepartmentService from "../service/department.service";
import express, { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../utils/error.code";
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from "../dto/department.dto";
import { plainToInstance } from "class-transformer";
import { Role } from "../utils/role.enum";
import { RequestWithUser } from "../utils/RequestWithUser";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validation.exception";
import authorize from "../middleware/authorize.middleware";

class DepartmentController {
  public router: express.Router;
  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllDepartments);
    this.router.get("/:id", authorize, this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.put("/:id", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }
  public getAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).send(departments);
    } catch (err) {
      next(err);
    }
  };
  public getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const department = await this.departmentService.getDepartmentById(
        Number(req.params.id)
      );
      if (!department)
        throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };
  public createDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR)
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);
      if (errors.length) {
        throw new ValidationException(ErrorCodes.VALIDATION_ERROR, errors);
      }
      const newDepartment = await this.departmentService.createDepartment(
        departmentDto.name
      );
      res.status(201).json(newDepartment);
    } catch (err) {
      next(err);
    }
  };
  public updateDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR)
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      const departmentDto = plainToInstance(UpdateDepartmentDto, req.body);
      const errors = await validate(departmentDto);
      if (errors.length) {
        throw new ValidationException(ErrorCodes.VALIDATION_ERROR, errors);
      }
      const department = await this.departmentService.updateDepartment(
        Number(req.params.id),
        departmentDto.name,
        departmentDto.employeeId
      );
      res.status(200).json(department);
    } catch (err) {
      next(err);
    }
  };
  public deleteDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR)
        throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
      await this.departmentService.deleteDepartment(Number(req.params.id));
      res.status(204).send("");
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
