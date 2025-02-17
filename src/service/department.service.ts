import Department from "../entity/department.entity";
import EntityNotFoundException from "../exceptions/entity-not-found.exception";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import DepartmentRepository from "../repository/department.repository";
import { ErrorCodes } from "../utils/error.code";

class DepartmentService {
  constructor(
    private departmentRepository: DepartmentRepository // private employeeService: EmployeeService
  ) {}
  getAllDepartments = async (): Promise<Department[]> => {
    return this.departmentRepository.find();
  };
  getDepartmentById = async (id: number): Promise<Department | null> => {
    return this.departmentRepository.findOneBy({ id });
  };
  createDepartment = async (name: string): Promise<Department> => {
    const newDepartment = new Department();
    newDepartment.name = name;
    newDepartment.employees = [];
    return this.departmentRepository.save(newDepartment);
  };
  updateDepartment = async (id: number, name: string): Promise<Department> => {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department)
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);

    department.name = name;
    return this.departmentRepository.save(department);
  };
  // addEmployeeToDepartment = async (
  //   departmentId: number,
  //   employeeId: number
  // ) => {
  //   const department = await this.departmentRepository.findOneBy({
  //     id: departmentId,
  //   });
  //   if (!department)
  //     throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);

  //   const employee = await this.employeeService.getEmployeeById(employeeId);
  //   if (!employee)
  //     throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
  //   department.employees.push(employee);
  //   return this.departmentRepository.save(department);
  // };
  deleteDepartment = async (id: number) => {
    const department = await this.departmentRepository.findOneBy({ id });
    if (department.employees.length)
      throw new UnauthorizedException(ErrorCodes.DEPARTMENT_NOT_EMPTY);
    return this.departmentRepository.softRemove(department);
  };
}

export default DepartmentService;
