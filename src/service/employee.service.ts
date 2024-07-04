import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}
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
    address: any
  ): Promise<Employee> => {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;

    newEmployee.address = newAddress;
    return this.employeeRepository.save(newEmployee);
  };
  updateEmployee = async (
    id: number,
    name: string,
    email: string,
    age: number,
    address: any
  ): Promise<Employee | null> => {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) return null;
    employee.name = name;
    employee.email = email;
    employee.age = age;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;
    return this.employeeRepository.save(employee);
  };
  deleteEmployee = async (id: number) => {
    const employee = await this.employeeRepository.findOneBy({ id });
    return this.employeeRepository.softRemove(employee);
  };
}

export default EmployeeService;
