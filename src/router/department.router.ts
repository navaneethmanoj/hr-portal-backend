import DepartmentController from "../controller/department.controller";
import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import DepartmentService from "../service/department.service";

const departmentController = new DepartmentController(
  new DepartmentService(
    new DepartmentRepository(dataSource.getRepository(Department)),
    new EmployeeRepository(dataSource.getRepository(Employee))
  )
);

const departmentRouter = departmentController.router;

export default departmentRouter;
