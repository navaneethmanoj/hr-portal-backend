import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import EntityNotFoundException from "../exceptions/entity-not-found.exception";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import IncorrectPasswordException from "../exceptions/incorrect-password.exception";
import { ErrorCodes } from "../utils/error.code";
import DepartmentService from "./department.service";

class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentService: DepartmentService
  ) {}
  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findOneBy({ email });
    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };
    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    return { token };
  };
  getAllEmployees = async (): Promise<Employee[]> => {
    return this.employeeRepository.find();
  };
  getEmployeeById = async (id: number): Promise<Employee | null> => {
    return this.employeeRepository.findOneBy({ id });
  };
  createEmployee = async (
    name: string,
    email: string,
    age: number,
    address: any,
    password: string,
    role: Role,
    departmentId: number
  ): Promise<Employee> => {
    const department = await this.departmentService.getDepartmentById(
      departmentId
    );
    if (!department)
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.role = role;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;
    newEmployee.address = newAddress;

    newEmployee.department = department;
    return this.employeeRepository.save(newEmployee);
  };

  updateEmployee = async (
    id: number,
    name: string,
    email: string,
    age: number,
    address: any,
    departmentId: number
  ): Promise<Employee | null> => {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee)
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    const newDepartment = await this.departmentService.getDepartmentById(
      departmentId
    );
    if (!newDepartment)
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);
    employee.name = name;
    employee.email = email;
    employee.age = age;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;

    employee.department.name = newDepartment.name;
    return this.employeeRepository.save(employee);
  };
  deleteEmployee = async (id: number) => {
    const employee = await this.employeeRepository.findOneBy({ id });
    return this.employeeRepository.softRemove(employee);
  };
}

export default EmployeeService;
